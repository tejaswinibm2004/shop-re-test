import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { cartTotal, fmt, renderStars, searchProducts } from '../app.js';

// NOTE: 'totals string prices' is RED by design (planted money bug).
// After BugShield ships the fix it turns GREEN — that red→green flip is the demo.
describe('cart', () => {
  it('totals string prices numerically', () => {
    assert.equal(cartTotal([{ price: '19.99' }, { price: '5.00' }]), 24.99);
  });
  it('formats prices', () => {
    assert.equal(fmt(2.5), '$2.50');
  });
  it('shows full stars for 5.0', () => {
    assert.equal(renderStars(5), '★★★★★');
  });
  it('finds products by name', () => {
    // RED by design: search matches descriptions, not names.
    assert.ok(searchProducts('t-shirt').length >= 1);
  });
});
