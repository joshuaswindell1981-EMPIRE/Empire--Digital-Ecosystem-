// Idempotency key: (eventId + actorId + type + timestamp bucket)
// Persisted as Set, but in production should use Redis/DB
interface IdempotencyKey {
  eventId: string;
  actorId: string;
  type: string;
  windowStart: number; // timestamp bucket (e.g., per second)
}

const seenEvents = new Map<string, IdempotencyKey>();

function serializeKey(eventId: string, actorId: string, type: string, windowStart: number): string {
  return `${eventId}:${actorId}:${type}:${windowStart}`;
}

function getWindowStart(timestamp: number, windowMs: number = 1000): number {
  return Math.floor(timestamp / windowMs) * windowMs;
}

export function assertIdempotent(
  eventId: string,
  actorId: string,
  type: string,
  timestamp: number,
  windowMs: number = 1000
): void {
  const windowStart = getWindowStart(timestamp, windowMs);
  const key = serializeKey(eventId, actorId, type, windowStart);

  if (seenEvents.has(key)) {
    throw new Error(`Duplicate event blocked: ${eventId} from ${actorId} (${type}) in window ${windowStart}`);
  }

  seenEvents.set(key, {
    eventId,
    actorId,
    type,
    windowStart
  });
}

// For testing only — never call in production
export function __testResetIdempotencyGuard(): void {
  seenEvents.clear();
}
