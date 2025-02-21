export type MS = (val: number) => string


export interface Env {
  spectrum: string[];
  formatArgs: (this: DebugInstance, args: any[]) => void;
  log: (...args: any[]) => void;
  humanize?: MS;
  load: () => string;
  save: (namespaces: string) => void
  [key: string]: any; // 其他可能的属性
}

export interface CreateDebugFn {
  (namespace: string): DebugInstance;
  debug: CreateDebugFn;
  enable: (namespaces: string) => void;
  enabled: (namespace: string) => boolean;
  disable: () => string;
  humanize: MS;
  names: string[];
  skips: string[];
  selectColor: (namespace: string) => string;
  namespaces?: string;
  formatters: Record<string, (v: any) => string>;
  spectrum: string[];
  log: (...args: any[]) => void;
  formatArgs: (this: DebugInstance, args: any[]) => void;
  load: () => string;
  save: (namespaces: string) => void
  [key: string]: any;
}

// Define the type for a debug instance
export interface DebugInstance {
  (...args: any[]): void;
  enabled: (namespace: string) => boolean;
  curr?: number;
  prev?: number;
  diff?: number;
  color: string;
  namespace: string;
  log: (...args: any[]) => void;
  namespaces: string;
}
