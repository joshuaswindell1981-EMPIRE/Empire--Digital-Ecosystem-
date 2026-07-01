export interface EventEnvelope<T = any> {
  eventId: string;
  type: string;
  timestamp: number;
  version: 1;
  actorId: string;
  correlationId?: string;
  payload: T;
}
