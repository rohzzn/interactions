"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function LayoffTrackerPage() {
  return (
    <div className="min-h-screen bg-[#FEFEFE] flex flex-col">
      {/* Header */}
      <motion.header
        className="border-b border-[#181818] p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/?day=3"
            className="text-[#181818] hover:text-[#10AE4C] transition-colors duration-300 flex items-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Days
          </Link>
          <h1 className="text-2xl font-light text-[#181818]">Layoff Tracker</h1>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.div
        className="w-full h-80 overflow-hidden relative"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-02J6rfzBgQGJu1N9I6Kb8BE0kgrmXT.png"
          alt="Layoff Tracker Dashboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FEFEFE]/60 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-light text-[#181818] mb-6">
              Connecting people impacted with companies hiring
            </h2>
            <p className="text-lg text-[#181818]/70 font-light leading-relaxed">
              Layoff Tracker helps connect people impacted by layoffs with companies that are actively hiring. We track
              the latest layoffs across tech companies and startups in real-time, providing transparency and support
              during difficult times.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          >
            <div className="bg-white border border-[#181818] p-6">
              <h3 className="text-xl font-light text-[#181818] mb-4">Real-time Tracking</h3>
              <p className="text-[#181818]/70 font-light">
                Stay updated with the latest layoff announcements across the tech industry with our comprehensive
                tracking system.
              </p>
            </div>
            <div className="bg-white border border-[#181818] p-6">
              <h3 className="text-xl font-light text-[#181818] mb-4">Job Matching</h3>
              <p className="text-[#181818]/70 font-light">
                Connect talented individuals with opportunities at companies that are growing and actively hiring.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center"
          >
            <button className="bg-[#10AE4C] text-white px-8 py-3 font-light hover:bg-[#10AE4C]/90 transition-colors duration-300">
              Get Started
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
