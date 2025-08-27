"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function GitHubRecapPage() {
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
          <h1 className="text-2xl font-light text-[#181818]">GitHub Recap</h1>
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
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qSnyJJhM2sMmP1xByL4B2cK7sR3GDP.png"
          alt="GitHub Recap Visualization"
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
            <h2 className="text-4xl font-light text-[#181818] mb-6">1000 days of code in a glance</h2>
            <p className="text-lg text-[#181818]/70 font-light leading-relaxed">
              We've built a simple tool to help you visualize your 1000 days of coding journey in just a glance. Simply
              enter your GitHub username and download a beautiful 3-year recap of your work that you can share with your
              peers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white border border-[#181818] p-8 mb-12"
          >
            <h3 className="text-2xl font-light text-[#181818] mb-6 text-center">Generate Your Recap</h3>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Enter GitHub username"
                className="flex-1 px-4 py-3 border border-[#181818] bg-[#FEFEFE] text-[#181818] font-light focus:outline-none focus:border-[#10AE4C]"
              />
              <button className="bg-[#10AE4C] text-white px-6 py-3 font-light hover:bg-[#10AE4C]/90 transition-colors duration-300">
                Generate
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-white border border-[#181818] p-6">
              <h3 className="text-xl font-light text-[#181818] mb-4">Coding Streaks</h3>
              <p className="text-[#181818]/70 font-light">
                Visualize your longest coding streaks and most productive periods over the past 3 years.
              </p>
            </div>
            <div className="bg-white border border-[#181818] p-6">
              <h3 className="text-xl font-light text-[#181818] mb-4">Contribution Patterns</h3>
              <p className="text-[#181818]/70 font-light">
                See your total contributions and discover patterns in your development journey.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
