"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ProjectData {
  name: string
  url: string
  tagline: string
  categories: string[]
  builtWith: string[]
  description: string
  logo: string
}

export function PeerlistAutofill() {
  const [inputUrl, setInputUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [projectData, setProjectData] = useState<ProjectData>({
    name: "",
    url: "",
    tagline: "",
    categories: [],
    builtWith: [],
    description: "",
    logo: "",
  })
  const [completedFields, setCompletedFields] = useState<string[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playSound = (frequency: number, duration = 200) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration / 1000)
  }

  const fetchWebsiteData = async (url: string) => {
    try {
      // Normalize URL
      const normalizedUrl = url.startsWith("http") ? url : `https://${url}`

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch(`/api/fetch-website?url=${encodeURIComponent(normalizedUrl)}`, {
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        return {
          title: data.title || "Untitled Project",
          favicon: data.favicon || "/ai-logo.png",
          description: data.description || "A great project built with modern technologies",
        }
      }
    } catch (error) {
      console.log("[v0] Error fetching website data:", error)
    }

    const domain = url.replace(/^https?:\/\//, "").split("/")[0]
    return {
      title: `${domain.charAt(0).toUpperCase() + domain.slice(1)} Project`,
      favicon: "/ai-logo.png",
      description: "A powerful tool that helps users achieve their goals efficiently",
    }
  }

  const simulateAIFetch = async (url: string) => {
    setIsLoading(true)
    setCompletedFields([])

    // Fetch real website data
    const websiteData = await fetchWebsiteData(url)

    const fields = [
      { key: "name", value: websiteData.title, delay: 800 },
      { key: "url", value: url, delay: 1000 },
      { key: "tagline", value: websiteData.description, delay: 1200 },
      { key: "description", value: websiteData.description, delay: 1600 },
      { key: "logo", value: websiteData.favicon, delay: 2000 },
      { key: "categories", value: ["Web", "Application"], delay: 2400 },
      { key: "builtWith", value: ["React", "Next.js", "JavaScript"], delay: 2800 },
    ]

    for (const field of fields) {
      await new Promise((resolve) => setTimeout(resolve, field.delay))

      setProjectData((prev) => ({
        ...prev,
        [field.key]: field.value,
        url: url,
      }))

      setCompletedFields((prev) => [...prev, field.key])
      playSound(400 + Math.random() * 200, 150)
    }

    setIsLoading(false)
    playSound(600, 300) // Success sound
  }

  const handleAutofill = () => {
    if (inputUrl.trim()) {
      simulateAIFetch(inputUrl)
    }
  }

  const getCompletionPercentage = () => {
    const totalFields = 7 // name, url, tagline, description, logo, categories, builtWith
    const completedCount = completedFields.length
    return Math.min(Math.round((completedCount / totalFields) * 100), 100)
  }

  const fieldChecklist = [
    { key: "name", label: "Project name", completed: completedFields.includes("name") },
    { key: "url", label: "Project URL", completed: completedFields.includes("url") },
    { key: "tagline", label: "Tagline", completed: completedFields.includes("tagline") },
    { key: "categories", label: "Category(ies)", completed: completedFields.includes("categories") },
    { key: "builtWith", label: "Built with", completed: completedFields.includes("builtWith") },
    { key: "description", label: "Description", completed: completedFields.includes("description") },
    { key: "logo", label: "Logo", completed: completedFields.includes("logo") },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white border border-gray-200 rounded-lg">
      <div className="flex gap-8">
        {/* Main Form */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Add Project</h1>
          </div>

          {/* Autofill Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Autofill details with AI</h2>
            <p className="text-gray-600 mb-4">
              Simply input your project URL, and we'll automagically fill in the details for you!
            </p>

            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://your-project-url.com"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                  disabled={isLoading}
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
                    />
                  </div>
                )}
              </div>
              <button
                onClick={handleAutofill}
                disabled={!inputUrl.trim() || isLoading}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isLoading ? "Autofilling..." : "Autofill"}
              </button>
            </div>

            {/* Loading Animation */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      className="w-3 h-3 bg-blue-500 rounded-full"
                    />
                    <span className="text-blue-700 font-medium">AI is analyzing your project...</span>
                  </div>
                  <div className="mt-2 text-sm text-blue-600">
                    Extracting project details, fetching logo, and generating description
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            {completedFields.length === 7 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center text-green-600 font-medium"
              >
                We've successfully fetched your project details!
              </motion.div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-6">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project name <span className="text-red-500">*</span>
              </label>
              <motion.input
                animate={projectData.name ? { scale: [1, 1.02, 1] } : {}}
                type="text"
                value={projectData.name}
                onChange={(e) => setProjectData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                placeholder="Enter project name"
              />
              <div className="text-right text-xs text-gray-400 mt-1">30</div>
            </div>

            {/* Project URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project URL</label>
              <motion.input
                animate={projectData.url ? { scale: [1, 1.02, 1] } : {}}
                type="text"
                value={projectData.url}
                onChange={(e) => setProjectData((prev) => ({ ...prev, url: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                placeholder="https://your-project.com"
              />
            </div>

            {/* Tagline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tagline <span className="text-red-500">*</span>
              </label>
              <motion.input
                animate={projectData.tagline ? { scale: [1, 1.02, 1] } : {}}
                type="text"
                value={projectData.tagline}
                onChange={(e) => setProjectData((prev) => ({ ...prev, tagline: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                placeholder="Brief description of your project"
              />
              <div className="text-right text-xs text-gray-400 mt-1">60</div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category(ies)</label>
              <motion.div
                animate={projectData.categories.length > 0 ? { scale: [1, 1.02, 1] } : {}}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white min-h-[48px] flex items-center"
              >
                {projectData.categories.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {projectData.categories.map((category, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {category}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400">Select categories</span>
                )}
              </motion.div>
              <div className="text-right text-xs text-gray-400 mt-1">Upto 3</div>
            </div>

            {/* Built With */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Built with</label>
              <motion.div
                animate={projectData.builtWith.length > 0 ? { scale: [1, 1.02, 1] } : {}}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white min-h-[48px] flex items-center"
              >
                {projectData.builtWith.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {projectData.builtWith.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400">Select technologies</span>
                )}
              </motion.div>
              <div className="text-right text-xs text-gray-400 mt-1">Upto 10</div>
            </div>

            {/* Collaborators */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Collaborators</label>
              <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white min-h-[48px] flex items-center">
                <span className="text-gray-400">Add collaborators</span>
              </div>
            </div>
          </div>

          {projectData.logo && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">MEDIA</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                  <div className="flex items-center justify-center w-24 h-24 bg-white border-2 border-dashed border-gray-300 rounded-lg">
                    <motion.img
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      src={projectData.logo}
                      alt="Project Logo"
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "/ai-logo.png"
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Recommended: 500px x 500px • Max 15mb</p>
                </div>
              </div>
            </div>
          )}

          {/* Suggested Technologies */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Suggested</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "Cursor" },
                { name: "OpenAI" },
                { name: "Python" },
                { name: "JavaScript" },
                { name: "Shadcn" },
              ].map((tech) => (
                <button
                  key={tech.name}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm">{tech.name}</span>
                  <span className="text-green-500 text-lg">+</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Sidebar */}
        <div className="w-80">
          <div
            className={`rounded-lg p-6 border ${
              getCompletionPercentage() === 100 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
            }`}
          >
            <div
              className={`text-4xl font-bold mb-2 ${
                getCompletionPercentage() === 100 ? "text-green-500" : "text-red-500"
              }`}
            >
              {getCompletionPercentage()}%
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Completion</h3>

            {/* Green Progress Bar */}
            {getCompletionPercentage() === 100 && (
              <div className="w-full bg-green-200 rounded-full h-2 mb-4">
                <div className="bg-green-500 h-2 rounded-full w-full"></div>
              </div>
            )}

            <p className="text-sm text-gray-600 mb-6">
              Complete 100% of your project details to make it eligible for launching on Peerlist Launchpad.
            </p>

            <div className="space-y-3">
              {fieldChecklist.map((field) => (
                <motion.div
                  key={field.key}
                  animate={field.completed ? { scale: [1, 1.05, 1] } : {}}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      field.completed ? "bg-green-500 border-green-500" : "border-gray-300"
                    }`}
                  >
                    {field.completed && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                      >
                        <path d="m9 12 2 2 4-4" />
                      </motion.svg>
                    )}
                  </div>
                  <span
                    className={`text-sm ${field.completed ? "text-gray-900" : "text-gray-500"} ${
                      getCompletionPercentage() === 100 && field.completed ? "line-through" : ""
                    }`}
                  >
                    {field.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
