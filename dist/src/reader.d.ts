/**
 * FAF Reader - Reads project.faf from ClawdBot workspace
 */
import type { FafDocument } from './types.js';
export declare function findFafFile(workspace: string): string | null;
export declare function readFafFile(workspace: string): FafDocument | null;
export declare function validateFafDocument(doc: FafDocument): boolean;
//# sourceMappingURL=reader.d.ts.map