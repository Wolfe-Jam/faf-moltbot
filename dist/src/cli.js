#!/usr/bin/env node
/**
 * faf-moltbot CLI
 * Portable souls for Moltbot
 *
 * IANA: application/vnd.faf+yaml
 * https://faf.one
 */
import { homedir } from 'os';
import { join } from 'path';
import { existsSync } from 'fs';
import { initFaf, syncFafToSoul, watchAndSync } from './sync.js';
import { readFafFile } from './reader.js';
const DEFAULT_WORKSPACE = join(homedir(), 'molt');
function printBanner() {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║  faf-moltbot - Portable Souls for Moltbot               ║
║  IANA: application/vnd.faf+yaml                           ║
║  https://faf.one                                          ║
╚═══════════════════════════════════════════════════════════╝
`);
}
function printUsage() {
    console.log(`
Usage: faf-moltbot <command> [options]

Commands:
  init [name]     Create project.faf in Moltbot workspace
  sync            Generate SOUL.md from project.faf
  watch           Watch project.faf and auto-sync to SOUL.md
  status          Show current FAF/SOUL status

Options:
  --workspace, -w   Moltbot workspace path (default: ~/molt)
  --verbose, -v     Verbose output
  --help, -h        Show this help

Examples:
  faf-moltbot init "my-assistant"
  faf-moltbot sync
  faf-moltbot watch
  faf-moltbot status --workspace ~/my-clawd
`);
}
function parseArgs(args) {
    let command = 'help';
    const options = {
        workspace: DEFAULT_WORKSPACE,
        verbose: false
    };
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === '--workspace' || arg === '-w') {
            options.workspace = args[++i] || DEFAULT_WORKSPACE;
        }
        else if (arg === '--verbose' || arg === '-v') {
            options.verbose = true;
        }
        else if (arg === '--help' || arg === '-h') {
            options.help = true;
        }
        else if (!arg.startsWith('-') && command === 'help') {
            command = arg;
        }
        else if (!arg.startsWith('-')) {
            options.name = arg;
        }
    }
    return { command, options };
}
function showStatus(workspace) {
    const faf = readFafFile(workspace);
    const soulExists = existsSync(join(workspace, 'SOUL.md'));
    console.log(`Workspace: ${workspace}`);
    console.log(`project.faf: ${faf ? 'Found' : 'Not found'}`);
    console.log(`SOUL.md: ${soulExists ? 'Found' : 'Not found'}`);
    if (faf?.project) {
        console.log(`\nProject: ${faf.project.name}`);
        if (faf.project.goal)
            console.log(`Goal: ${faf.project.goal}`);
    }
    if (faf?.persona?.voice) {
        console.log(`Voice: ${faf.persona.voice}`);
    }
}
async function main() {
    const args = process.argv.slice(2);
    const { command, options } = parseArgs(args);
    if (options.help || command === 'help') {
        printBanner();
        printUsage();
        process.exit(0);
    }
    const workspace = options.workspace;
    const verbose = options.verbose;
    // Check workspace exists (skip for help/init)
    if (!existsSync(workspace) && !['help', 'init'].includes(command)) {
        console.error(`Workspace not found: ${workspace}`);
        console.error(`Create it with: mkdir -p ${workspace}`);
        console.error(`Or specify with: --workspace /path/to/workspace`);
        process.exit(1);
    }
    switch (command) {
        case 'init': {
            printBanner();
            // Create workspace if it doesn't exist
            if (!existsSync(workspace)) {
                const { mkdirSync } = await import('fs');
                mkdirSync(workspace, { recursive: true });
                console.log(`Created workspace: ${workspace}`);
            }
            const name = options.name;
            const result = initFaf(workspace, name);
            console.log(result.message);
            if (result.success) {
                console.log(`\nNext: Edit ${result.fafPath}`);
                console.log('Then: faf-moltbot sync');
            }
            break;
        }
        case 'sync': {
            const result = syncFafToSoul(workspace, verbose);
            console.log(result.message);
            process.exit(result.success ? 0 : 1);
            break;
        }
        case 'watch': {
            printBanner();
            watchAndSync({ workspace, watch: true, verbose });
            break;
        }
        case 'status': {
            printBanner();
            showStatus(workspace);
            break;
        }
        default:
            console.error(`Unknown command: ${command}`);
            printUsage();
            process.exit(1);
    }
}
main().catch(console.error);
//# sourceMappingURL=cli.js.map