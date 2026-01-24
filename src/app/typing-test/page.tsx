'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import ProjectLayout from '@/components/ProjectLayout'

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "How vexingly quick daft zebras jump!",
  "The five boxing wizards jump quickly.",
  "Sphinx of black quartz, judge my vow.",
  "Two driven jocks help fax my big quiz.",
  "The jay, pig, fox, zebra and my wolves quack!",
  "Crazy Frederick bought many very exquisite opal jewels.",
]

export default function TypingTest() {
  const [text, setText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [isComplete, setIsComplete] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const startNewTest = useCallback(() => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
    setText(randomText)
    setUserInput('')
    setStartTime(null)
    setEndTime(null)
    setWpm(0)
    setAccuracy(100)
    setIsComplete(false)
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    startNewTest()
  }, [startNewTest])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    if (!startTime && value.length === 1) {
      setStartTime(Date.now())
    }
    
    setUserInput(value)
    
    // Calculate accuracy
    let correct = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i] === text[i]) correct++
    }
    setAccuracy(value.length > 0 ? Math.round((correct / value.length) * 100) : 100)
    
    // Check if complete
    if (value === text) {
      const end = Date.now()
      setEndTime(end)
      setIsComplete(true)
      
      // Calculate WPM
      const timeInMinutes = (end - (startTime || end)) / 60000
      const words = text.split(' ').length
      setWpm(Math.round(words / timeInMinutes))
    }
  }

  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = 'text-gray-400'
      if (index < userInput.length) {
        className = userInput[index] === char ? 'text-green-600' : 'text-red-500 bg-red-100'
      } else if (index === userInput.length) {
        className = 'text-gray-800 border-l-2 border-emerald-500 animate-pulse'
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      )
    })
  }

  return (
    <ProjectLayout title="Typing Test" backColor="#10b981">
      <div className="min-h-screen flex items-center justify-center p-8 pt-24">
        <div className="max-w-2xl w-full">
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg px-8 py-4 text-center">
              <div className="text-4xl font-bold text-emerald-600">{wpm}</div>
              <div className="text-sm text-gray-500">WPM</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg px-8 py-4 text-center">
              <div className="text-4xl font-bold text-emerald-600">{accuracy}%</div>
              <div className="text-sm text-gray-500">Accuracy</div>
            </div>
          </div>

          {/* Text display */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <p className="text-2xl font-mono leading-relaxed tracking-wide">
              {renderText()}
            </p>
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            disabled={isComplete}
            placeholder={isComplete ? '' : 'Start typing...'}
            className="w-full px-6 py-4 text-xl rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />

          {/* Complete message */}
          {isComplete && (
            <div className="mt-8 text-center">
              <h2 className="text-3xl font-bold text-emerald-600 mb-4">Complete!</h2>
              <p className="text-gray-600 mb-6">
                You typed {text.split(' ').length} words in {((endTime! - startTime!) / 1000).toFixed(1)} seconds
              </p>
              <button
                onClick={startNewTest}
                className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </ProjectLayout>
  )
}
