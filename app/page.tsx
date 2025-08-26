"use client"

import { useState } from "react"
import { AvatarStack } from "@/components/avatar-stack"
import { DaySwitcher } from "@/components/day-switcher"
import { OTPInput } from "@/components/otp-input"

export default function Home() {
  const [currentDay, setCurrentDay] = useState(1)

  const getDayContent = () => {
    switch (currentDay) {
      case 1:
        return {
          title: "Animated Avatar Stack",
          component: <AvatarStack />,
        }
      case 2:
        return {
          title: "Interactive OTP Input",
          component: <OTPInput onComplete={(otp) => console.log("OTP completed:", otp)} />,
        }
      default:
        return {
          title: "Coming Soon",
          description: "This challenge will be unlocked soon. Stay tuned for more interactive design experiments!",
          component: null,
        }
    }
  }

  const dayContent = getDayContent()

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#181818] py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-2xl md:text-3xl font-light tracking-wide text-[#181818]">
            Interaction Design Challenge
          </h1>
        </div>
      </header>

      <section className="border-b border-[#181818] py-6 bg-[#f8f8f8]">
        <div className="container mx-auto px-4">
          <DaySwitcher currentDay={currentDay} onDayChange={setCurrentDay} />
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-16">
        <div className="container mx-auto px-4">
          {(currentDay === 1 || currentDay === 2) && (
            <div className="flex flex-col items-center justify-center space-y-12">
              <h2 className="text-3xl text-[#181818] tracking-wide font-light md:text-lg text-center text-zinc-400">
                {currentDay === 1 ? "Animated Avatar Stack" : "Interactive OTP Input"}
              </h2>
              {dayContent.component}
            </div>
          )}

          {currentDay > 2 && (
            <div className="text-center mb-12">
              <div className="inline-block border border-[#181818] px-4 py-2 mb-6">
                <span className="text-sm font-light text-[#181818] tracking-wider">
                  DAY {currentDay.toString().padStart(2, "0")}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-light text-[#181818] mb-4">{dayContent.title}</h2>
              <p className="text-lg text-[#181818]/70 max-w-2xl mx-auto font-light leading-relaxed">
                {dayContent.description}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#181818] py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-light text-[#181818]">
            Made by{" "}
            <a
              href="https://peerlist.io/rohzzn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#10AE4C] hover:underline transition-colors"
            >
              Rohan Pothuru
            </a>
            {" • "}
            <a
              href="https://peerlist.io/challenges/interaction-design-challenge-aug25"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#10AE4C] hover:underline transition-colors"
            >
              Challenge by Peerlist
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
