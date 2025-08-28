"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FileItem {
  id: string
  name: string
  type: "document" | "image" | "code"
  size: string
}

const files: FileItem[] = [
  { id: "1", name: "Project Brief.pdf", type: "document", size: "2.4 MB" },
  { id: "2", name: "Design System.sketch", type: "image", size: "15.7 MB" },
  { id: "3", name: "Components.tsx", type: "code", size: "8.2 KB" },
  { id: "4", name: "User Research.docx", type: "document", size: "1.8 MB" },
  { id: "5", name: "Wireframes.fig", type: "image", size: "12.3 MB" },
]

export function InteractiveFolder() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 })
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playSound = (type: "open" | "close" | "hover" | "click") => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = context.createOscillator()
    const gainNode = context.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(context.destination)

    const frequencies = { open: 800, close: 400, hover: 600, click: 700 }
    oscillator.frequency.setValueAtTime(frequencies[type], context.currentTime)
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0, context.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.2)

    oscillator.start(context.currentTime)
    oscillator.stop(context.currentTime + 0.2)
  }

  const handleFolderClick = () => {
    setIsOpen(!isOpen)
    playSound(isOpen ? "close" : "open")
  }

  const handleFolderHover = (hovered: boolean) => {
    setIsHovered(hovered)
    if (hovered && !isOpen) {
      playSound("hover")
    }
  }

  const handleFileClick = (fileId: string) => {
    setSelectedFile(selectedFile === fileId ? null : fileId)
    playSound("click")
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return "📄"
      case "image":
        return "🎨"
      case "code":
        return "💻"
      default:
        return "📄"
    }
  }

  return (
    <div className="flex flex-col items-center space-y-8 relative min-h-[600px]">
      <div className="relative z-10">
        <motion.div
          className="relative cursor-pointer"
          onClick={handleFolderClick}
          onHoverStart={() => handleFolderHover(true)}
          onHoverEnd={() => handleFolderHover(false)}
          whileHover={{ scale: 1.05, rotateY: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Folder Base with enhanced 3D appearance */}
          <motion.div
            className="w-40 h-32 bg-gradient-to-br from-[#10AE4C] via-[#0ea844] to-[#0d8f3f] rounded-lg shadow-2xl relative overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateX: isOpen ? -25 : isHovered ? -5 : 0,
              rotateY: isHovered ? 8 : 0,
              z: isOpen ? 50 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {/* Folder Tab with better positioning */}
            <motion.div
              className="absolute -top-3 left-6 w-20 h-8 bg-gradient-to-br from-[#10AE4C] to-[#0d8f3f] rounded-t-xl shadow-lg"
              animate={{
                rotateX: isOpen ? -15 : 0,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            />

            {/* Enhanced folder highlight and texture */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-lg"
              animate={{
                opacity: isHovered ? 1 : 0.6,
              }}
            />

            {/* Folder edge highlight */}
            <div className="absolute inset-0 border border-white/20 rounded-lg" />

            {/* File Count Badge */}
            <motion.div
              className="absolute bottom-3 right-3 bg-white/95 text-[#181818] text-sm px-3 py-1.5 rounded-full font-semibold shadow-lg"
              animate={{
                scale: isOpen ? 0 : 1,
                opacity: isOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {files.length} files
            </motion.div>
          </motion.div>

          {/* Enhanced shadow */}
          <motion.div
            className="absolute inset-0 bg-black/30 rounded-lg blur-lg -z-10"
            animate={{
              y: isOpen ? 12 : 6,
              scale: isOpen ? 1.2 : 1,
              opacity: isOpen ? 0.4 : 0.3,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Window backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={handleFolderClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Actual folder window */}
            <motion.div
              className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag
              dragMomentum={false}
              dragElastic={0.1}
            >
              {/* Window title bar */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={handleFolderClick}
                      className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                    />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 flex items-center space-x-2">
                    <span className="text-lg">📁</span>
                    <span>Design Project</span>
                  </h3>
                </div>
                <div className="text-xs text-gray-500">{files.length} items</div>
              </div>

              {/* Window toolbar */}
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center space-x-4">
                <button className="text-xs text-gray-600 hover:text-gray-800 transition-colors">← Back</button>
                <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-600 border border-gray-200">
                  /Design Project
                </div>
                <button className="text-xs text-gray-600 hover:text-gray-800 transition-colors">View</button>
              </div>

              {/* File grid view */}
              <div className="p-6 bg-white min-h-[300px]">
                <div className="grid grid-cols-4 gap-6">
                  {files.map((file, index) => (
                    <motion.div
                      key={file.id}
                      className={`flex flex-col items-center space-y-2 p-3 rounded-lg cursor-pointer transition-all ${
                        selectedFile === file.id
                          ? "bg-blue-100 border-2 border-blue-300"
                          : "hover:bg-gray-50 border-2 border-transparent"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleFileClick(file.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="text-4xl"
                        animate={{
                          scale: selectedFile === file.id ? 1.1 : 1,
                        }}
                      >
                        {getFileIcon(file.type)}
                      </motion.div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-gray-800 truncate w-full">{file.name}</p>
                        <p className="text-xs text-gray-500">{file.size}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Window status bar */}
              <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
                <span>{files.length} items</span>
                <span>
                  {selectedFile ? `Selected: ${files.find((f) => f.id === selectedFile)?.name}` : "No selection"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="text-center"
        animate={{
          opacity: isOpen ? 0.5 : 1,
          y: isOpen ? 10 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <h3 className="text-xl font-light text-[#181818] mb-2">Design Project</h3>
        <p className="text-sm text-[#181818]/60">{isOpen ? "Folder window opened" : "Double-click to open"}</p>
      </motion.div>
    </div>
  )
}
