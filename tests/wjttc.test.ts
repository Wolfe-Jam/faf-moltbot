/**
 * WJTTC Test Suite - faf-moltbot
 * Wolfe-Jam Test To Championship
 *
 * F1-Inspired Testing: When brakes must work flawlessly, so must our code.
 *
 * Tiers:
 * - BRAKE: Critical tests - app won't work without these
 * - ENGINE: Core functionality - the main features
 * - AERO: Edge cases & polish - robustness & performance
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, rmSync, mkdirSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';

const CLI = 'node dist/src/cli.js';
const TEST_WORKSPACE = '/tmp/wjttc-faf-moltbot-test';

// Test utilities
function run(cmd: string): string {
  try {
    return execSync(`${CLI} ${cmd}`, { encoding: 'utf8', cwd: process.cwd() });
  } catch (e: any) {
    return e.stdout || e.message;
  }
}

function cleanup(): void {
  if (existsSync(TEST_WORKSPACE)) {
    rmSync(TEST_WORKSPACE, { recursive: true });
  }
}

function setup(): void {
  cleanup();
}

// Test result tracking
interface TestResult {
  tier: 'BRAKE' | 'ENGINE' | 'AERO';
  name: string;
  passed: boolean;
  error?: string;
}

const results: TestResult[] = [];

function test(tier: 'BRAKE' | 'ENGINE' | 'AERO', name: string, fn: () => void): void {
  try {
    fn();
    results.push({ tier, name, passed: true });
    console.log(`  ✅ ${name}`);
  } catch (e: any) {
    results.push({ tier, name, passed: false, error: e.message });
    console.log(`  ❌ ${name}: ${e.message}`);
  }
}

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

// ═══════════════════════════════════════════════════════════
// BRAKE TESTS - Critical (Must Pass)
// ═══════════════════════════════════════════════════════════

console.log('\n🛑 BRAKE TESTS (Critical)\n');

test('BRAKE', 'CLI loads without crashing', () => {
  const output = run('--help');
  assert(output.includes('faf-moltbot'), 'Should show CLI name');
});

test('BRAKE', 'Help command shows usage', () => {
  const output = run('--help');
  assert(output.includes('Commands:'), 'Should list commands');
  assert(output.includes('init'), 'Should show init command');
  assert(output.includes('sync'), 'Should show sync command');
});

test('BRAKE', 'Init creates workspace and project.faf', () => {
  setup();
  const output = run(`init "brake-test" --workspace ${TEST_WORKSPACE}`);
  assert(output.includes('Created'), 'Should confirm creation');
  assert(existsSync(join(TEST_WORKSPACE, 'project.faf')), 'project.faf should exist');
});

test('BRAKE', 'Sync creates SOUL.md from project.faf', () => {
  const output = run(`sync --workspace ${TEST_WORKSPACE}`);
  assert(output.includes('Synced'), 'Should confirm sync');
  assert(existsSync(join(TEST_WORKSPACE, 'SOUL.md')), 'SOUL.md should exist');
});

// ═══════════════════════════════════════════════════════════
// ENGINE TESTS - Core Functionality
// ═══════════════════════════════════════════════════════════

console.log('\n🔧 ENGINE TESTS (Core Functionality)\n');

test('ENGINE', 'project.faf is valid YAML', () => {
  const content = readFileSync(join(TEST_WORKSPACE, 'project.faf'), 'utf8');
  const parsed = parse(content);
  assert(parsed !== null, 'Should parse as YAML');
  assert(typeof parsed === 'object', 'Should be an object');
});

test('ENGINE', 'project.faf has required fields', () => {
  const content = readFileSync(join(TEST_WORKSPACE, 'project.faf'), 'utf8');
  const faf = parse(content);
  assert(faf.project?.name === 'brake-test', 'Should have project name');
  assert(faf.project?.goal, 'Should have project goal');
  assert(faf.persona, 'Should have persona section');
});

test('ENGINE', 'SOUL.md has correct header', () => {
  const content = readFileSync(join(TEST_WORKSPACE, 'SOUL.md'), 'utf8');
  assert(content.includes('# SOUL'), 'Should have SOUL header');
  assert(content.includes('Generated from project.faf'), 'Should note FAF origin');
  assert(content.includes('IANA'), 'Should mention IANA');
});

test('ENGINE', 'SOUL.md contains project identity', () => {
  const content = readFileSync(join(TEST_WORKSPACE, 'SOUL.md'), 'utf8');
  assert(content.includes('**Name:** brake-test'), 'Should have project name');
  assert(content.includes('## Identity'), 'Should have Identity section');
});

test('ENGINE', 'SOUL.md contains persona', () => {
  const content = readFileSync(join(TEST_WORKSPACE, 'SOUL.md'), 'utf8');
  assert(content.includes('## Persona'), 'Should have Persona section');
  assert(content.includes('**Voice:**'), 'Should have voice');
});

test('ENGINE', 'Status command shows correct info', () => {
  const output = run(`status --workspace ${TEST_WORKSPACE}`);
  assert(output.includes('project.faf: Found'), 'Should find project.faf');
  assert(output.includes('SOUL.md: Found'), 'Should find SOUL.md');
  assert(output.includes('brake-test'), 'Should show project name');
});

test('ENGINE', 'Sync is idempotent', () => {
  const before = readFileSync(join(TEST_WORKSPACE, 'SOUL.md'), 'utf8');
  run(`sync --workspace ${TEST_WORKSPACE}`);
  const after = readFileSync(join(TEST_WORKSPACE, 'SOUL.md'), 'utf8');
  assert(before === after, 'Multiple syncs should produce same output');
});

// ═══════════════════════════════════════════════════════════
// AERO TESTS - Edge Cases & Polish
// ═══════════════════════════════════════════════════════════

console.log('\n🌀 AERO TESTS (Edge Cases & Polish)\n');

test('AERO', 'Init with custom name works', () => {
  const customWorkspace = `${TEST_WORKSPACE}-custom`;
  rmSync(customWorkspace, { recursive: true, force: true });
  run(`init "custom-soul-name" --workspace ${customWorkspace}`);
  const content = readFileSync(join(customWorkspace, 'project.faf'), 'utf8');
  const faf = parse(content);
  assert(faf.project?.name === 'custom-soul-name', 'Should use custom name');
  rmSync(customWorkspace, { recursive: true });
});

test('AERO', 'Error on missing workspace for sync', () => {
  const output = run('sync --workspace /nonexistent/path');
  assert(output.includes('not found') || output.includes('No project.faf'), 'Should error on missing workspace');
});

test('AERO', 'Error on missing workspace for status', () => {
  const output = run('status --workspace /nonexistent/path');
  assert(output.includes('not found'), 'Should error on missing workspace');
});

test('AERO', 'Init refuses to overwrite existing project.faf', () => {
  const output = run(`init "new-name" --workspace ${TEST_WORKSPACE}`);
  assert(output.includes('already exists'), 'Should refuse to overwrite');
});

test('AERO', 'SOUL.md has footer with FAF link', () => {
  const content = readFileSync(join(TEST_WORKSPACE, 'SOUL.md'), 'utf8');
  assert(content.includes('faf.one'), 'Should have faf.one link');
  assert(content.includes('Powered by FAF'), 'Should credit FAF');
});

// ═══════════════════════════════════════════════════════════
// RESULTS SUMMARY
// ═══════════════════════════════════════════════════════════

console.log('\n═══════════════════════════════════════════════════════════');
console.log('🏁 WJTTC TEST RESULTS - faf-moltbot');
console.log('═══════════════════════════════════════════════════════════\n');

const brakeTests = results.filter(r => r.tier === 'BRAKE');
const engineTests = results.filter(r => r.tier === 'ENGINE');
const aeroTests = results.filter(r => r.tier === 'AERO');

const brakePassed = brakeTests.filter(r => r.passed).length;
const enginePassed = engineTests.filter(r => r.passed).length;
const aeroPassed = aeroTests.filter(r => r.passed).length;

console.log(`🛑 BRAKE:  ${brakePassed}/${brakeTests.length} passed`);
console.log(`🔧 ENGINE: ${enginePassed}/${engineTests.length} passed`);
console.log(`🌀 AERO:   ${aeroPassed}/${aeroTests.length} passed`);

const totalPassed = results.filter(r => r.passed).length;
const totalTests = results.length;
const passRate = Math.round((totalPassed / totalTests) * 100);

console.log(`\n📊 TOTAL: ${totalPassed}/${totalTests} (${passRate}%)`);

// Championship status
if (brakePassed < brakeTests.length) {
  console.log('\n🔴 CRITICAL FAILURE - Brake tests failed. DO NOT SHIP.');
  process.exit(1);
} else if (passRate === 100) {
  console.log('\n🏆 CHAMPIONSHIP GRADE - All tests passed. Ready to ship!');
} else if (passRate >= 90) {
  console.log('\n🥇 GOLD - Minor issues. Review before shipping.');
} else if (passRate >= 80) {
  console.log('\n🥈 SILVER - Some issues to address.');
} else {
  console.log('\n🥉 BRONZE - Needs work before shipping.');
}

// Cleanup
cleanup();

process.exit(totalPassed === totalTests ? 0 : 1);
