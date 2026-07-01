import { EventEnvelope } from './envelope.js';

const eventLog: EventEnvelope[] = [];

export function appendEvent(event: EventEnvelope): void {
  eventLog.push(event);
}

export function getEvents(): EventEnvelope[] {
  return [...eventLog];
}

export function replay(): EventEnvelope[] {
  return eventLog.reduce((acc, event) => {
    acc.push(event);
    return acc;
  }, [] as EventEnvelope[]);
}

// NEVER DELETE EVENTS — ONLY SOFT-FORK LOGICAL VIEWS
export interface EventFork {
  forkId: string;
  createdAt: string;
  baselineEventId?: string;
}

export function forkEventView(): EventFork {
  return {
    forkId: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
}
