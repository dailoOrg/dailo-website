"use client"

import Logo from '@components/Logo'
import Link from 'next/link'

export default function Navbar() {
  return (
    
    <nav className=" absolute top-0 left-0 right-0 z-50">
        {/* fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-lg */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Button */}
          <a
            href="#"
            className="rounded-full bg-black text-white hover:bg-gray-800 transition-colors px-4 py-2 text-sm font-medium"
          >
            Start Listening
          </a>
        </div>
      </div>
    </nav>
  )
} 