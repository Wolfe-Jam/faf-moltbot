/**
 * Sync Engine - Bi-directional sync between project.faf and SOUL.md
 */

import { readFileSync, writeFileSync, existsSync, watch } from 'fs';
import { join } from 'path';
import { readFafFile, validateFafDocument } from './reader.js';
import { generateSoulMd, generateFafTemplate } from './generator.js';
import type { SyncOptions } from './types.js';

const FAF_FILENAME = 'project.faf';
const SOUL_FILENAME = 'SOUL.md';

export interface SyncResult {
  success: boolean;
  message: string;
  fafPath?: string;
  soulPath?: string;
}

export function syncFafToSoul(workspace: string, verbose = false): SyncResult {
  const fafPath = join(workspace, FAF_FILENAME);
  const soulPath = join(workspace, SOUL_FILENAME);

  // Read FAF
  const faf = readFafFile(workspace);

  if (!faf) {
    return {
      success: false,
      message: `No ${FAF_FILENAME} found in ${workspace}`
    };
  }

  if (!validateFafDocument(faf)) {
    return {
      success: false,
      message: `Invalid ${FAF_FILENAME} - missing required fields`
    };
  }

  // Generate SOUL.md
  const soulContent = generateSoulMd(faf);

  // Check if SOUL.md exists and has manual edits
  if (existsSync(soulPath)) {
    const existingSoul = readFileSync(soulPath, 'utf8');
    if (!existingSoul.includes('Generated from project.faf')) {
      if (verbose) {
        console.log('Note: Existing SOUL.md may have manual edits. Backing up...');
      }
      writeFileSync(`${soulPath}.bak`, existingSoul);
    }
  }

  // Write SOUL.md
  writeFileSync(soulPath, soulContent);

  return {
    success: true,
    message: `Synced ${FAF_FILENAME} → ${SOUL_FILENAME}`,
    fafPath,
    soulPath
  };
}

export function initFaf(workspace: string, name?: string): SyncResult {
  const fafPath = join(workspace, FAF_FILENAME);

  if (existsSync(fafPath)) {
    return {
      success: false,
      message: `${FAF_FILENAME} already exists in ${workspace}`
    };
  }

  const template = generateFafTemplate(name);
  writeFileSync(fafPath, template);

  return {
    success: true,
    message: `Created ${FAF_FILENAME}`,
    fafPath
  };
}

export function watchAndSync(options: SyncOptions): void {
  const { workspace, verbose } = options;
  const fafPath = join(workspace, FAF_FILENAME);

  if (!existsSync(fafPath)) {
    console.error(`No ${FAF_FILENAME} found. Run 'faf-clawdbot init' first.`);
    process.exit(1);
  }

  console.log(`Watching ${fafPath} for changes...`);
  console.log('Press Ctrl+C to stop.\n');

  // Initial sync
  const result = syncFafToSoul(workspace, verbose);
  console.log(result.message);

  // Watch for changes
  watch(fafPath, (eventType) => {
    if (eventType === 'change') {
      const syncResult = syncFafToSoul(workspace, verbose);
      const timestamp = new Date().toLocaleTimeString();
      console.log(`[${timestamp}] ${syncResult.message}`);
    }
  });
}
