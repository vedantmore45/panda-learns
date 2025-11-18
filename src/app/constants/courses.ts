/**
 * Course catalog - list of all available courses
 * Used for the courses listing page
 */
export const courses = [
  {
    id: "growth-hacking",
    title: "Growth Hacking Fundamentals",
    description: "Learn proven strategies to rapidly scale your startup. Master acquisition, retention, and viral growth loops.",
  },
  {
    id: "systems-thinking",
    title: "Systems Thinking for Founders",
    description: "Build scalable systems that work without you. Design processes, automate workflows, and create sustainable operations.",
  },
  {
    id: "ai-for-business",
    title: "AI for Business: Practical Applications",
    description: "Harness AI to automate tasks, improve decision-making, and create competitive advantages. Real-world case studies and hands-on projects.",
  },
];

/**
 * Full course content for each course
 * Maps course ID to title and detailed content
 * Used for course detail pages and AI tutor context
 */
export const courseContent: Record<string, { title: string; content: string }> = {
  "growth-hacking": {
    title: "Growth Hacking Fundamentals",
    content: `
Growth hacking is a data-driven approach to rapidly scaling a business. It combines marketing, product development, and analytics to find the most efficient ways to grow.

Key Principles:
1. Product-Market Fit First: Before growth hacking, ensure your product solves a real problem for a specific audience.
2. Build-Measure-Learn Loop: Create experiments, measure results, learn from data, and iterate quickly.
3. Focus on Metrics That Matter: Track North Star metrics like Monthly Active Users (MAU) or Customer Lifetime Value (LTV).
4. Viral Loops: Design your product so that users naturally invite others. Examples: Dropbox's referral program, Airbnb's host-guest network effects.
5. AARRR Framework (Pirate Metrics):
   - Acquisition: How users find you
   - Activation: First positive experience
   - Retention: Users come back
   - Revenue: Monetization
   - Referral: Users invite others

Growth Channels:
- Content Marketing: SEO, blogs, videos
- Paid Advertising: Facebook, Google Ads
- Partnerships: Integrations, co-marketing
- Community Building: Forums, Discord, Slack
- Email Marketing: Drip campaigns, newsletters

Remember: Growth hacking is about sustainable, scalable growth—not just vanity metrics. Focus on channels that compound over time.
    `.trim(),
  },
  "systems-thinking": {
    title: "Systems Thinking for Founders",
    content: `
Systems thinking helps founders build businesses that can scale without constant intervention. It's about designing processes that work consistently.

Core Concepts:
1. Input → Process → Output: Every system has inputs (resources), processes (workflows), and outputs (results). Map these clearly.
2. Feedback Loops: Systems improve through feedback. Positive loops amplify growth; negative loops correct errors.
3. Leverage Points: Small changes in the right place create large impacts. Example: Automating customer onboarding saves hours weekly.
4. Documentation: If it's not written down, it doesn't exist. Document processes so others can execute them.

Building Systems:
- Start with the end goal: What outcome do you want?
- Break it into steps: What are the necessary actions?
- Remove friction: Eliminate unnecessary steps
- Automate where possible: Use tools like Zapier, Notion, or custom scripts
- Measure and iterate: Track system performance and improve

Common Systems to Build:
- Customer onboarding
- Content creation workflow
- Sales process
- Support ticket handling
- Team communication protocols

The goal: Create systems that run without you, so you can focus on strategy and growth.
    `.trim(),
  },
  "ai-for-business": {
    title: "AI for Business: Practical Applications",
    content: `
AI is transforming how businesses operate. Founders can leverage AI to automate tasks, improve decision-making, and create competitive advantages.

Key AI Applications:
1. Customer Support: Chatbots handle common questions 24/7, reducing support costs by 30-50%. Use tools like Intercom, Zendesk, or custom GPTs.
2. Content Creation: AI generates blog posts, social media content, and marketing copy. Tools: ChatGPT, Claude, Jasper.
3. Data Analysis: AI analyzes customer data to identify trends, predict churn, and recommend actions. Use Python libraries or platforms like Tableau.
4. Sales Automation: AI qualifies leads, schedules meetings, and personalizes outreach. Tools: Outreach.io, Gong, HubSpot.
5. Product Development: AI helps with code generation, testing, and bug detection. GitHub Copilot, Cursor, and similar tools accelerate development.

Getting Started:
- Identify repetitive tasks: What takes time but doesn't require creativity?
- Start small: Pick one use case and test it
- Measure impact: Track time saved, cost reduction, or quality improvement
- Scale gradually: Once proven, expand to other areas

Ethical Considerations:
- Be transparent about AI use
- Ensure data privacy and security
- Maintain human oversight for critical decisions
- Avoid bias in AI training data

The future belongs to founders who combine human creativity with AI efficiency.
    `.trim(),
  },
};

