'use client'

import { useState, useEffect, useCallback } from 'react'
import ProjectLayout from '@/components/ProjectLayout'

function generateColor() {
  const hue = Math.floor(Math.random() * 360)
  const sat = 60 + Math.floor(Math.random() * 30)
  const light = 50 + Math.floor(Math.random() * 20)
  return `hsl(${hue}, ${sat}%, ${light}%)`
}

function generateSimilarColors(baseColor: string, count: number, difficulty: number): { colors: string[]; correctIndex: number } {
  // Parse the base HSL color
  const match = baseColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
  if (!match) return { colors: Array(count).fill(baseColor), correctIndex: 0 }
  
  const [, hStr, sStr, lStr] = match
  const h = Number(hStr)
  const s = Number(sStr)
  const l = Number(lStr)
  const variance = Math.max(5, 30 - difficulty * 3) // Gets harder with higher difficulty
  
  const colors: string[] = []
  for (let i = 0; i < count - 1; i++) {
    const newH = (h + (Math.random() - 0.5) * variance + 360) % 360
    const newS = Math.max(30, Math.min(100, s + (Math.random() - 0.5) * variance))
    const newL = Math.max(30, Math.min(80, l + (Math.random() - 0.5) * variance))
    colors.push(`hsl(${Math.round(newH)}, ${Math.round(newS)}%, ${Math.round(newL)}%)`)
  }
  
  // Insert the correct color at a random position
  const correctIndex = Math.floor(Math.random() * count)
  colors.splice(correctIndex, 0, baseColor)
  
  return { colors, correctIndex }
}

export default function ColorMemory() {
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState<'memorize' | 'guess' | 'result'>('memorize')
  const [targetColor, setTargetColor] = useState('')
  const [options, setOptions] = useState<{ colors: string[], correctIndex: number }>({ colors: [], correctIndex: 0 })
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [gameOver, setGameOver] = useState(false)

  const startRound = useCallback(() => {
    const color = generateColor()
    setTargetColor(color)
    setPhase('memorize')
    setSelectedIndex(null)
    
    // Show color for decreasing time based on level
    const showTime = Math.max(500, 2000 - level * 150)
    setTimeout(() => {
      const gridSize = Math.min(9, 4 + Math.floor(level / 3))
      const optionsData = generateSimilarColors(color, gridSize, level)
      setOptions(optionsData)
      setPhase('guess')
    }, showTime)
  }, [level])

  useEffect(() => {
    if (!gameOver) {
      startRound()
    }
  }, [level, gameOver, startRound])

  const handleGuess = (index: number) => {
    if (phase !== 'guess') return
    
    setSelectedIndex(index)
    setPhase('result')
    
    if (index === options.correctIndex) {
      setScore(prev => prev + level * 10)
      setTimeout(() => {
        setLevel(prev => prev + 1)
      }, 800)
    } else {
      setTimeout(() => {
        setGameOver(true)
      }, 800)
    }
  }

  const resetGame = () => {
    setLevel(1)
    setScore(0)
    setGameOver(false)
    setPhase('memorize')
  }

  return (
    <ProjectLayout title="Color Memory" backColor="#ec4899">
      <div className="min-h-screen flex items-center justify-center p-8 pt-24">
        <div className="max-w-lg w-full">
          {/* Stats */}
          <div className="flex justify-between mb-8">
            <div className="bg-white rounded-xl shadow-lg px-6 py-3">
              <div className="text-sm text-gray-500">Level</div>
              <div className="text-2xl font-bold text-pink-600">{level}</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg px-6 py-3">
              <div className="text-sm text-gray-500">Score</div>
              <div className="text-2xl font-bold text-pink-600">{score}</div>
            </div>
          </div>

          {gameOver ? (
            <div className="text-center bg-white rounded-2xl shadow-xl p-12">
              <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
              <p className="text-gray-600 mb-2">You reached level {level}</p>
              <p className="text-2xl font-bold text-pink-600 mb-8">Score: {score}</p>
              <button
                onClick={resetGame}
                className="px-8 py-3 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 transition-colors"
              >
                Play Again
              </button>
            </div>
          ) : phase === 'memorize' ? (
            <div className="text-center">
              <p className="text-gray-600 mb-6">Remember this color!</p>
              <div
                className="w-48 h-48 mx-auto rounded-2xl shadow-xl animate-pulse"
                style={{ backgroundColor: targetColor }}
              />
            </div>
          ) : (
            <div>
              <p className="text-center text-gray-600 mb-6">Find the color you just saw!</p>
              <div className="grid grid-cols-3 gap-4">
                {options.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleGuess(index)}
                    disabled={phase === 'result'}
                    className={`aspect-square rounded-xl shadow-lg transition-all ${
                      phase === 'result'
                        ? index === options.correctIndex
                          ? 'ring-4 ring-green-500 scale-105'
                          : index === selectedIndex
                          ? 'ring-4 ring-red-500 opacity-50'
                          : 'opacity-50'
                        : 'hover:scale-105 cursor-pointer'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ProjectLayout>
  )
}
