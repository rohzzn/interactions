"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Card {
  id: number
  title: string
  description: string
  image: string
  content: string
}

const cards: Card[] = [
  {
    id: 1,
    title: "Layoff Tracker",
    description: "Connecting people impacted with companies hiring",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-02J6rfzBgQGJu1N9I6Kb8BE0kgrmXT.png",
    content:
      "Layoff Tracker helps connect people impacted by layoffs with companies that are actively hiring. We track the latest layoffs across tech companies and startups in real-time, providing transparency and support during difficult times. Our platform not only shares news of layoffs and lists those affected, but also bridges the gap by connecting talented individuals with opportunities at companies that are growing and hiring.",
  },
  {
    id: 2,
    title: "Internship Finder",
    description: "Find tech internships in your favorite startups",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-okCTEufU4gWu5Eh7WcYt4VA8kNwD0t.png",
    content:
      "Discover amazing tech internship opportunities from top companies like Google, Microsoft, Amazon, Figma, and many exciting startups. Our platform makes it easy to find the perfect internship that matches your skills and interests. With comprehensive filters for company, role, and location, plus a helpful career blog to guide you through the application process, we're here to help you launch your tech career.",
  },
  {
    id: 3,
    title: "GitHub Recap",
    description: "1000 days of code in a glance",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qSnyJJhM2sMmP1xByL4B2cK7sR3GDP.png",
    content:
      "We've built a simple tool to help you visualize your 1000 days of coding journey in just a glance. Simply enter your GitHub username and download a beautiful 3-year recap of your work. See your coding streaks, total contributions, and most active periods all in one elegant visualization that you can share with your peers and showcase your dedication to continuous learning and development.",
  },
]

export function CardToPageTransition() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleCardClick = (card: Card) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedCard(card)
      setIsTransitioning(false)
    }, 800)
  }

  const handleClose = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedCard(null)
      setIsTransitioning(false)
    }, 800)
  }

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Silk curtain panels */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 bg-gradient-to-b from-white/90 via-white/95 to-white/90 backdrop-blur-sm"
                style={{
                  left: `${(i * 100) / 12}%`,
                  width: `${100 / 12}%`,
                  height: "100%",
                  transformOrigin: "top center",
                }}
                initial={{
                  scaleY: 0,
                  rotateX: -90,
                  opacity: 0,
                }}
                animate={{
                  scaleY: [0, 1.2, 1, 0],
                  rotateX: [-90, 10, 0, -90],
                  opacity: [0, 0.9, 0.95, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.3, 0.7, 1],
                }}
                style={{
                  boxShadow: `inset 0 0 20px rgba(16, 174, 76, 0.1), 
                             0 0 30px rgba(255, 255, 255, 0.3)`,
                  filter: "blur(0.5px)",
                }}
              />
            ))}

            {/* Flowing silk effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{
                x: ["100%", "200%"],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), rgba(16,174,76,0.1), rgba(255,255,255,0.4), transparent)",
                filter: "blur(1px)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!selectedCard ? (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="bg-white border border-[#181818] cursor-pointer group hover:shadow-lg transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(24, 24, 24, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-full h-48 overflow-hidden relative">
                  <motion.img
                    src={card.image || "/placeholder.svg"}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-light text-[#181818] mb-2 group-hover:text-[#10AE4C] transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-[#181818]/70 font-light text-sm">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="page"
            className="bg-white border border-[#181818] max-w-4xl mx-auto overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2,
            }}
          >
            <div className="w-full h-64 md:h-80 overflow-hidden relative">
              <motion.img
                src={selectedCard.image || "/placeholder.svg"}
                alt={selectedCard.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-6">
                <motion.h1
                  className="text-3xl md:text-4xl font-light text-[#181818]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {selectedCard.title}
                </motion.h1>
                <motion.button
                  onClick={handleClose}
                  className="text-[#181818] hover:text-[#10AE4C] transition-colors p-2 hover:bg-[#10AE4C]/10 rounded-full"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </motion.button>
              </div>
              <motion.p
                className="text-lg text-[#181818]/70 font-light mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {selectedCard.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="prose prose-lg max-w-none"
              >
                <p className="text-[#181818] font-light leading-relaxed">{selectedCard.content}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
