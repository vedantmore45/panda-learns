"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { courseContent } from "../../constants/courses";

/**
 * Course detail page with content, progress tracking, and AI tutor
 * Displays full course content and allows students to ask questions
 */
export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  
  // Progress state - tracks course completion status
  const [progress, setProgress] = useState<{ started: boolean; quizCompleted: boolean }>({
    started: false,
    quizCompleted: false,
  });
  
  // AI Tutor state
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ question: string; answer: string }>>([]);

  // Get course data or fallback to default course
  const course = courseContent[courseId] || courseContent["growth-hacking"];

  /**
   * Load and initialize progress from localStorage
   * Automatically marks course as started when first visited
   */
  useEffect(() => {
    const savedProgress = localStorage.getItem(`course-${courseId}-progress`);
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      setProgress(parsed);
      // Mark as started if not already marked
      if (!parsed.started) {
        const newProgress = { ...parsed, started: true };
        setProgress(newProgress);
        localStorage.setItem(`course-${courseId}-progress`, JSON.stringify(newProgress));
      }
    } else {
      // First visit - initialize progress
      const newProgress = { started: true, quizCompleted: false };
      setProgress(newProgress);
      localStorage.setItem(`course-${courseId}-progress`, JSON.stringify(newProgress));
    }
  }, [courseId]);

  /**
   * Handle question submission to AI tutor
   * Sends question to API and updates chat history
   */
  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          courseContent: course.content,
          courseTitle: course.title,
        }),
      });

      const data = await response.json();
      const aiAnswer = data.answer || "I'm sorry, I couldn't generate an answer. Please try again.";

      setAnswer(aiAnswer);
      setChatHistory([...chatHistory, { question, answer: aiAnswer }]);
      setQuestion("");
    } catch (error) {
      setAnswer("Error: Could not connect to AI tutor. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Mark quiz as completed and save to localStorage
   */
  const handleQuizComplete = () => {
    const newProgress = { ...progress, quizCompleted: true };
    setProgress(newProgress);
    localStorage.setItem(`course-${courseId}-progress`, JSON.stringify(newProgress));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-900">
      <div className="mx-auto max-w-5xl px-8 py-16 sm:px-16">
        <Link
          href="/courses"
          className="group inline-flex items-center gap-2 text-zinc-600 transition-all hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Courses
        </Link>

        <div className="mt-8">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 sm:text-5xl">
            {course.title}
          </h1>

          <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-3 text-lg font-semibold text-black dark:text-zinc-50">
              Progress
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                {progress.started ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-zinc-400" />
                )}
                <span className="text-zinc-600 dark:text-zinc-400">
                  Course started: {progress.started ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {progress.quizCompleted ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-zinc-400" />
                )}
                <span className="text-zinc-600 dark:text-zinc-400">
                  Quiz completed: {progress.quizCompleted ? "Yes" : "No"}
                </span>
              </div>
              {!progress.quizCompleted && (
                <button
                  onClick={handleQuizComplete}
                  className="group mt-3 flex items-center gap-2 rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium text-black transition-all hover:scale-105 hover:bg-zinc-300 hover:shadow-md active:scale-95 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
                >
                  <CheckCircleIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  Mark Quiz as Completed
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-2xl font-semibold text-black dark:text-zinc-50">
              Course Content
            </h2>
            <div className="prose prose-sm max-w-none text-zinc-700 dark:prose-invert dark:text-zinc-300">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-7">
                {course.content}
              </pre>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-2xl font-semibold text-black dark:text-zinc-50">
              AI Tutor
            </h2>
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
              Ask questions about this course content and get AI-powered answers.
            </p>

            {chatHistory.length > 0 && (
              <div className="mb-6 space-y-4">
                {chatHistory.map((chat, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        Q: {chat.question}
                      </p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                      <p className="text-sm text-zinc-800 dark:text-zinc-200">A: {chat.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Question input form */}
            <div className="space-y-3">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  // Submit on Cmd/Ctrl + Enter
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    handleAskQuestion();
                  }
                }}
                placeholder="Ask a question about this course..."
                className="w-full rounded-lg border border-zinc-300 bg-white p-3 text-sm text-black placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
                rows={3}
              />
              <button
                onClick={handleAskQuestion}
                disabled={isLoading || !question.trim()}
                className="group w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:bg-zinc-800 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Thinking...
                  </span>
                ) : (
                  "Ask Question"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

