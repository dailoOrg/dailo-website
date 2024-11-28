"use client"

import { useScroll, motion, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export default function Features() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Make the movement more subtle and gradual
  const y1 = useTransform(scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    [0, -30, -70, -100]
  )
  const y2 = useTransform(scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    [0, -10, -50, -70]
  )
  const y3 = useTransform(scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    [0, -40, -150, -200]
  )

  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mediaQuery.matches)

    const handleResize = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mediaQuery.addEventListener('change', handleResize)
    return () => mediaQuery.removeEventListener('change', handleResize)
  }, [])

  const features = [
    {
      number: "1",
      title: "Interactive Podcasts",
      description: "Transform podcast from one-way listening into dynamic conversations with AI-powered real-time Q&A",
      y: y1
    },
    {
      number: "2",
      title: "Casual Audio Learning",
      description: "Combining the ease of podcast listening with structured learning for effective, enjoyable skill development",
      y: y2
    },
    {
      number: "3",
      title: "Screen-Free Learning",
      description: "Break free from screen fatigue - learn naturally during your everyday activities",
      y: y3
    }
  ]

  return (
    <section ref={ref} className="pb-96">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              style={{ y: isDesktop ? feature.y : 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              className="relative p-6 rounded-lg border border-black/10 bg-white/20 backdrop-blur-lg shadow-lg motion-safe:transition-transform"
            >
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mb-8  lg:mb-32">
                {feature.number}
              </div>
              
              <h3 className="text-lg xl:text-xl font-semibold leading-tight tracking-tight">{feature.title}</h3>
              
              <p className="text-lg xl:text-xl font-semibold leading-tight tracking-tight opacity-50">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}