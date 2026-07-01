# Changelog

## 1.0.0

- Initial foundation release
- Event envelope contract (immutable)
- Append-only event store (NEVER delete)
- Scoped idempotency guard (eventId + actorId + type + timestamp-window)
- Soft-fork capability for logical views
- Replay capability for system reconstruction
- Deterministic event creation
- Critical: no truncate, no reset, no delete operations
