/**
 * faf-clawdbot
 * Portable souls for ClawdBot
 *
 * IANA: application/vnd.faf+yaml
 * https://faf.one
 */
export { readFafFile, findFafFile, validateFafDocument } from './reader.js';
export { generateSoulMd, generateFafTemplate } from './generator.js';
export { syncFafToSoul, initFaf, watchAndSync } from './sync.js';
//# sourceMappingURL=index.js.map