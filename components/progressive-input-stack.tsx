"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Step {
  id: number
  title: string
  type: "text" | "email" | "select" | "textarea"
  placeholder?: string
  options?: string[]
  required?: boolean
}

const steps: Step[] = [
  {
    id: 1,
    title: "What do humans call you?",
    type: "text",
    placeholder: "Your totally unique name (or the one your parents gave you)",
    required: true,
  },
  {
    id: 2,
    title: "Where do the internet letters find you?",
    type: "email",
    placeholder: "your.email@somewhere.com (we promise not to spam... much)",
    required: true,
  },
  {
    id: 3,
    title: "What's your superpower?",
    type: "select",
    options: ["Design Wizard", "Code Ninja", "Product Guru", "Marketing Magician", "Data Detective", "Other Human"],
    required: true,
  },
  {
    id: 4,
    title: "Spill the tea about your project",
    type: "textarea",
    required: true,
  },
]

export function ProgressiveInputStack() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Record<number, string>>({})
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playStepSound = (type: "next" | "complete" | "previous") => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.volume = 0.2
    }

    // Create different tones for different actions
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    if (type === "next") {
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.1)
    } else if (type === "previous") {
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
    } else {
      // Success chord
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime) // C
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1) // E
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2) // G
    }

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  const handleInputChange = (value: string) => {
    setFormData((prev) => ({ ...prev, [currentStep]: value }))
  }

  const handleNext = () => {
    const currentStepData = steps.find((s) => s.id === currentStep)
    const currentValue = formData[currentStep] || ""

    if (currentStepData?.required && !currentValue.trim()) {
      return
    }

    if (currentStep < steps.length) {
      playStepSound("next")
      setCompletedSteps((prev) => [...prev.filter((s) => s !== currentStep), currentStep])
      setCurrentStep(currentStep + 1)
    } else {
      playStepSound("complete")
      setIsComplete(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      playStepSound("previous")
      setCompletedSteps((prev) => prev.filter((s) => s !== currentStep - 1))
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = steps.find((s) => s.id === currentStep)
  const currentValue = formData[currentStep] || ""
  const canProceed = !currentStepData?.required || currentValue.trim().length > 0

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-[#10AE4C] rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="text-2xl font-light text-[#181818] mb-4">You're officially awesome! 🎉</h3>
        <p className="text-gray-600 mb-6">Thanks for sharing your brilliance with us!</p>
        <button
          onClick={() => {
            setCurrentStep(1)
            setFormData({})
            setCompletedSteps([])
            setIsComplete(false)
          }}
          className="mt-6 px-6 py-2 border border-[#181818] text-[#181818] hover:bg-[#181818] hover:text-white transition-colors font-light rounded-full"
        >
          Start Over
        </button>
      </motion.div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Step Stack */}
      <div className="relative min-h-[180px]">
        {completedSteps.map((stepId, index) => (
          <motion.div
            key={`completed-${stepId}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: -(index + 1) * 8,
              x: -(index + 1) * 8,
              zIndex: 10 - index,
            }}
            className="absolute inset-0 bg-white border-2 border-gray-200 rounded-2xl shadow-sm"
            style={{
              width: "100%",
              height: "180px",
            }}
          />
        ))}

        {/* Current Step Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0, zIndex: 20 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg"
            style={{ height: "180px" }}
          >
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <div className="w-1 h-6 bg-black rounded-full mr-3"></div>
                <h3 className="text-lg font-medium text-gray-400">{currentStepData?.title}</h3>
              </div>

              {currentStepData?.type === "select" ? (
                <select
                  value={currentValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full text-lg text-gray-700 bg-transparent border-none outline-none"
                >
                  <option value="">Choose your superpower...</option>
                  {currentStepData.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : currentStepData?.type === "textarea" ? (
                <textarea
                  value={currentValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  rows={3}
                  className="w-full text-lg text-gray-700 bg-transparent border-none outline-none placeholder-gray-300 resize-none"
                />
              ) : (
                <input
                  type={currentStepData?.type || "text"}
                  value={currentValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentStepData?.placeholder}
                  className="w-full text-lg text-gray-700 bg-transparent border-none outline-none placeholder-gray-300"
                />
              )}
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
              {currentStep > 1 ? (
                <button
                  onClick={handlePrevious}
                  className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              ) : (
                <div></div>
              )}

              <button
                onClick={handleNext}
                disabled={!canProceed}
                className={`px-8 py-3 rounded-full font-medium transition-colors ${
                  canProceed ? "bg-black text-white hover:bg-gray-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {currentStep === steps.length ? (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Done
                  </span>
                ) : (
                  <span className="flex items-center">
                    Next
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
