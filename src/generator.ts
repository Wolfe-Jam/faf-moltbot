/**
 * SOUL.md Generator - Creates ClawdBot SOUL.md from project.faf
 */

import type { FafDocument } from './types.js';

export function generateSoulMd(faf: FafDocument): string {
  const lines: string[] = [];

  // Header
  lines.push('# SOUL');
  lines.push('');
  lines.push('> Generated from project.faf (IANA: application/vnd.faf+yaml)');
  lines.push('> Edit project.faf to update. Run `faf-clawdbot sync` to regenerate.');
  lines.push('');

  // Project Identity
  if (faf.project) {
    lines.push('## Identity');
    lines.push('');
    if (faf.project.name) {
      lines.push(`**Name:** ${faf.project.name}`);
    }
    if (faf.project.goal) {
      lines.push(`**Goal:** ${faf.project.goal}`);
    }
    if (faf.project.type) {
      lines.push(`**Type:** ${faf.project.type}`);
    }
    lines.push('');
  }

  // Persona
  if (faf.persona) {
    lines.push('## Persona');
    lines.push('');
    if (faf.persona.voice) {
      lines.push(`**Voice:** ${faf.persona.voice}`);
    }
    if (faf.persona.style) {
      lines.push(`**Style:** ${faf.persona.style}`);
    }
    if (faf.persona.tone) {
      lines.push(`**Tone:** ${faf.persona.tone}`);
    }
    if (faf.persona.traits?.length) {
      lines.push('**Traits:**');
      faf.persona.traits.forEach(trait => {
        lines.push(`- ${trait}`);
      });
    }
    lines.push('');
  }

  // Context / Preferences
  if (faf.context) {
    lines.push('## Context');
    lines.push('');
    if (faf.context.owner) {
      lines.push(`**Owner:** ${faf.context.owner}`);
    }
    if (faf.context.preferences?.length) {
      lines.push('**Preferences:**');
      faf.context.preferences.forEach(pref => {
        lines.push(`- ${pref}`);
      });
    }
    if (faf.context.constraints?.length) {
      lines.push('**Constraints:**');
      faf.context.constraints.forEach(constraint => {
        lines.push(`- ${constraint}`);
      });
    }
    lines.push('');
  }

  // Human Context (5W)
  if (faf.human_context) {
    lines.push('## Human Context');
    lines.push('');
    if (faf.human_context.who) {
      lines.push(`**Who:** ${faf.human_context.who}`);
    }
    if (faf.human_context.what) {
      lines.push(`**What:** ${faf.human_context.what}`);
    }
    if (faf.human_context.why) {
      lines.push(`**Why:** ${faf.human_context.why}`);
    }
    if (faf.human_context.when) {
      lines.push(`**When:** ${faf.human_context.when}`);
    }
    lines.push('');
  }

  // Stack
  if (faf.stack) {
    lines.push('## Stack');
    lines.push('');
    if (faf.stack.model) {
      lines.push(`**Model:** ${faf.stack.model}`);
    }
    if (faf.stack.platforms?.length) {
      lines.push(`**Platforms:** ${faf.stack.platforms.join(', ')}`);
    }
    if (faf.stack.tools?.length) {
      lines.push(`**Tools:** ${faf.stack.tools.join(', ')}`);
    }
    lines.push('');
  }

  // Footer
  lines.push('---');
  lines.push('*Powered by FAF (faf.one) | IANA: application/vnd.faf+yaml*');

  return lines.join('\n');
}

export function generateFafTemplate(name: string = 'my-assistant'): string {
  return `# ClawdBot Soul - FAF Format
# IANA: application/vnd.faf+yaml
# Docs: https://faf.one

project:
  name: "${name}"
  goal: "Personal AI assistant"
  type: "clawdbot-workspace"

persona:
  voice: "Helpful and direct"
  style: "Professional but friendly"
  tone: "Conversational"
  traits:
    - "Concise responses"
    - "Proactive suggestions"

context:
  owner: ""
  preferences:
    - "Clear explanations"
    - "Code examples when relevant"
  constraints:
    - "No unnecessary verbosity"

stack:
  model: "claude-opus-4-5"
  platforms:
    - "telegram"
    - "slack"
  tools:
    - "browser"
    - "canvas"

human_context:
  who: "Personal assistant user"
  what: "Multi-platform AI assistant"
  why: "Productivity and automation"
`;
}
