'use client'

import { useState, useRef, useEffect } from 'react'
import ProjectLayout from '@/components/ProjectLayout'

export default function Draw() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#1a1a1a')
  const [brushSize, setBrushSize] = useState(5)
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 })

  const colors = [
    '#1a1a1a', '#ef4444', '#f97316', '#eab308', 
    '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899',
    '#ffffff'
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    
    // Fill with white background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    
    const rect = canvas.getBoundingClientRect()
    
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      }
    }
    
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPos(e)
    setIsDrawing(true)
    setLastPos(pos)
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    
    const pos = getPos(e)
    
    ctx.beginPath()
    ctx.moveTo(lastPos.x, lastPos.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = color
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    
    setLastPos(pos)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const link = document.createElement('a')
    link.download = 'drawing.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <ProjectLayout title="Draw" backColor="#f59e0b">
      <div className="min-h-screen flex flex-col items-center p-8 pt-24">
        {/* Toolbar */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-6 flex flex-wrap items-center gap-4">
          {/* Colors */}
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full transition-transform ${
                  color === c ? 'scale-125 ring-2 ring-amber-500 ring-offset-2' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c, border: c === '#ffffff' ? '2px solid #e5e7eb' : 'none' }}
              />
            ))}
          </div>
          
          {/* Brush size */}
          <div className="flex items-center gap-2 px-4 border-l border-gray-200">
            <span className="text-sm text-gray-500">Size:</span>
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-sm font-mono w-6">{brushSize}</span>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2 px-4 border-l border-gray-200">
            <button
              onClick={clearCanvas}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              Clear
            </button>
            <button
              onClick={downloadCanvas}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Download
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ touchAction: 'none' }}>
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="cursor-crosshair"
            style={{ width: '800px', height: '500px', maxWidth: 'calc(100vw - 4rem)' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
      </div>
    </ProjectLayout>
  )
}
