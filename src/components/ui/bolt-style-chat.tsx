'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  Plus,
  Lightbulb,
  Paperclip,
  Image as ImageIcon,
  FileCode,
  ChevronDown,
  Check,
  Sparkles,
  Zap,
  Brain,
  Bolt,
  SendHorizontal
} from 'lucide-react'
import { GlowCard } from './spotlight-card'

// --- TYPES ---
interface Model {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  badge?: string
}

// --- CONSTANTS ---
const AVAILABLE_MODELS: Model[] = [
  { id: 'sonnet-4.5', name: 'Sonnet 4.5', description: 'Fast & intelligent', icon: <Zap className="size-4 text-purple-600" />, badge: 'Default' },
  { id: 'opus-4.5', name: 'Opus 4.5', description: 'Most capable', icon: <Sparkles className="size-4 text-yellow-600" />, badge: 'Pro' },
  { id: 'haiku-4.5', name: 'Haiku 4.5', description: 'Lightning fast', icon: <Brain className="size-4 text-green-600" /> },
  { id: 'gpt-4o', name: 'GPT-4o', description: 'OpenAI flagship', icon: <Sparkles className="size-4 text-blue-600" /> },
  { id: 'gemini-2.0', name: 'Gemini 2.0', description: 'Google AI', icon: <Brain className="size-4 text-cyan-600" /> }
]

const ATTACHMENT_OPTIONS = [
  { icon: <Paperclip className="size-4" />, label: 'Upload file' },
  { icon: <ImageIcon className="size-4" />, label: 'Add image' },
  { icon: <FileCode className="size-4" />, label: 'Import code' }
]

// --- ICONS ---
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function FigmaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M8 24C10.208 24 12 22.208 12 20V16H8C5.792 16 4 17.792 4 20C4 22.208 5.792 24 8 24Z" fill="currentColor"/>
      <path d="M4 12C4 9.792 5.792 8 8 8H12V16H8C5.792 16 4 14.208 4 12Z" fill="currentColor"/>
      <path d="M4 4C4 1.792 5.792 0 8 0H12V8H8C5.792 8 4 6.208 4 4Z" fill="currentColor"/>
      <path d="M12 0H16C18.208 0 20 1.792 20 4C20 6.208 18.208 8 16 8H12V0Z" fill="currentColor"/>
      <path d="M20 12C20 14.208 18.208 16 16 16C13.792 16 12 14.208 12 12C12 9.792 13.792 8 16 8C18.208 8 20 9.792 20 12Z" fill="currentColor"/>
    </svg>
  )
}

// --- COMPONENTS ---

