'use client'

import { useState, useEffect, useRef } from 'react'
import ProjectLayout from '@/components/ProjectLayout'

export default function InfiniteScroll() {
  const [scrollDistance, setScrollDistance] = useState(0)
  const [items, setItems] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize with some items
    setItems(Array.from({ length: 50 }, (_, i) => i))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const distance = window.scrollY
        setScrollDistance(distance)
        
        // Add more items as user scrolls
        const threshold = document.body.scrollHeight - window.innerHeight - 1000
        if (window.scrollY > threshold) {
          setItems(prev => [...prev, ...Array.from({ length: 20 }, (_, i) => prev.length + i)])
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formatDistance = (px: number) => {
    const meters = px * 0.000264583 // rough px to m conversion
    if (meters < 1) return `${(meters * 100).toFixed(1)} cm`
    if (meters < 1000) return `${meters.toFixed(1)} m`
    return `${(meters / 1000).toFixed(2)} km`
  }

  const getColor = (index: number) => {
    const hue = (index * 7) % 360
    return `hsl(${hue}, 70%, 60%)`
  }

  return (
    <ProjectLayout title="Infinite Scroll" backColor="#6366f1">
      <div ref={containerRef} className="pt-24">
        {/* Fixed counter */}
        <div className="fixed top-20 right-4 z-40 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center">
          <div className="text-4xl font-bold text-indigo-600">
            {formatDistance(scrollDistance)}
          </div>
          <div className="text-sm text-gray-500 mt-1">scrolled</div>
          <div className="text-xs text-gray-400 mt-2">{scrollDistance.toLocaleString()} px</div>
        </div>

        {/* Scrollable content */}
        <div className="max-w-2xl mx-auto px-8 pb-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Keep scrolling...</h1>
            <p className="text-gray-600">How far can you go?</p>
          </div>
          
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item}
                className="h-24 rounded-xl flex items-center justify-center text-white font-bold text-2xl transition-transform hover:scale-105"
                style={{ backgroundColor: getColor(item) }}
              >
                {item + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProjectLayout>
  )
}
