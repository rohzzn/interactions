"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function WarpOverlay() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentState, setCurrentState] = useState<"pin" | "map" | "route" | "directions">("pin")
  const [selectedDestination, setSelectedDestination] = useState<string>("")
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playSound = (frequency: number, duration = 200) => {
    if (typeof window !== "undefined") {
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
  }

  const handlePinClick = () => {
    setIsOpen(true)
    setCurrentState("map")
    playSound(800, 300)
  }

  const handleDestinationSelect = (destination: string) => {
    setSelectedDestination(destination)
    setCurrentState("route")
    playSound(600, 200)
  }

  const handleGetDirections = () => {
    setCurrentState("directions")
    playSound(400, 400)
  }

  const handleClose = () => {
    setIsOpen(false)
    setCurrentState("pin")
    setSelectedDestination("")
    playSound(300, 200)
  }

  const destinations = [
    { name: "Coffee Shop", distance: "0.3 mi", time: "2 min" },
    { name: "Central Park", distance: "1.2 mi", time: "8 min" },
    { name: "Museum", distance: "2.1 mi", time: "15 min" },
    { name: "Airport", distance: "12.5 mi", time: "35 min" },
  ]

  return (
    <div className="relative flex items-center justify-center min-h-[300px]">
      {/* Map Pin Trigger */}
      <motion.button
        onClick={handlePinClick}
        className="relative bg-[#10AE4C] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: isOpen ? 0 : 1,
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="w-12 h-12 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>

        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#10AE4C]"
          animate={{
            scale: [1, 2, 3],
            opacity: [0.5, 0.2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />
      </motion.button>

      {/* Warp Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* Main Overlay */}
            <motion.div
              className="relative bg-[#f8f8f8] border-2 border-[#181818] shadow-2xl overflow-hidden"
              initial={{
                scale: 0,
                borderRadius: "50%",
                width: 48,
                height: 48,
              }}
              animate={{
                scale: 1,
                borderRadius: currentState === "directions" ? "12px" : "24px",
                width: currentState === "directions" ? 400 : 350,
                height: currentState === "directions" ? 500 : 400,
              }}
              exit={{
                scale: 0,
                borderRadius: "50%",
                width: 48,
                height: 48,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.6,
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-white border border-[#181818] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Content States */}
              <AnimatePresence mode="wait">
                {currentState === "map" && (
                  <motion.div
                    key="map"
                    className="p-6 h-full flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-light text-[#181818] mb-4">Where to?</h3>

                    {/* Mock Map */}
                    <div className="flex-1 bg-gradient-to-br from-green-100 to-blue-100 border border-[#181818] rounded-lg mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <path d="M10,20 Q30,10 50,20 T90,20" stroke="#10AE4C" strokeWidth="0.5" fill="none" />
                          <path d="M20,40 Q40,30 60,40 T100,40" stroke="#10AE4C" strokeWidth="0.5" fill="none" />
                          <path d="M5,60 Q25,50 45,60 T85,60" stroke="#10AE4C" strokeWidth="0.5" fill="none" />
                        </svg>
                      </div>

                      {/* Current Location Pin */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <div className="w-4 h-4 bg-[#10AE4C] rounded-full border-2 border-white shadow-lg"></div>
                      </motion.div>
                    </div>

                    {/* Destination List */}
                    <div className="space-y-2">
                      {destinations.map((dest, index) => (
                        <motion.button
                          key={dest.name}
                          onClick={() => handleDestinationSelect(dest.name)}
                          className="w-full p-3 border border-[#181818] rounded-lg hover:bg-[#10AE4C] hover:text-white transition-colors text-left"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="font-medium">{dest.name}</div>
                          <div className="text-sm opacity-70">
                            {dest.distance} • {dest.time}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentState === "route" && (
                  <motion.div
                    key="route"
                    className="p-6 h-full flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-light text-[#181818] mb-4">Route to {selectedDestination}</h3>

                    {/* Route Visualization */}
                    <div className="flex-1 bg-gradient-to-br from-green-100 to-blue-100 border border-[#181818] rounded-lg mb-4 relative overflow-hidden">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Animated Route Path */}
                        <motion.path
                          d="M20,80 Q30,60 40,50 Q50,40 60,30 Q70,20 80,20"
                          stroke="#10AE4C"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="5,5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                        />

                        {/* Start Point */}
                        <circle cx="20" cy="80" r="3" fill="#10AE4C" />

                        {/* End Point */}
                        <motion.circle
                          cx="80"
                          cy="20"
                          r="3"
                          fill="#10AE4C"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.5 }}
                        />
                      </svg>
                    </div>

                    {/* Route Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center p-3 bg-white border border-[#181818] rounded-lg">
                        <span>Distance</span>
                        <span className="font-medium">
                          {destinations.find((d) => d.name === selectedDestination)?.distance}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white border border-[#181818] rounded-lg">
                        <span>Estimated Time</span>
                        <span className="font-medium">
                          {destinations.find((d) => d.name === selectedDestination)?.time}
                        </span>
                      </div>
                    </div>

                    <motion.button
                      onClick={handleGetDirections}
                      className="w-full bg-[#10AE4C] text-white py-3 rounded-lg font-medium hover:bg-[#0e9640] transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Directions
                    </motion.button>
                  </motion.div>
                )}

                {currentState === "directions" && (
                  <motion.div
                    key="directions"
                    className="p-6 h-full flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-light text-[#181818] mb-4">Turn-by-turn Directions</h3>

                    {/* Directions List */}
                    <div className="flex-1 space-y-3 overflow-y-auto">
                      {[
                        { icon: "↑", text: "Head north on Main St", distance: "0.2 mi" },
                        { icon: "→", text: "Turn right onto Oak Ave", distance: "0.5 mi" },
                        { icon: "↑", text: "Continue straight", distance: "0.8 mi" },
                        { icon: "←", text: "Turn left onto Park Blvd", distance: "0.3 mi" },
                        { icon: "🏁", text: `Arrive at ${selectedDestination}`, distance: "" },
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-white border border-[#181818] rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-8 h-8 bg-[#10AE4C] text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {step.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{step.text}</div>
                            {step.distance && <div className="text-sm text-gray-600">{step.distance}</div>}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      onClick={handleClose}
                      className="w-full bg-[#181818] text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-4"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Start Navigation
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
