import Editor from '@/components/Editor'
import React from 'react'

type Props = {}

export default function EditorPage({}: Props) {
  return (
    <>
         {/* Navbar */}
      <nav className="w-full bg-zinc-900 px-8 py-4 flex items-center justify-between border-b border-white/10 z-100 fixed top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-black flex items-center justify-center font-bold text-white text-sm">
            J
          </div>
          <span className="font-semibold text-lg">Logo Maker</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Examples
          </a>
          <a href="#" className="hover:text-white transition-colors">
            How It Works
          </a>
        </div>

        <button className="px-6 py-2 bg-black text-white font-semibold rounded-lg transition-colors">
          Create Logo
        </button>
      </nav>
        <Editor />

    </>
    )
}