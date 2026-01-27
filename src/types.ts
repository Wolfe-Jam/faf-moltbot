/**
 * FAF Context Types for ClawdBot Integration
 * IANA: application/vnd.faf+yaml
 */

export interface FafProject {
  name: string;
  goal?: string;
  type?: string;
  version?: string;
}

export interface FafPersona {
  voice?: string;
  style?: string;
  tone?: string;
  traits?: string[];
}

export interface FafContext {
  owner?: string;
  preferences?: string[];
  constraints?: string[];
}

export interface FafStack {
  platforms?: string[];
  model?: string;
  tools?: string[];
}

export interface FafDocument {
  project?: FafProject;
  persona?: FafPersona;
  context?: FafContext;
  stack?: FafStack;
  human_context?: {
    who?: string;
    what?: string;
    why?: string;
    when?: string;
  };
  [key: string]: unknown;
}

export interface SyncOptions {
  workspace: string;
  watch?: boolean;
  verbose?: boolean;
}
