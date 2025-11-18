import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { courses } from "../constants/courses";

/**
 * Courses listing page
 * Displays all available courses in a grid layout with hover animations
 */
export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-900">
      <div className="mx-auto max-w-6xl px-8 py-16 sm:px-16">
        {/* Navigation and header */}
        <div className="mb-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-zinc-600 transition-all hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <h1 className="mt-4 text-4xl font-bold text-black dark:text-zinc-50 sm:text-5xl">
            Courses
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            Choose a course to start learning
          </p>
        </div>
        
        {/* Course cards grid - responsive layout */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:scale-[1.02] hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <h2 className="text-xl font-semibold text-black group-hover:text-zinc-700 dark:text-zinc-50 dark:group-hover:text-zinc-300">
                {course.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {course.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-300">
                Start Learning
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