function ModelSelector({ selectedModelId = 'sonnet-4.5', onModelChange }: {
  selectedModelId?: string
  onModelChange?: (model: Model) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState<Model>(
    AVAILABLE_MODELS.find(m => m.id === selectedModelId) || AVAILABLE_MODELS[0]
  )

  const handleSelect = (model: Model) => {
    setSelectedModel(model)
    setIsOpen(false)
    onModelChange?.(model)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 text-gray-500 hover:text-gray-900 hover:bg-black/5 active:scale-95"
      >
        {selectedModel.icon}
        <span>{selectedModel.name}</span>
        <ChevronDown className={`size-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[100]" onClick={() => setIsOpen(false)} />
          {/* Changed bottom-full to top-full to drop DOWN instead of UP, and fixed z-index */}
          <div className="absolute top-full left-0 mt-2 z-[110] min-w-[220px] bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-2xl shadow-black/10 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-1.5">
              <div className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Select Model
              </div>
              {AVAILABLE_MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => handleSelect(model)}
                  className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-left transition-all duration-150 ${
                    selectedModel.id === model.id ? 'bg-purple-50 text-purple-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex-shrink-0">{model.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{model.name}</span>
                      {model.badge && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                          model.badge === 'Pro' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {model.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-gray-500">{model.description}</span>
                  </div>
                  {selectedModel.id === model.id && <Check className="size-4 text-purple-600 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function ChatInput({ onSend, placeholder = "What do you want to build?" }: {
  onSend?: (message: string) => void
  placeholder?: string
}) {
  const [message, setMessage] = useState('')
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }, [message])

  const handleSubmit = () => {
    if (message.trim()) {
      onSend?.(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="relative w-full max-w-[720px] mx-auto group z-50 pointer-events-auto">
      <div className="absolute -inset-1 rounded-[1.5rem] bg-gradient-to-r from-purple-100 via-white to-yellow-100 opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-500 pointer-events-none" />

      {/* Removed overflow-hidden so the dropdown can escape the container bounds */}
      <GlowCard customSize glowColor="purple" className="w-full rounded-[1.5rem] p-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
        {/* We need the rounded corners to apply here instead, to prevent clipping */}
        <div className="relative bg-white/90 backdrop-blur-2xl h-full w-full rounded-[1.5rem]">

          {/* Text Input */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full resize-none bg-transparent text-[16px] leading-relaxed text-gray-900 placeholder-gray-400 px-6 pt-6 pb-4 focus:outline-none min-h-[90px] max-h-[250px] font-medium"
              style={{ height: '90px' }}
            />
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 pb-4 pt-2">
            {/* Left Controls */}
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <button
                  onClick={() => setShowAttachMenu(!showAttachMenu)}
                  className="flex items-center justify-center size-9 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-all duration-200 active:scale-95 border border-gray-100"
                >
                  <Plus className={`size-4 transition-transform duration-300 ${showAttachMenu ? 'rotate-45' : ''}`} />
                </button>

                {showAttachMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowAttachMenu(false)} />
                    <div className="absolute bottom-full left-0 mb-3 z-50 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl shadow-black/5 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <div className="p-1.5 min-w-[180px]">
                        {ATTACHMENT_OPTIONS.map((item, i) => (
                          <button key={i} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-150 font-medium">
                            {item.icon}
                            <span className="text-sm">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <ModelSelector />
            </div>

            <div className="flex-1" />

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200">
                <Lightbulb className="size-4" />
                <span className="hidden sm:inline">Plan</span>
              </button>
              <button
                onClick={handleSubmit}
                disabled={!message.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-gray-900 hover:bg-black text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 shadow-md shadow-gray-900/20"
              >
                <span className="hidden sm:inline">Send</span>
                <SendHorizontal className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </GlowCard>
    </div>
  )
}

function RayBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-[#Fdfbf7]">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px] opacity-60 mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-yellow-200/40 rounded-full blur-[80px] opacity-60 mix-blend-multiply animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      <div className="absolute -bottom-[10%] left-[40%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] opacity-60 mix-blend-multiply animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
    </div>
  )
}

function AnnouncementBadge({ text, href = "#" }: { text: string; href?: string }) {
  const content = (
    <>
      <span className="absolute inset-0 bg-white/50 backdrop-blur-md rounded-full pointer-events-none" />
      <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-purple-100 pointer-events-none" />
      <Sparkles className="size-4 relative z-10 text-purple-500" />
      <span className="relative z-10 text-gray-800 font-semibold tracking-wide text-xs uppercase">{text}</span>
    </>
  )

  const className = "relative inline-flex items-center gap-2 px-4 py-1.5 min-h-[32px] rounded-full text-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-sm hover:shadow-md hover:shadow-purple-500/10"

  if (href !== '#') {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
  }

  return <button className={className}>{content}</button>
}

function ImportButtons({ onImport }: { onImport?: (source: string) => void }) {
  const IMPORT_OPTIONS = [
    { id: 'figma', name: 'Figma', icon: <FigmaIcon className="size-4" /> },
    { id: 'github', name: 'GitHub', icon: <GithubIcon className="size-4" /> }
  ]

  return (
    <div className="flex items-center gap-4 justify-center">
      <span className="text-sm text-gray-500">or import from</span>
      <div className="flex gap-2">
        {IMPORT_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => onImport?.(option.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all duration-200 active:scale-95 shadow-sm"
          >
            {option.icon}
            <span>{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// --- MAIN COMPONENT ---
interface BoltChatProps {
  title?: string
  subtitle?: string
  announcementText?: string
  announcementHref?: string
  placeholder?: string
  onSend?: (message: string) => void
  onImport?: (source: string) => void
}

export function BoltStyleChat({
  title = "What will you",
  subtitle = "Create stunning apps & websites by chatting with AI.",
  announcementText = "your own ai machine",
  announcementHref = "#",
  placeholder = "What do you want to build?",
  onSend,
  onImport
}: BoltChatProps) {
  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full overflow-hidden bg-[#Fdfbf7] z-0">
      <RayBackground />

      {/* Adding high z-index and relative positioning to keep interactive elements above the background */}
      <div className="absolute top-[70px] z-50">
        <AnnouncementBadge text={announcementText} href={announcementHref} />
      </div>

      <div className="absolute top-[55%] left-1/2 sm:top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full h-full px-4 pointer-events-none">

        {/* Title Section */}
        <div className="text-center mb-6 z-20 pointer-events-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-2">
            {title}{' '}
            <span className="bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent italic pr-2">
              build
            </span>
            today?
          </h1>
          <p className="text-base font-medium sm:text-lg text-gray-500">{subtitle}</p>
        </div>

        {/* Interactive Elements */}
        <div className="w-full max-w-[720px] mb-6 sm:mb-8 mt-2 z-30 pointer-events-auto">
          <ChatInput placeholder={placeholder} onSend={onSend} />
        </div>

        <div className="z-20 pointer-events-auto">
          <ImportButtons onImport={onImport} />
        </div>
      </div>
    </div>
  )
}