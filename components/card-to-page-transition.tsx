"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

interface Card {
  id: number
  title: string
  description: string
  image: string
  route: string
}

const cards: Card[] = [
  {
    id: 1,
    title: "Layoff Tracker",
    description: "Connecting people impacted with companies hiring",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-02J6rfzBgQGJu1N9I6Kb8BE0kgrmXT.png",
    route: "/layoff-tracker",
  },
  {
    id: 2,
    title: "Internship Finder",
    description: "Find tech internships in your favorite startups",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-okCTEufU4gWu5Eh7WcYt4VA8kNwD0t.png",
    route: "/internship-finder",
  },
  {
    id: 3,
    title: "GitHub Recap",
    description: "1000 days of code in a glance",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qSnyJJhM2sMmP1xByL4B2cK7sR3GDP.png",
    route: "/github-recap",
  },
]

export function CardToPageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const router = useRouter()

  const handleCardClick = (card: Card) => {
    setSelectedCard(card)
    setIsTransitioning(true)

    setTimeout(() => {
      router.push(card.route)
    }, 2500)
  }

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      <AnimatePresence>
        {isTransitioning && selectedCard && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Ink blot spreading effect */}
            <motion.div
              className="absolute inset-0 bg-[#181818]"
              initial={{
                clipPath: "circle(0% at 50% 50%)",
                opacity: 0,
              }}
              animate={{
                clipPath: "circle(150% at 50% 50%)",
                opacity: 1,
              }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />

            {/* Ink drip effects */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`drip-${i}`}
                className="absolute bg-[#181818]"
                style={{
                  width: "2px",
                  left: `${20 + i * 15}%`,
                  top: "0%",
                }}
                initial={{
                  height: "0%",
                  opacity: 0,
                }}
                animate={{
                  height: "100%",
                  opacity: [0, 0.6, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.8 + i * 0.2,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            ))}

            {/* Page content revelation */}
            <motion.div
              className="absolute inset-0 bg-white flex items-center justify-center"
              initial={{
                clipPath: "circle(0% at 50% 50%)",
                opacity: 0,
              }}
              animate={{
                clipPath: "circle(100% at 50% 50%)",
                opacity: 1,
              }}
              transition={{
                duration: 1.0,
                delay: 1.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 2.0,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <h1 className="text-4xl font-light text-[#181818] mb-4">{selectedCard.title}</h1>
                <p className="text-[#181818]/70 font-light">{selectedCard.description}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className="bg-white border border-[#181818] cursor-pointer group hover:shadow-lg transition-all duration-500 overflow-hidden"
            initial={{ opacity: 0, y: 40, rotateY: -15 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{
              y: -12,
              rotateY: 5,
              boxShadow: "0 25px 50px rgba(24, 24, 24, 0.12)",
              transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-48 overflow-hidden relative">
              <motion.img
                src={card.image || "/placeholder.svg"}
                alt={card.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-white/25 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-light text-[#181818] mb-2 group-hover:text-[#10AE4C] transition-colors duration-500">
                {card.title}
              </h3>
              <p className="text-[#181818]/70 font-light text-sm">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
