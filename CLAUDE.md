# faf-moltbot

**Universal portable souls for Moltbot.**

## What This Does

Converts `project.faf` (IANA-registered format) into `SOUL.md` for Moltbot.

One source of truth → renders to any AI tool:
- SOUL.md (Moltbot)
- CLAUDE.md (Claude Code)
- .cursorrules (Cursor)
- GEMINI.md (Gemini)

## Commands

```bash
faf-moltbot init [name]   # Create project.faf
faf-moltbot sync          # Generate SOUL.md
faf-moltbot watch         # Auto-sync on changes
faf-moltbot status        # Show current state
```

## Architecture

```
src/
├── cli.ts        # Command-line interface
├── reader.ts     # Parse project.faf
├── generator.ts  # Render SOUL.md
├── sync.ts       # Sync engine
└── types.ts      # TypeScript types
```

## Key Files

- `project.faf` - Source of truth (YAML)
- `SOUL.md` - Generated output for Moltbot
- Default workspace: `~/molt`

## Dependencies

- `faf-cli` - Core FAF tooling (every install = faf-cli download)
- `chalk` - Terminal styling
- `chokidar` - File watching
- `yaml` - YAML parsing

## Testing

WJTTC Championship Grade: 16/16 tests passing

```bash
npm test
```

## Links

- npm: https://www.npmjs.com/package/faf-moltbot
- Moltbot: https://github.com/moltbot/moltbot (63k stars)
- FAF: https://faf.one
- IANA: application/vnd.faf+yaml

---

*Persistent. Eternal. Zero drift.*
---

**STATUS: BI-SYNC ACTIVE 🔗 - Synchronized with .faf context!**

*Last Sync: 2026-01-27T14:07:26.244Z*
*Sync Engine: F1-Inspired Software Engineering*
*🏎️⚡️_championship_sync*
