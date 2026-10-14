import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { cartTotal, fmt } from '../app.js';

// NOTE: 'totals string prices' is RED by design (planted money bug).
// After BugShield ships the fix it turns GREEN — that red→green flip is the demo.
describe('cart', () => {
  it('totals string prices numerically', () => {
    assert.equal(cartTotal('2.49', '1.99'), 4.48);
  });
  it('formats prices', () => {
    assert.equal(fmt(2.5), '₹2.50');
  });
});
