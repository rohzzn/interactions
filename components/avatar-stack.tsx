"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const avatars = [
  { id: 1, name: "Jay", image: "/Jay.jpeg" },
  { id: 2, name: "Ankit", image: "/Ankit.jpeg" },
  { id: 3, name: "Akash", image: "/Akash.jpeg" },
  { id: 4, name: "Yogini", image: "/Yogini.jpeg" },
]

export function AvatarStack() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    const initialPositions = avatars.map((_, index) => ({
      x: index * 80 - (avatars.length * 80) / 2 + 40,
      y: 0,
    }))
    setPositions(initialPositions)
  }, [])

  const calculateSurfaceTension = (currentIndex: number) => {
    if (positions.length === 0) return { x: 0, y: 0 }

    let forceX = 0
    let forceY = 0

    positions.forEach((pos, index) => {
      if (index === currentIndex) return

      const dx = positions[currentIndex].x - pos.x
      const dy = positions[currentIndex].y - pos.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 0) {
        // Surface tension: attract at medium distance, repel when too close
        let force = 0
        if (distance < 60) {
          // Repel when too close
          force = (60 - distance) * 0.3
        } else if (distance < 120) {
          // Attract at medium distance
          force = -(distance - 60) * 0.1
        }

        const normalizedX = dx / distance
        const normalizedY = dy / distance

        forceX += normalizedX * force
        forceY += normalizedY * force
      }
    })

    return { x: forceX, y: forceY }
  }

  return (
    <div className="flex flex-col items-center space-y-16">
      <div className="flex items-center space-x-2">
        <motion.div
          className="w-1 h-1 bg-[#10AE4C] rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <span className="text-xs font-light text-[#181818]/60 tracking-widest uppercase">Surface Tension</span>
        <motion.div
          className="w-1 h-1 bg-[#10AE4C] rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
      </div>

      <div className="relative">
        <div className="flex items-center justify-center space-x-4">
          {avatars.map((avatar, index) => {
            const tension = calculateSurfaceTension(index)

            return (
              <motion.div
                key={avatar.id}
                className="relative cursor-pointer"
                onHoverStart={() => setHoveredId(avatar.id)}
                onHoverEnd={() => setHoveredId(null)}
                animate={{
                  x: tension.x,
                  y: tension.y + Math.sin(Date.now() * 0.001 + index) * 3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 20,
                  mass: 1,
                }}
                whileHover={{
                  scale: 1.05,
                  y: tension.y - 10,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                {hoveredId === avatar.id && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                  >
                    {avatars.map((_, otherIndex) => {
                      if (otherIndex === index) return null
                      const angle = (otherIndex - index) * 30
                      return (
                        <motion.div
                          key={otherIndex}
                          className="absolute top-1/2 left-1/2 w-16 h-px bg-gradient-to-r from-[#10AE4C]/20 to-transparent origin-left"
                          style={{
                            transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                          }}
                          animate={{
                            scaleX: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: otherIndex * 0.2,
                          }}
                        />
                      )
                    })}
                  </motion.div>
                )}

                <motion.div
                  className="absolute top-20 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-[#181818]/10 rounded-full blur-sm"
                  animate={{
                    scale: hoveredId === avatar.id ? 1.2 : 1,
                    opacity: hoveredId === avatar.id ? 0.4 : 0.2,
                  }}
                />

                <motion.div
                  className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg"
                  animate={{
                    borderColor: hoveredId === avatar.id ? "#10AE4C" : "white",
                    boxShadow:
                      hoveredId === avatar.id
                        ? "0 15px 30px rgba(16, 174, 76, 0.2)"
                        : "0 5px 15px rgba(24, 24, 24, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={avatar.image}
                    alt={avatar.name}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredId === avatar.id ? 1.03 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none"
                  animate={{
                    opacity: hoveredId === avatar.id ? 1 : 0,
                    y: hoveredId === avatar.id ? 0 : 10,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-[#181818] text-white px-2 py-1 rounded text-xs font-light whitespace-nowrap">
                    {avatar.name}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <motion.p
        className="text-xs text-[#181818]/40 font-light tracking-wide"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        Hover to see molecular bonds
      </motion.p>
    </div>
  )
}
