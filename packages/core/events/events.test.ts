import { createEvent, appendEvent, getEvents, assertIdempotent, forkEventView, __testResetIdempotencyGuard } from './src/index.js';

if (typeof globalThis !== 'undefined' && typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = require('crypto');
}

const e = createEvent('TEST_EVENT', { value: 1 }, 'user_1');
assertIdempotent(e.eventId, e.actorId, e.type, e.timestamp);
appendEvent(e);
const all = getEvents();

if (all.length === 1 && all[0].type === 'TEST_EVENT') {
  console.log('✅ events: append test passed');
} else {
  console.log('❌ events: append test failed');
}

// Test idempotency guard
try {
  assertIdempotent(e.eventId, e.actorId, e.type, e.timestamp);
  console.log('❌ events: idempotency guard failed (should have thrown)');
} catch (err) {
  console.log('✅ events: idempotency guard passed');
}

// Test fork
const fork = forkEventView();
if (fork.forkId && fork.createdAt) {
  console.log('✅ events: fork creation passed');
} else {
  console.log('❌ events: fork creation failed');
}

__testResetIdempotencyGuard();
