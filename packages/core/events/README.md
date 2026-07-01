# @empire/events

Event sourcing spine and immutable event log for EMPIRE™ OS.

## Core Principles

- Every state change = event
- No direct writes anywhere else
- Replay = system reconstruction
- Idempotency = zero duplication risk
- Append-only event log
- Deterministic event envelope

## API

### createEvent

Factory function to create an event envelope:

```typescript
const event = createEvent('USER_CREATED', { userId: 'u1' }, 'admin');
```

### appendEvent

Append event to immutable log:

```typescript
appendEvent(event);
```

### getEvents

Retrieve all events:

```typescript
const events = getEvents();
```

### replay

Replay event log for reconstruction:

```typescript
const replayed = replay();
```

### assertIdempotent

Guard against duplicate events:

```typescript
assertIdempotent(event.eventId);
```

## Event Envelope Contract

```typescript
interface EventEnvelope<T = any> {
  eventId: string;           // unique event identifier
  type: string;              // event type (e.g., USER_CREATED)
  timestamp: number;         // unix timestamp
  version: 1;                // schema version
  actorId: string;           // who caused this event
  correlationId?: string;    // links related events
  payload: T;                // event data
}
```
