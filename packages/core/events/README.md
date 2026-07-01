# @empire/events

Event sourcing spine and immutable event log for EMPIRE™ OS.

## Core Principles

- **Every state change = event** – No exceptions
- **No direct writes anywhere else** – Only through events
- **Replay = system reconstruction** – Time-travel capability
- **Idempotency = zero duplication risk** – Per (eventId + actorId + type)
- **Append-only immutability** – Events never deleted
- **Soft-fork views only** – Never truncate the truth

## Critical Rules

⚠️ **NEVER**:
- Delete events
- Truncate the log
- Reset the spine
- Mutate committed events

✅ **ALWAYS**:
- Append new events
- Fork logical views
- Replay from genesis
- Maintain idempotency by (eventId, actorId, type, timestamp-window)

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

Guard against duplicate events with scoped idempotency:

```typescript
assertIdempotent(event.eventId, event.actorId, event.type, event.timestamp);
```

Idempotency is scoped by:
- `eventId` – unique event identifier
- `actorId` – who triggered the event
- `type` – event type
- `timestamp` – bucketed into windows (1s default)

This prevents replay attacks and ensures exactly-once semantics across distributed workers.

### forkEventView

Create a soft fork for logical views without truncating:

```typescript
const fork = forkEventView();
// Use fork.forkId to tag projections, dashboards, etc.
```

## Event Envelope Contract

```typescript
interface EventEnvelope<T = any> {
  eventId: string;           // unique event identifier
  type: string;              // event type (e.g., USER_CREATED)
  timestamp: number;         // unix timestamp
  version: 1;                // schema version (immutable contract)
  actorId: string;           // who caused this event
  correlationId?: string;    // links related events
  payload: T;                // event data
}
```

## Production Notes

- In-memory storage here is **for foundation only**
- At scale, persist idempotency keys to Redis/DB
- Event log should use event sourcing database (EventStoreDB, PostgreSQL WAL, etc.)
- Replay performance requires indexing by (actorId, type, timestamp)
