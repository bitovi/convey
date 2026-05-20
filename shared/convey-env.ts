/** Read a CONVEY_* env variable injected by the server into the page */
export function env(key: string): string | undefined {
  return (window as any).__CONVEY_ENV__?.[key];
}

/** True when CONVEY_DEBUG is set to any truthy value */
export function isDebug(): boolean {
  const v = env('CONVEY_DEBUG');
  return v !== undefined && v !== '' && v !== '0' && v !== 'false';
}

/** Log only when CONVEY_DEBUG is enabled */
export function debugLog(prefix: string, ...args: any[]): void {
  if (isDebug()) console.log(`[${prefix}]`, ...args);
}

/** Warn only when CONVEY_DEBUG is enabled */
export function debugWarn(prefix: string, ...args: any[]): void {
  if (isDebug()) console.warn(`[${prefix}]`, ...args);
}
