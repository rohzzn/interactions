"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const avatars = [
  { id: 1, name: "Alex", color: "#FF6B6B", image: "/avatar.png" },
  { id: 2, name: "Sam", color: "#4ECDC4", image: "/people/person4.png" },
  { id: 3, name: "Jordan", color: "#45B7D1", image: "/professional-headshot-glasses.png" },
  { id: 4, name: "Casey", color: "#96CEB4", image: "/smiling-professional-headshot.png" },
  { id: 5, name: "Riley", color: "#FFEAA7", image: "/professional-headshot-of-a-person-with-long-hair.png" },
  { id: 6, name: "Morgan", color: "#DDA0DD", image: "/diverse-person-portrait.png" },
]

type Shape = "circle" | "hexagon" | "diamond" | "triangle"

export function AvatarStack() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [currentShape, setCurrentShape] = useState<Shape>("circle")
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto-cycle through shapes
  useEffect(() => {
    const shapes: Shape[] = ["circle", "hexagon", "diamond", "triangle"]
    let currentIndex = 0

    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % shapes.length
        setCurrentShape(shapes[currentIndex])
        setIsAnimating(false)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const getShapePath = (shape: Shape) => {
    switch (shape) {
      case "circle":
        return "M40,10 A30,30 0 1,1 40,70 A30,30 0 1,1 40,10"
      case "hexagon":
        return "M40,10 L60,25 L60,55 L40,70 L20,55 L20,25 Z"
      case "diamond":
        return "M40,10 L65,40 L40,70 L15,40 Z"
      case "triangle":
        return "M40,10 L70,60 L10,60 Z"
      default:
        return "M40,10 A30,30 0 1,1 40,70 A30,30 0 1,1 40,10"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  }

  const avatarVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotateY: -90,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className="flex flex-col items-center space-y-12">
      {/* Shape Indicator */}
      <div className="flex items-center space-x-4">
        <div className="w-2 h-2 bg-[#10AE4C] rounded-full animate-pulse" />
        <span className="text-sm font-light text-[#181818] tracking-wider uppercase">{currentShape} Mode</span>
        <div className="w-2 h-2 bg-[#10AE4C] rounded-full animate-pulse" />
      </div>

      {/* Avatar Stack */}
      <motion.div className="relative" variants={containerVariants} initial="hidden" animate="visible">
        <div className="flex items-center justify-center space-x-[-20px]">
          {avatars.map((avatar, index) => (
            <motion.div
              key={avatar.id}
              className="relative group cursor-pointer"
              variants={avatarVariants}
              whileHover={{
                scale: 1.2,
                zIndex: 10,
                rotateY: 15,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              onHoverStart={() => setHoveredId(avatar.id)}
              onHoverEnd={() => setHoveredId(null)}
              style={{ zIndex: avatars.length - index }}
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30"
                style={{ backgroundColor: avatar.color }}
                animate={{
                  scale: hoveredId === avatar.id ? 1.5 : 1,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Avatar Container */}
              <motion.div
                className="relative w-20 h-20 overflow-hidden"
                animate={{
                  rotate: isAnimating ? 360 : 0,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* Dynamic Shape Mask */}
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <clipPath id={`clip-${avatar.id}`}>
                      <motion.path
                        d={getShapePath(currentShape)}
                        animate={{
                          d: getShapePath(currentShape),
                        }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                    </clipPath>
                  </defs>
                </svg>

                {/* Avatar Image */}
                <motion.img
                  src={avatar.image}
                  alt={avatar.name}
                  className="w-full h-full object-cover"
                  style={{ clipPath: `url(#clip-${avatar.id})` }}
                  animate={{
                    filter: hoveredId === avatar.id ? "brightness(1.1) saturate(1.2)" : "brightness(1) saturate(1)",
                  }}
                />

                {/* Color Overlay */}
                <motion.div
                  className="absolute inset-0 mix-blend-overlay opacity-0 group-hover:opacity-20"
                  style={{
                    backgroundColor: avatar.color,
                    clipPath: `url(#clip-${avatar.id})`,
                  }}
                  animate={{
                    opacity: hoveredId === avatar.id ? 0.2 : 0,
                  }}
                />

                {/* Border */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#10AE4C] opacity-0 group-hover:opacity-100"
                  style={{ clipPath: `url(#clip-${avatar.id})` }}
                  animate={{
                    borderColor: hoveredId === avatar.id ? "#10AE4C" : "transparent",
                  }}
                />
              </motion.div>

              {/* Name Label */}
              <AnimatePresence>
                {hoveredId === avatar.id && (
                  <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-[#181818] text-white px-3 py-1 rounded text-sm font-light whitespace-nowrap">
                      {avatar.name}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#10AE4C] rounded-full"
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Interaction Hint */}
      <motion.p
        className="text-sm text-[#181818]/60 font-light"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        Hover to reveal names • Shapes auto-cycle every 4 seconds
      </motion.p>
    </div>
  )
}
