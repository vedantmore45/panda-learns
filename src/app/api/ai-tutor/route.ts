import { NextRequest, NextResponse } from "next/server";

/**
 * Common stop words to filter out from question analysis
 */
const STOP_WORDS = new Set([
  "what", "how", "why", "when", "where", "which", "who", "is", "are", "was", "were",
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with",
  "about", "this", "that", "these", "those", "can", "could", "should", "would"
]);

/**
 * Extract meaningful keywords from a question, filtering out stop words and short words
 */
function extractKeywords(question: string): string[] {
  const questionLower = question.toLowerCase();
  const words = questionLower
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));
  
  return [...new Set(words)];
}

/**
 * Score a sentence based on how many question keywords it contains
 */
function scoreSentence(sentence: string, keywords: string[]): number {
  const sentenceLower = sentence.toLowerCase();
  let score = 0;
  
  keywords.forEach(keyword => {
    if (sentenceLower.includes(keyword)) {
      score += 1;
      // Bonus for exact word match (not just substring)
      if (sentenceLower.includes(` ${keyword} `) || 
          sentenceLower.startsWith(`${keyword} `) || 
          sentenceLower.endsWith(` ${keyword}`)) {
        score += 0.5;
      }
    }
  });
  
  return score;
}

/**
 * Find and extract the most relevant content from course material based on the question
 * Uses keyword matching with scoring to rank sentences by relevance
 */
function findRelevantContent(question: string, content: string): string {
  const keywords = extractKeywords(question);
  
  if (keywords.length === 0) {
    return content.split("\n\n").slice(0, 2).join("\n\n");
  }

  // Split content into sentences
  const sentences = content.split(/[.!?]\s+/).filter(s => s.trim().length > 10);
  
  // Score each sentence based on keyword matches
  const scoredSentences = sentences.map((sentence, index) => ({
    sentence,
    index,
    score: scoreSentence(sentence, keywords)
  }));

  // Sort by score (highest first) and get top relevant sentences
  const relevantSentences = scoredSentences
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  if (relevantSentences.length > 0) {
    // Get context around relevant sentences (previous and next)
    const contextIndices = new Set<number>();
    relevantSentences.forEach(item => {
      if (item.index > 0) contextIndices.add(item.index - 1);
      contextIndices.add(item.index);
      if (item.index < sentences.length - 1) contextIndices.add(item.index + 1);
    });

    // Build answer with context, maintaining order
    const answerSentences = Array.from(contextIndices)
      .sort((a, b) => a - b)
      .map(idx => sentences[idx])
      .filter((s, idx, arr) => {
        // Remove duplicates
        return arr.indexOf(s) === idx;
      });

    return answerSentences.join(". ") + ".";
  }

  // Fallback: return first few paragraphs if no matches found
  return content.split("\n\n").slice(0, 2).join("\n\n");
}

/**
 * Format the RAG-lite answer to be more conversational and structured
 */
function formatRAGAnswer(question: string, relevantContent: string): string {
  const questionLower = question.toLowerCase().trim();
  
  // Add a contextual introduction based on question type
  let intro = "";
  if (questionLower.startsWith("what")) {
    intro = "Based on the course content: ";
  } else if (questionLower.startsWith("how")) {
    intro = "Here's how it works according to the course: ";
  } else if (questionLower.startsWith("why")) {
    intro = "The course explains that: ";
  } else {
    intro = "According to the course content: ";
  }

  // Clean up the content (remove excessive periods, normalize spacing)
  const cleanedContent = relevantContent
    .replace(/\.{2,}/g, ".")
    .replace(/\s+/g, " ")
    .trim();

  return intro + cleanedContent;
}

/**
 * Generate an answer using OpenRouter API if available, otherwise use optimized RAG-lite
 */
async function generateAnswerWithLLM(
  question: string,
  courseContent: string,
  courseTitle: string
): Promise<string> {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const relevantContent = findRelevantContent(question, courseContent);

  // Try OpenRouter API if API key is provided
  if (openRouterKey) {
    try {
      const model = "meta-llama/llama-3.2-3b-instruct";
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openRouterKey}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Panda Learns LMS",
      };

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content: `You are an AI tutor helping students learn about "${courseTitle}". Answer questions based ONLY on the provided course content. Be concise, helpful, and accurate. If the question cannot be answered from the content, say so.`,
            },
            {
              role: "user",
              content: `Course Content:\n${relevantContent}\n\nQuestion: ${question}\n\nAnswer based on the course content above:`,
            },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices[0]?.message?.content || "I couldn't generate an answer. Please try again.";
      }
    } catch (error) {
      // Fall through to RAG-lite if API call fails
    }
  }

  // Use optimized RAG-lite as fallback or primary method
  return formatRAGAnswer(question, relevantContent);
}

/**
 * API route handler for AI tutor questions
 * Accepts POST requests with question, courseContent, and courseTitle
 * Returns AI-generated or RAG-lite answers based on course content
 */
export async function POST(request: NextRequest) {
  try {
    const { question, courseContent, courseTitle } = await request.json();

    // Validate required fields
    if (!question || !courseContent) {
      return NextResponse.json(
        { error: "Question and course content are required" },
        { status: 400 }
      );
    }
    
    // Generate answer using LLM (OpenRouter) or optimized RAG-lite
    const answer = await generateAnswerWithLLM(question, courseContent, courseTitle);
    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate answer" },
      { status: 500 }
    );
  }
}

