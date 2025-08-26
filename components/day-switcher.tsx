"use client"

interface DaySwitcherProps {
  currentDay: number
  onDayChange: (day: number) => void
}

export function DaySwitcher({ currentDay, onDayChange }: DaySwitcherProps) {
  const days = [
    { number: 1, unlocked: true },
    { number: 2, unlocked: true },
    { number: 3, unlocked: false },
    { number: 4, unlocked: false },
    { number: 5, unlocked: false },
    { number: 6, unlocked: false },
    { number: 7, unlocked: false },
  ]

  return (
    <div className="w-full">
      <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
        {days.map((day) => (
          <button
            key={day.number}
            onClick={() => day.unlocked && onDayChange(day.number)}
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
