/**
 * Sync Engine - Bi-directional sync between project.faf and SOUL.md
 */
import type { SyncOptions } from './types.js';
export interface SyncResult {
    success: boolean;
    message: string;
    fafPath?: string;
    soulPath?: string;
}
export declare function syncFafToSoul(workspace: string, verbose?: boolean): SyncResult;
export declare function initFaf(workspace: string, name?: string): SyncResult;
export declare function watchAndSync(options: SyncOptions): void;
//# sourceMappingURL=sync.d.ts.map