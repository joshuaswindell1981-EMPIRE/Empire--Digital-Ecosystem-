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

export function clearEventLog(): void {
  eventLog.length = 0;
}
