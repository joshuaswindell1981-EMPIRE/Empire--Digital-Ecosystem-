const seen = new Set<string>();

export function assertIdempotent(eventId: string): void {
  if (seen.has(eventId)) {
    throw new Error(`Duplicate event blocked: ${eventId}`);
  }
  seen.add(eventId);
}

export function resetIdempotencyGuard(): void {
  seen.clear();
}
