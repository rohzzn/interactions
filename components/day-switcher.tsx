"use client"

import { useRef } from "react"

interface DaySwitcherProps {
  currentDay: number
  onDayChange: (day: number) => void
}

export function DaySwitcher({ currentDay, onDayChange }: DaySwitcherProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const days = [
    { number: 1, unlocked: true },
    { number: 2, unlocked: true },
    { number: 3, unlocked: true }, // unlocked Day 3 for Card to Page transition
    { number: 4, unlocked: true }, // unlocked Day 4 for Interactive Folder
    { number: 5, unlocked: true }, // unlocked Day 5 for Progressive Input Stack
    { number: 6, unlocked: true }, // unlocked Day 6 for Warp Overlay
    { number: 7, unlocked: true }, // unlocked Day 7 for Peerlist Autofill
  ]

  const playDaySwitchSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/public_public_sounds_trigger-Orym0TVjue0oT0bju89LM45iBboiVq.mp3")
      audioRef.current.volume = 0.3
    }
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {
      // Silently handle autoplay restrictions
    })
  }

  const handleDayChange = (day: number) => {
    if (day !== currentDay) {
      playDaySwitchSound()
    }
    onDayChange(day)
  }

  return (
    <div className="w-full">
      <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
        {days.map((day) => (
          <button
            key={day.number}
            onClick={() => day.unlocked && handleDayChange(day.number)}
            disabled={!day.unlocked}
            className={`
              relative border border-[#181818] px-6 py-4 min-w-[80px] transition-all duration-300
              ${day.unlocked ? "hover:bg-[#10AE4C] hover:text-white cursor-pointer" : "opacity-50 cursor-not-allowed"}
              ${currentDay === day.number && day.unlocked ? "bg-[#10AE4C] text-white" : "bg-transparent text-[#181818]"}
            `}
          >
            <div className="text-sm font-light">Day {day.number}</div>
            {!day.unlocked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border border-[#181818] flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#181818]"></div>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
