# faf-moltbot

[![npm version](https://img.shields.io/npm/v/faf-moltbot.svg)](https://www.npmjs.com/package/faf-moltbot)
[![license](https://img.shields.io/npm/l/faf-moltbot.svg)](https://opensource.org/licenses/MIT)

**Universal AI context for Moltbot.**

[Moltbot](https://github.com/moltbot/moltbot) (63k+ stars) is a powerful self-hosted AI assistant. It uses `SOUL.md` for personality—but that file is trapped in one workspace. **faf-moltbot sets it free.**

Your soul becomes **persistent** and **eternal**—never re-explain yourself to AI again.

## The Problem

Your Moltbot personality lives in `~/molt/SOUL.md`. But what about:
- Your Claude Desktop setup?
- Your Cursor workspace?
- Your VS Code projects?
- Your team's shared configuration?

You end up maintaining multiple files that drift apart.

## The Solution

One `project.faf` file. Renders everywhere.

```
project.faf (single source of truth)
       │
       ├──→ SOUL.md     (Moltbot)
       ├──→ CLAUDE.md   (Claude Code)
       ├──→ .cursorrules (Cursor)
       └──→ Any MCP-compatible tool
```

**Edit once. Context everywhere. Eternal.**

## Install

```bash
npm install -g faf-moltbot
```

## Quick Start

```bash
# Navigate to your Moltbot workspace
cd ~/molt

# Create a universal context file
faf-moltbot init "my-soul"

# Edit your context (one file, all platforms)
nano project.faf

# Generate SOUL.md for Moltbot
faf-moltbot sync
```

## Commands

| Command | Description |
|---------|-------------|
| `init [name]` | Create `project.faf` in current directory |
| `sync` | Generate `SOUL.md` from `project.faf` |
| `watch` | Auto-sync on file changes |
| `status` | Show sync status |

## Example Configuration

```yaml
project:
  name: "my-assistant"
  goal: "Personal AI that works across all my tools"

persona:
  tone: "Direct, helpful, no fluff"
  style: "Senior engineer"
  traits:
    - "Concise responses"
    - "Proactive suggestions"
    - "Code examples when relevant"

context:
  owner: "James"
  preferences:
    - "No emojis unless asked"
    - "Explain reasoning briefly"

stack:
  model: "claude-opus-4-5"
  platforms:
    - "telegram"
    - "slack"
```

## Why Universal?

| SOUL.md | project.faf |
|---------|-------------|
| Moltbot only | Works everywhere |
| Freeform markdown | Structured YAML |
| One workspace | Portable across tools |
| Custom format | IANA-registered standard |
| Manual sync | Automated rendering |

## One Soul, Many Renderings

```
                ┌─────────────────┐
                │   project.faf   │  ← Your single source of truth
                │   (your soul)   │  ← IANA: application/vnd.faf+yaml
                └────────┬────────┘
                         │
                   RENDER ENGINE
                         │
       ┌─────────────────┼─────────────────┐
       ▼                 ▼                 ▼
  ┌─────────┐      ┌──────────┐      ┌──────────┐
  │ SOUL.md │      │CLAUDE.md │      │GEMINI.md │
  │ Moltbot │      │  Claude  │      │  Gemini  │
  │ 63k ★   │      │Anthropic │      │  Google  │
  └─────────┘      └──────────┘      └──────────┘
```

Same soul. Same personality. Every tool. **Persistent. Eternal. Zero drift.**

## How It Fits

```
Your project directory:
├── package.json     ← npm's context
├── project.faf      ← AI's context (universal)
├── README.md        ← Human's context
└── SOUL.md          ← Generated for Moltbot
```

The `.faf` file sits naturally alongside `package.json`—one for npm, one for AI.

## Related Tools

| Tool | Command | Output |
|------|---------|--------|
| **faf-moltbot** | `faf-moltbot sync` | `SOUL.md` |
| **faf-clawdbot** | `faf-clawdbot sync` | `SOUL.md` |
| **faf-cli** | `faf bi-sync` | `CLAUDE.md` |
| **faf-cursor** | `faf-cursor sync` | `.cursorrules` |

All read the same `project.faf`. All stay in sync.

## Links

- [FAF Specification](https://faf.one) — The universal format
- [IANA Registration](https://www.iana.org/assignments/media-types/application/vnd.faf+yaml) — `application/vnd.faf+yaml`
- [faf-cli](https://www.npmjs.com/package/faf-cli) — Core CLI tool
- [Moltbot](https://github.com/moltbot/moltbot) — The AI assistant (formerly ClawdBot)

## License

MIT

---

Built by [Wolfe-Jam](https://wolfejam.dev) | Powered by [FAF](https://faf.one)
