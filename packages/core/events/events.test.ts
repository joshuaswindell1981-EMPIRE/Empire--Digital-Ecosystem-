import { createEvent, appendEvent, getEvents, assertIdempotent, clearEventLog, resetIdempotencyGuard } from './src/index.js';

if (typeof globalThis !== 'undefined' && typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = require('crypto');
}

const e = createEvent('TEST_EVENT', { value: 1 }, 'user_1');
assertIdempotent(e.eventId);
appendEvent(e);
const all = getEvents();

if (all.length === 1 && all[0].type === 'TEST_EVENT') {
  console.log('✅ events smoke test passed');
} else {
  console.log('❌ events smoke test failed');
}

clearEventLog();
resetIdempotencyGuard();
