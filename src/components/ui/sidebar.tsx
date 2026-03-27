'use client'

import React from 'react'
import { Plus, MessageSquare, Settings2, Search, Settings, User } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="flex flex-col h-screen w-[260px] bg-white/70 backdrop-blur-xl border-r border-white/20 text-gray-800 p-3 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-50">
      {/* Header */}
      <div className="flex items-center gap-2 px-2 py-3 mb-4">
        <div className="flex items-center justify-center size-8 bg-purple-600 rounded-lg text-white shadow-sm shadow-purple-200">
          <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <span className="font-semibold text-lg text-gray-900 tracking-tight">AI Chat</span>
      </div>

      {/* New Chat Button */}
      <button className="flex items-center justify-between w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mb-6 shadow-md shadow-purple-500/20 group">
        <div className="flex items-center gap-2">
          <Plus className="size-4 group-hover:rotate-90 transition-transform duration-300" />
          <span>New Chat</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded-md font-semibold">
          <span>⌘</span>
          <span>N</span>
        </div>
      </button>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 mb-6">
        <button className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg transition-all duration-200 active:scale-[0.98]">
          <MessageSquare className="size-4 opacity-70" />
          <span className="font-medium">Chats</span>
        </button>
        <button className="flex items-center gap-3 px-3 py-2 text-sm text-yellow-900 bg-yellow-100 hover:bg-yellow-200/80 font-medium rounded-lg transition-all duration-200 active:scale-[0.98]">
          <Settings2 className="size-4 text-yellow-600" />
          <span>Customize</span>
        </button>
        <button className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg transition-all duration-200 active:scale-[0.98]">
          <Search className="size-4 opacity-70" />
          <span className="font-medium">Search</span>
        </button>
      </nav>

      {/* Search Bar */}
      <div className="relative mb-6 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full bg-white/50 hover:bg-white/80 border border-black/5 text-sm rounded-lg pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all placeholder:text-gray-400 text-gray-800"
        />
      </div>

      {/* Recent Chats */}
      <div className="flex-1 overflow-y-auto pr-1 -mr-1 custom-scrollbar">
        <div className="text-[11px] font-bold text-gray-400 mb-3 px-2 tracking-widest uppercase">Recent</div>
        <div className="flex flex-col gap-0.5">
          <button className="text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 px-3 py-2 rounded-lg truncate transition-all duration-200 active:scale-[0.98] font-medium">
            How does AI work?
          </button>
          <button className="text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 px-3 py-2 rounded-lg truncate transition-all duration-200 active:scale-[0.98] font-medium">
            Python sorting algorithms
          </button>
          <button className="text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 px-3 py-2 rounded-lg truncate transition-all duration-200 active:scale-[0.98] font-medium">
            Creative story about a programmer
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-black/5 flex flex-col gap-1">
        <button className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg transition-all duration-200 active:scale-[0.98] font-medium">
          <Settings className="size-4 opacity-70" />
          <span>Settings</span>
        </button>
        <button className="flex items-center justify-between px-3 py-2 text-sm text-gray-800 hover:bg-white/80 rounded-lg transition-all duration-200 active:scale-[0.98] group">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-6 bg-yellow-200 text-yellow-800 rounded-full shadow-sm">
              <User className="size-3" />
            </div>
            <span className="font-semibold">user</span>
          </div>
          <ChevronDownIcon className="size-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </button>
      </div>
    </div>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  )
}
