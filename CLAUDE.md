# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-file AI chat application (`claude.html`) that provides a ChatGPT-like interface powered by free models via the OpenRouter API. Chat history is persisted to a Supabase database.

## How to Run

Open `claude.html` directly in a browser (works via `file://`). On first launch, the Settings modal opens automatically to collect an OpenRouter API key (`sk-or-v1-...`).

## Architecture

Everything lives in one `claude.html` file — no build tools, no dependencies beyond CDN-loaded libraries:

- **CSS** (lines 12–238): CSS custom properties for theming (`--accent`, `--bg`, etc.), responsive layout with sidebar + main chat area, mobile breakpoint at 700px.
- **HTML** (lines 241–434): Sidebar with chat history, search, settings. Main area with welcome screen, message list, model selector, file attachment, input footer.
- **JavaScript** (lines 436–1389): All application logic inline in a single `<script>` block.

### Key JS Components

- **Model registry** (`MODELS`, `MODE_ROUTING`, lines 618–642): Maps mode names (arc, coding, thinking, fast, search) to free OpenRouter model IDs. Each mode has a fallback chain for automatic 429 rotation.
- **`openRouterChatWithFallback`** (line 824): Core API caller — tries models in the fallback chain, auto-rotates on rate limits, aborts on auth errors.
- **`prepareMessages`** (line 744): Handles models that don't support the `system` role (Gemma models) by folding system content into the first user message.
- **`buildSystemMemory`** (line 440): Constructs the system prompt from user settings stored in localStorage.
- **Streaming** (`processStream`, line 1268): SSE stream reader with `requestAnimationFrame`-batched rendering.
- **`fmt`** (line 1071): Custom markdown-to-HTML formatter handling code blocks, tables, bold, italic, inline code.
- **Supabase** (lines 901–945): Chat CRUD — `loadChatsFromDB`, `saveChatToDB`, `deleteChatFromDB`. Uses anon key with upsert.
- **File handling** (lines 1018–1045): Supports image (displayed inline as base64) and text file attachments.

### State

- `localStorage` key `claude_user_settings`: API key, nickname, full name, work role, preferences.
- `chats` array: In-memory chat list synced to Supabase `chats` table.
- `activeChatId`, `isStreaming`, `activeStream`, `pendingFiles`: UI state globals.

### External Dependencies (CDN)

- Supabase JS SDK v2
- highlight.js 11.9.0 (Atom One Dark theme)
- Google Fonts: DM Sans, JetBrains Mono

## Next.js UI Components

The project is currently transitioning to or also includes a React/Next.js setup configured with shadcn UI, Tailwind CSS, and TypeScript.

- **Default path for components:** `src/components/ui`
- **Why this folder is important:** Adhering to the `components/ui` structure allows the shadcn CLI to automatically place newly installed components in a standardized, isolated location. This keeps generic, reusable UI building blocks separate from application-specific features or layouts, maintaining a clean and scalable codebase.

### Recently Added
- Integrated `BoltStyleChat` into `src/components/ui/bolt-style-chat.tsx`.
- Demo route added at `src/app/demo/page.tsx` (`<BoltStyleChat />`).
