# 🐼 Panda Learns

A lightweight Learning Management System (LMS) for founders & teams. Features course content, AI-powered Q&A tutor, progress tracking, and an interactive UI with animated pandas.

## ✨ Features

- **Course Management**: Browse and access courses on growth hacking, systems thinking, and AI for business
- **AI Tutor**: Ask questions about course content and get AI-powered answers using OpenRouter or optimized RAG-lite
- **Progress Tracking**: Track course completion and quiz status with localStorage persistence
- **Interactive UI**: Animated pandas, hover effects, and smooth transitions
- **Dark Mode**: Automatically adapts to system preferences
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Heroicons
- **AI Integration**: OpenRouter API (optional) + Optimized RAG-lite fallback

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
git clone https://github.com/vedantmore45/panda-learns.git, cd panda-learns
2. Install dependencies:
npm install
3. Run the development server:
npm run dev
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables (Optional)

Create a `.env.local` file in the root directory for enhanced AI features:

# Optional: For enhanced AI responses via OpenRouter
OPENROUTER_API_KEY=your_openrouter_api_key_here**Note**: The app works without any API keys using the optimized RAG-lite approach.

