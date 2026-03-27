'use client'

import React from 'react'
import { Plus, MessageSquare, Settings2, Search, Settings, User } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="flex flex-col h-screen w-[260px] bg-white border-r border-gray-200 text-gray-800 p-3">
      {/* Header */}
      <div className="flex items-center gap-2 px-2 py-3 mb-4">
        <div className="flex items-center justify-center size-8 bg-purple-600 rounded-lg text-white">
          <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <span className="font-semibold text-lg text-gray-900">AI Chat</span>
      </div>

      {/* New Chat Button */}
      <button className="flex items-center justify-between w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors mb-6 shadow-sm shadow-purple-200">
        <div className="flex items-center gap-2">
          <Plus className="size-4" />
          <span>New Chat</span>
        </div>
        <div className="flex items-center gap-1 text-xs bg-white/20 px-1.5 py-0.5 rounded-md">
          <span>⌘</span>
          <span>N</span>
        </div>
      </button>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 mb-6">
        <button className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <MessageSquare className="size-4" />
          <span>Chats</span>
        </button>
        <button className="flex items-center gap-3 px-3 py-2 text-sm text-gray-900 bg-yellow-100 font-medium rounded-lg transition-colors">
          <Settings2 className="size-4" />
          <span>Customize</span>
        </button>
        <button className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Search className="size-4" />
          <span>Search</span>
        </button>
      </nav>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search chats..." 
          className="w-full bg-gray-50 border border-gray-200 text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />
      </div>

      {/* Recent Chats */}
      <div className="flex-1 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-400 mb-3 px-1 tracking-wider">RECENT</div>
        <div className="flex flex-col gap-0.5">
          <button className="text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg truncate transition-colors">
            How does AI work?
          </button>
          <button className="text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg truncate transition-colors">
            Python sorting algorithms
          </button>
          <button className="text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg truncate transition-colors">
            Creative story about a programmer
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-1">
        <button className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="size-4" />
          <span>Settings</span>
        </button>
        <button className="flex items-center justify-between px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-6 bg-yellow-200 text-yellow-800 rounded-full">
              <User className="size-3" />
            </div>
            <span className="font-medium">user</span>
          </div>
          <ChevronDownIcon className="size-3 text-gray-400" />
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
