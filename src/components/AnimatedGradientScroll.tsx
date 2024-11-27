"use client"

import { useEffect, useRef } from "react"

interface Blob {
  x: number
  y: number
  baseX: number
  baseY: number
  radius: number
  color: string
  speed: number
  angle: number
  parallax: number
}

export default function AnimatedGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    if (!ctx) return

    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    setCanvasSize()

    window.addEventListener('resize', setCanvasSize)

    const colors = [
      '#8349FF',
      '#0013FF',
      '#00FFFF',
      '#FF0095',
    ]

    const blobs: Blob[] = []
    const numBlobs = 4

    for (let i = 0; i < numBlobs; i++) {
      const angle = (i / numBlobs) * Math.PI * 2
      blobs.push({
        x: canvas.width / 2,
        y: canvas.height + (canvas.height * 0.5),
        baseX: canvas.width / 2,
        baseY: canvas.height + (canvas.height * 0.5),
        radius: canvas.height * 0.6,
        color: colors[i],
        speed: 0.1,
        angle: angle,
        parallax: 1.0 + (i * 0.2)
      })
    }

    function animate() {
      if (!canvas) return;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() / 1000
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const maxScroll = document.documentElement.scrollHeight - viewportHeight
      const pageHeight = document.documentElement.scrollHeight
      
      blobs.forEach(blob => {
        const totalTravel = pageHeight - viewportHeight * 0.5
        const scrollProgress = Math.min(scrollY / maxScroll, 1)
        const basePosition = viewportHeight + (viewportHeight * 0.5)
        const scrollOffset = scrollProgress * totalTravel
        const baseAmplitude = viewportHeight * 0.2
        
        const animationSpeed = 0.1
        const xOffset = Math.cos(time * animationSpeed + blob.angle) * baseAmplitude
        const yOffset = Math.sin(time * animationSpeed + blob.angle) * baseAmplitude
        
        blob.x = blob.baseX + xOffset
        
        const targetY = basePosition - (scrollOffset * blob.parallax)
        blob.y = targetY + yOffset

        const fadeStartThreshold = viewportHeight * 0.3
        const fadeEndThreshold = -viewportHeight * 0.5
        let opacity = 1

        if (blob.y < fadeStartThreshold) {
          opacity = Math.max(0, (blob.y - fadeEndThreshold) / (fadeStartThreshold - fadeEndThreshold))
        }

        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius * 1.5
        )
        
        const hex = blob.color
        const r = parseInt(hex.slice(1,3), 16)
        const g = parseInt(hex.slice(3,5), 16)
        const b = parseInt(hex.slice(5,7), 16)
        
        gradient.addColorStop(0, `rgba(${r},${g},${b},${0.35 * opacity})`)
        gradient.addColorStop(0.3, `rgba(${r},${g},${b},${0.25 * opacity})`)
        gradient.addColorStop(0.6, `rgba(${r},${g},${b},${0.15 * opacity})`)
        gradient.addColorStop(0.8, `rgba(${r},${g},${b},${0.08 * opacity})`)
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`)

        ctx.filter = 'blur(80px)'
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.filter = 'blur(120px)'
      ctx.globalCompositeOperation = 'screen'
      ctx.drawImage(canvas, 0, 0)
      
      ctx.filter = 'none'
      ctx.globalCompositeOperation = 'source-over'

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <div className="w-full h-screen fixed top-0 left-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute inset-0"
        style={{ 
          mixBlendMode: 'multiply'
        }}
      />
    </div>
  )
}

