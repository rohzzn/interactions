"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function InternshipFinderPage() {
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
          <h1 className="text-2xl font-light text-[#181818]">Internship Finder</h1>
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
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-okCTEufU4gWu5Eh7WcYt4VA8kNwD0t.png"
          alt="Internship Finder Interface"
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
            <h2 className="text-4xl font-light text-[#181818] mb-6">Find tech internships in your favorite startups</h2>
            <p className="text-lg text-[#181818]/70 font-light leading-relaxed">
              Discover amazing tech internship opportunities from top companies like Google, Microsoft, Amazon, Figma,
              and many exciting startups. Our platform makes it easy to find the perfect internship that matches your
              skills and interests.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white border border-[#181818] p-6 text-center">
              <h3 className="text-xl font-light text-[#181818] mb-4">Top Companies</h3>
              <p className="text-[#181818]/70 font-light">
                Access internships from Google, Microsoft, Amazon, and leading startups.
              </p>
            </div>
            <div className="bg-white border border-[#181818] p-6 text-center">
              <h3 className="text-xl font-light text-[#181818] mb-4">Smart Filters</h3>
              <p className="text-[#181818]/70 font-light">
                Filter by company, role, location, and more to find your perfect match.
              </p>
            </div>
            <div className="bg-white border border-[#181818] p-6 text-center">
              <h3 className="text-xl font-light text-[#181818] mb-4">Career Guidance</h3>
              <p className="text-[#181818]/70 font-light">
                Get expert advice through our comprehensive career blog and resources.
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
              Start Searching
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
