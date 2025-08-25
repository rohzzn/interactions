"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const avatars = [
  { id: 1, name: "Jay", image: "/Jay.jpeg" },
  { id: 2, name: "Ankit", image: "/Ankit.jpeg" },
  { id: 3, name: "Akash", image: "/Akash.jpeg" },
  { id: 4, name: "Yogini", image: "/Yogini.jpeg" },
]

export function AvatarStack() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="flex flex-col items-center space-y-16">
      <div className="flex items-center space-x-2">
        <motion.div
          className="w-1 h-1 bg-[#10AE4C] rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <span className="text-xs font-light text-[#181818]/60 tracking-widest uppercase">Stacked Avatars</span>
        <motion.div
          className="w-1 h-1 bg-[#10AE4C] rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
      </div>

      <div className="relative">
        <div className="relative flex items-center">
          {avatars.map((avatar, index) => {
            const isHovered = hoveredId === avatar.id
            const isAnyHovered = hoveredId !== null
            const shouldExpand = isAnyHovered && !isHovered

            return (
              <motion.div
                key={avatar.id}
                className="relative cursor-pointer"
                style={{
                  zIndex: isHovered ? 50 : avatars.length - index,
                  marginLeft: index > 0 ? "-30px" : "0",
                }}
                onHoverStart={() => setHoveredId(avatar.id)}
                onHoverEnd={() => setHoveredId(null)}
                animate={{
                  x: shouldExpand ? (index - 1.5) * 45 : 0,
                  y: isHovered ? -25 : 0,
                  scale: isHovered ? 1.2 : shouldExpand ? 0.9 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {/* Avatar */}
                <motion.div
                  className="relative w-20 h-20 rounded-full overflow-hidden border-3 border-white shadow-lg"
                  animate={{
                    borderColor: isHovered ? "#10AE4C" : "white",
                    boxShadow: isHovered
                      ? "0 20px 40px rgba(16, 174, 76, 0.3), 0 0 0 4px rgba(16, 174, 76, 0.1)"
                      : "0 8px 25px rgba(24, 24, 24, 0.15)",
                  }}
                >
                  <motion.img
                    src={avatar.image}
                    alt={avatar.name}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                      filter: shouldExpand ? "brightness(0.7)" : "brightness(1)",
                    }}
                  />

                  {/* Hover overlay */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-[#10AE4C]/20 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.div>

                {/* Name label */}
                <motion.div
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 pointer-events-none"
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 10,
                    scale: isHovered ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-[#181818] text-white px-3 py-1.5 rounded-md text-sm font-light whitespace-nowrap shadow-lg">
                    {avatar.name}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <motion.p
        className="text-xs text-[#181818]/40 font-light tracking-wide text-center"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        Hover to expand the stack
      </motion.p>
    </div>
  )
}
