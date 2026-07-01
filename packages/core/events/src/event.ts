import { EventEnvelope } from './envelope.js';

export function createEvent<T>(
  type: string,
  payload: T,
  actorId: string,
  correlationId?: string
): EventEnvelope<T> {
  return {
    eventId: crypto.randomUUID(),
    type,
    timestamp: Date.now(),
    version: 1,
    actorId,
    correlationId,
    payload
  };
}
