"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Elegant flowing lines
    const flowLines: Array<{
      points: Array<{ x: number; y: number; vx: number; vy: number }>
      opacity: number
      thickness: number
      color: string
    }> = []

    // Initialize flowing lines
    for (let i = 0; i < 8; i++) {
      const points = []
      for (let j = 0; j < 6; j++) {
        points.push({
          x: (canvas.width / 5) * j,
          y: canvas.height * 0.3 + Math.random() * canvas.height * 0.4,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.2,
        })
      }
      flowLines.push({
        points,
        opacity: 0.03 + Math.random() * 0.05,
        thickness: 1 + Math.random() * 2,
        color: `rgba(255, 255, 255, ${0.02 + Math.random() * 0.03})`,
      })
    }

    // Subtle floating orbs
    const orbs: Array<{
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      opacity: number
      pulsePhase: number
    }> = []

    for (let i = 0; i < 12; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 20 + Math.random() * 40,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        opacity: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Enhanced gradient background with more depth
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.3,
        canvas.height * 0.2,
        0,
        canvas.width * 0.7,
        canvas.height * 0.8,
        canvas.width * 1.2,
      )
      gradient.addColorStop(0, "#0f172a") // slate-900
      gradient.addColorStop(0.2, "#1e293b") // slate-800
      gradient.addColorStop(0.4, "#334155") // slate-700
      gradient.addColorStop(0.7, "#475569") // slate-600
      gradient.addColorStop(1, "#64748b") // slate-500

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add animated color accents
      const accentGradient = ctx.createRadialGradient(
        canvas.width * 0.8 + Math.sin(time * 0.001) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.0015) * 80,
        0,
        canvas.width * 0.8,
        canvas.height * 0.3,
        300,
      )
      accentGradient.addColorStop(0, "rgba(59, 130, 246, 0.1)") // blue
      accentGradient.addColorStop(0.5, "rgba(139, 92, 246, 0.05)") // purple
      accentGradient.addColorStop(1, "rgba(6, 182, 212, 0.02)") // cyan

      ctx.fillStyle = accentGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add subtle noise texture overlay
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 8
        data[i] = noise // red
        data[i + 1] = noise // green
        data[i + 2] = noise // blue
        data[i + 3] = 2 // alpha (very subtle)
      }
      ctx.putImageData(imageData, 0, 0)

      // Enhanced flowing lines with color variations
      flowLines.forEach((line, lineIndex) => {
        const hue = (time * 0.1 + lineIndex * 30) % 360
        ctx.beginPath()
        ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${line.opacity})`
        ctx.lineWidth = line.thickness
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        // Update points with more dynamic movement
        line.points.forEach((point, index) => {
          point.x += point.vx + Math.sin(time * 0.001 + index) * 0.2
          point.y += point.vy + Math.cos(time * 0.0015 + index) * 0.15

          // Gentle boundary bouncing
          if (point.x < 0 || point.x > canvas.width) point.vx *= -1
          if (point.y < 0 || point.y > canvas.height) point.vy *= -1

          // Keep points within bounds
          point.x = Math.max(0, Math.min(canvas.width, point.x))
          point.y = Math.max(0, Math.min(canvas.height, point.y))
        })

        // Draw smooth curve through points
        if (line.points.length > 1) {
          ctx.moveTo(line.points[0].x, line.points[0].y)

          for (let i = 1; i < line.points.length - 1; i++) {
            const current = line.points[i]
            const next = line.points[i + 1]
            const cpx = (current.x + next.x) / 2
            const cpy = (current.y + next.y) / 2
            ctx.quadraticCurveTo(current.x, current.y, cpx, cpy)
          }

          const lastPoint = line.points[line.points.length - 1]
          ctx.lineTo(lastPoint.x, lastPoint.y)
        }

        ctx.stroke()
      })

      // Enhanced floating orbs with color cycling
      orbs.forEach((orb, orbIndex) => {
        orb.x += orb.vx
        orb.y += orb.vy
        orb.pulsePhase += 0.008

        // Smooth boundary wrapping
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius

        // Create enhanced radial gradient for each orb
        const orbGradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
        const hue = (time * 0.05 + orbIndex * 60) % 360
        const pulseOpacity = orb.opacity * (0.7 + 0.3 * Math.sin(orb.pulsePhase))

        orbGradient.addColorStop(0, `hsla(${hue}, 70%, 70%, ${pulseOpacity})`)
        orbGradient.addColorStop(0.4, `hsla(${hue}, 70%, 60%, ${pulseOpacity * 0.5})`)
        orbGradient.addColorStop(0.8, `hsla(${hue}, 70%, 50%, ${pulseOpacity * 0.2})`)
        orbGradient.addColorStop(1, `hsla(${hue}, 70%, 40%, 0)`)

        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        ctx.fillStyle = orbGradient
        ctx.fill()
      })

      // Add dynamic mesh overlay with color
      ctx.strokeStyle = `hsla(${(time * 0.1) % 360}, 50%, 70%, 0.03)`
      ctx.lineWidth = 0.5
      const meshSize = 120

      for (let x = 0; x < canvas.width; x += meshSize) {
        for (let y = 0; y < canvas.height; y += meshSize) {
          const offsetX = Math.sin(time * 0.0003 + x * 0.01) * 15
          const offsetY = Math.cos(time * 0.0005 + y * 0.01) * 15

          ctx.beginPath()
          ctx.moveTo(x + offsetX, y + offsetY)
          ctx.lineTo(x + meshSize + offsetX, y + offsetY)
          ctx.lineTo(x + meshSize + offsetX, y + meshSize + offsetY)
          ctx.stroke()
        }
      }

      time += 1
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Additional gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-800/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
    </div>
  )
}
