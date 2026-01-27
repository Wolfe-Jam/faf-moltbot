/**
 * FAF Reader - Reads project.faf from ClawdBot workspace
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';
import type { FafDocument } from './types.js';

const FAF_FILENAME = 'project.faf';

export function findFafFile(workspace: string): string | null {
  const fafPath = join(workspace, FAF_FILENAME);
  return existsSync(fafPath) ? fafPath : null;
}

export function readFafFile(workspace: string): FafDocument | null {
  const fafPath = findFafFile(workspace);

  if (!fafPath) {
    return null;
  }

  try {
    const content = readFileSync(fafPath, 'utf8');
    const doc = parse(content) as FafDocument;
    return doc;
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error reading ${FAF_FILENAME}: ${msg}`);
    return null;
  }
}

export function validateFafDocument(doc: FafDocument): boolean {
  // Minimal validation - must have project.name at minimum
  if (!doc.project?.name) {
    console.warn('Warning: project.faf missing project.name');
    return false;
  }
  return true;
}
