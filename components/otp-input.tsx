"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface OTPInputProps {
  length?: number
  onComplete?: (otp: string) => void
}

export function OTPInput({ length = 6, onComplete }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""))
  const [activeIndex, setActiveIndex] = useState(0)
  const [states, setStates] = useState<("default" | "active" | "correct" | "incorrect")[]>(
    new Array(length).fill("default"),
  )
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Mock validation - in real app this would be an API call
  const correctOTP = "123456"

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    const newStates = [...states]

    newOtp[index] = value
    newStates[index] = value ? "active" : "default"

    setOtp(newOtp)
    setStates(newStates)

    // Move to next input
    if (value && index < length - 1) {
      setActiveIndex(index + 1)
      inputRefs.current[index + 1]?.focus()
    }

    // Check if OTP is complete
    if (newOtp.every((digit) => digit !== "")) {
      const otpString = newOtp.join("")
      setTimeout(() => {
        if (otpString === correctOTP) {
          setStates(new Array(length).fill("correct"))
          onComplete?.(otpString)
        } else {
          setStates(new Array(length).fill("incorrect"))
          // Reset after showing error
          setTimeout(() => {
            setOtp(new Array(length).fill(""))
            setStates(new Array(length).fill("default"))
            setActiveIndex(0)
            inputRefs.current[0]?.focus()
          }, 1500)
        }
      }, 300)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setActiveIndex(index - 1)
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleFocus = (index: number) => {
    setActiveIndex(index)
  }

  const getInputStyle = (index: number) => {
    const state = states[index]
    const isActive = activeIndex === index

    switch (state) {
      case "active":
        return "border-[#10AE4C] bg-[#10AE4C]/5"
      case "correct":
        return "border-[#10AE4C] bg-[#10AE4C]/10 text-[#10AE4C]"
      case "incorrect":
        return "border-red-500 bg-red-50 text-red-500"
      default:
        return isActive ? "border-[#181818] bg-white" : "border-[#181818]/30 bg-[#f8f8f8]"
    }
  }

  const getPulseAnimation = (index: number) => {
    if (states[index] === "active" && activeIndex === index) {
      return {
        scale: [1, 1.02, 1],
        transition: { duration: 0.3 },
      }
    }
    return {}
  }

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-light text-[#181818]">Enter Verification Code</h2>
        <p className="text-sm text-[#181818]/70">We've sent a 6-digit code to your device</p>
      </div>

      <div className="flex gap-3">
        {otp.map((digit, index) => (
          <motion.div key={index} animate={getPulseAnimation(index)} className="relative">
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={() => handleFocus(index)}
              className={`
                w-12 h-14 text-center text-xl font-medium border-2 rounded-lg
                transition-all duration-200 outline-none
                ${getInputStyle(index)}
              `}
            />

            {/* Active state indicator */}
            <AnimatePresence>
              {activeIndex === index && states[index] === "default" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-[#10AE4C] rounded-full"
                />
              )}
            </AnimatePresence>

            {/* Success checkmark */}
            <AnimatePresence>
              {states[index] === "correct" && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#10AE4C] rounded-full flex items-center justify-center"
                >
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error shake animation */}
            <AnimatePresence>
              {states[index] === "incorrect" && (
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [-2, 2, -2, 2, 0] }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 pointer-events-none"
                />
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Status messages */}
      <AnimatePresence mode="wait">
        {states.every((state) => state === "correct") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[#10AE4C] text-sm font-medium"
          >
            ✓ Verification successful!
          </motion.div>
        )}

        {states.every((state) => state === "incorrect") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 text-sm font-medium"
          >
            ✗ Invalid code. Please try again.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-xs text-[#181818]/50 text-center">
        Try entering: <span className="font-mono bg-[#181818]/5 px-2 py-1 rounded">123456</span>
      </div>
    </div>
  )
}
