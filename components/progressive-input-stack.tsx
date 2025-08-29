"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Step {
  id: number
  title: string
  subtitle: string
  type: "text" | "email" | "select" | "textarea"
  placeholder?: string
  options?: string[]
  required?: boolean
}

const steps: Step[] = [
  {
    id: 1,
    title: "What do humans call you?",
    subtitle: "Don't worry, we won't judge your parents' naming skills",
    type: "text",
    placeholder: "Your totally awesome name here",
    required: true,
  },
  {
    id: 2,
    title: "Where do we spam you?",
    subtitle: "Promise we'll only send you the good stuff (and cat memes)",
    type: "email",
    placeholder: "your.email@somewhere.cool",
    required: true,
  },
  {
    id: 3,
    title: "What's your superpower?",
    subtitle: "AKA what you do when you're not procrastinating",
    type: "select",
    options: [
      "Design Wizard",
      "Code Ninja",
      "Product Whisperer",
      "Startup Dreamer",
      "Professional Student",
      "I'm Still Figuring It Out",
    ],
    required: true,
  },
  {
    id: 4,
    title: "Spill the tea about your project",
    subtitle: "What amazing thing are you building? (Or planning to build... someday)",
    type: "textarea",
    placeholder:
      "Tell us about your world-changing idea, side hustle, or that app you've been 'almost done' with for 6 months...",
    required: false,
  },
]

export function ProgressiveInputStack() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Record<number, string>>({})
  const [isComplete, setIsComplete] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playStepSound = (type: "next" | "complete") => {
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
      setCurrentStep(currentStep + 1)
    } else {
      playStepSound("complete")
      setIsComplete(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
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
        <h3 className="text-2xl font-light text-[#181818] mb-4">You're officially awesome!</h3>
        <p className="text-[#181818]/70 font-light">Thanks for not giving up halfway through. You're a legend!</p>
        <button
          onClick={() => {
            setCurrentStep(1)
            setFormData({})
            setIsComplete(false)
          }}
          className="mt-6 px-6 py-2 border border-[#181818] text-[#181818] hover:bg-[#181818] hover:text-white transition-colors font-light"
        >
          Start Over
        </button>
      </motion.div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-light text-[#181818]/70">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm font-light text-[#181818]/70">
            {Math.round((currentStep / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-[#181818]/10 h-1 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#10AE4C]"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Step Stack */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -50, rotateY: 15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <div className="bg-white border border-[#181818] p-8 shadow-lg">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h3 className="text-2xl font-light text-[#181818] mb-2">{currentStepData?.title}</h3>
                <p className="text-[#181818]/70 font-light mb-8">{currentStepData?.subtitle}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                {currentStepData?.type === "select" ? (
                  <select
                    value={currentValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="w-full p-4 border border-[#181818] bg-white text-[#181818] font-light focus:outline-none focus:border-[#10AE4C] transition-colors"
                  >
                    <option value="">Pick your poison</option>
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
                    placeholder={currentStepData.placeholder}
                    rows={4}
                    className="w-full p-4 border border-[#181818] bg-white text-[#181818] font-light focus:outline-none focus:border-[#10AE4C] transition-colors resize-none"
                  />
                ) : (
                  <input
                    type={currentStepData?.type || "text"}
                    value={currentValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={currentStepData?.placeholder}
                    className="w-full p-4 border border-[#181818] bg-white text-[#181818] font-light focus:outline-none focus:border-[#10AE4C] transition-colors"
                  />
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between"
              >
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 border border-[#181818] font-light transition-colors ${
                    currentStep === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#181818] hover:text-white"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`px-6 py-3 border font-light transition-colors ${
                    canProceed
                      ? "border-[#10AE4C] bg-[#10AE4C] text-white hover:bg-[#0e9642]"
                      : "border-[#181818] opacity-50 cursor-not-allowed"
                  }`}
                >
                  {currentStep === steps.length ? "Complete" : "Next"}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Background Cards */}
        <div className="absolute inset-0 -z-10">
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="absolute inset-0 bg-white border border-[#181818]/20"
              style={{
                transform: `translateY(${index * 4}px) translateX(${index * 2}px) scale(${1 - index * 0.02})`,
                opacity: 0.6 - index * 0.2,
              }}
              animate={{
                transform: `translateY(${index * 4}px) translateX(${index * 2}px) scale(${1 - index * 0.02})`,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
