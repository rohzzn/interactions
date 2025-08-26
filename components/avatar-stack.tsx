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
      

      <div className="relative w-96 h-32 flex items-center justify-center">
        {avatars.map((avatar, index) => {
          const isHovered = hoveredId === avatar.id
          const isAnyHovered = hoveredId !== null

          return (
            <motion.div
              key={avatar.id}
              className="absolute cursor-pointer flex items-center"
              style={{
                zIndex: isHovered ? 50 : avatars.length - index,
              }}
              onHoverStart={() => setHoveredId(avatar.id)}
              onHoverEnd={() => setHoveredId(null)}
              animate={{
                x: isAnyHovered ? (isHovered ? 0 : 0) : (index - 1.5) * 50,
                y: isAnyHovered ? 0 : 0,
                opacity: isAnyHovered ? (isHovered ? 1 : 0) : 1,
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {/* Avatar */}
              <motion.div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white">
                <img
                  src={avatar.image || "/placeholder.svg"}
                  alt={avatar.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {isHovered && (
                <motion.div
                  className="ml-6 pointer-events-none"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-2xl font-light text-[#181818]">{avatar.name}</span>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      <motion.p
        className="text-xs text-[#181818]/40 font-light tracking-wide text-center"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        Hover to focus on individual
      </motion.p>
    </div>
  )
}
