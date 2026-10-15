// Amazin demo storefront logic — planted bugs marked (see PLANTED_BUGS.md).
export const PRODUCTS = [
  { id: 'p1', name: 'Wireless Headphones Pro', price: 49.99, rating: 4.5, img: '/images/p1.svg', desc: 'Noise-cancelling over-ear headphones, 40h battery', cat: 'Electronics' },
  { id: 'p2', name: 'Organic Basmati Rice 5kg', price: 12.49, rating: 4.0, img: '/images/p2.svg', desc: 'Long-grain aged basmati rice bag', cat: 'Grocery' },
  { id: 'p3', name: 'Stainless Steel Bottle 1L', price: 9.99, rating: 3.5, img: '/images/p3.svg', desc: 'Vacuum insulated steel flask', cat: 'Home' },
  { id: 'p4', name: 'Smart LED Bulb (4-pack)', price: 18.0, rating: 4.5, img: '/images/missing.png', desc: 'Wifi multicolor bulbs that never disconnect', cat: 'Electronics' },
  { id: 'p5', name: 'Cotton T-Shirt Large', price: 7.5, rating: 4.0, img: '/images/p5.svg', desc: 'Plain crew neck tee, pack of 1', cat: 'Fashion' },
  { id: 'p6', name: 'USB-C Fast Charger 65W', price: 24.95, rating: 4.5, img: '/images/p6.svg', desc: 'GaN wall charger for laptops', cat: 'Electronics' },
  { id: 'p7', name: 'Non-stick Frying Pan 28cm', price: 21.25, rating: 3.0, img: '/images/p7.svg', desc: 'Induction friendly pan with lid', cat: 'Home' },
  { id: 'p8', name: 'Paperback Mystery Novel', price: 6.99, rating: 5.0, img: '/images/p8.svg', desc: 'Bestselling whodunit, 320 pages', cat: 'Books' },
];

export function fmt(n) {
  return '$' + Number(n).toFixed(2);
}

// BUG 4: floor() drops the half star — 4.5 shows ★★★★, never ★★★★½.
export function renderStars(r) {
  const full = Math.floor(r);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

// BUG 2 (money — must require human approval): string concat, not numeric add.
export function cartTotal(items) {
  return items.reduce((acc, i) => acc + i.price, 0);
}

// BUG 3: searches the description instead of the product name.
export function searchProducts(q) {
  const needle = String(q || '').toLowerCase().trim();
  if (!needle) return PRODUCTS;
  return PRODUCTS.filter(p => p.desc.toLowerCase().includes(needle));
}

export function salePrice(p) {
  // BUG 5: "20% off" badge shown, but the discount is never applied.
  return p.price;
}

const cart = [];

function refreshBadge() {
  // BUG 9: badge rendered once at load, never updated after adding items.
}

export function addToCart(id) {
  // BUG 7: off-by-one — adds the NEXT product, not the clicked one.
  const idx = PRODUCTS.findIndex(p => p.id === id);
  const p = PRODUCTS[(idx + 1) % PRODUCTS.length];
  cart.push({ id: p.id, name: p.name, price: String(p.price), qty: 1 });
  renderCart();
}

export function changeQty(id, delta) {
  const it = cart.find(i => i.id === id);
  if (!it) return;
  // BUG 8: minus increases — subtracted delta has the wrong sign.
  it.qty = it.qty - delta;
  if (it.qty <= 0) cart.splice(cart.indexOf(it), 1);
  renderCart();
}

function renderProducts(list) {
  const grid = document.getElementById('grid');
  document.getElementById('results-meta').textContent = list.length + ' results';
  grid.innerHTML = list.map(p => {
    const sp = salePrice(p);
    return `<div class="card"><img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="stars" title="${p.rating} out of 5">${renderStars(p.rating)} <span class="muted">${p.rating}</span></div>
      <div><span class="deal-badge">-20%</span></div>
      <div class="price">${fmt(sp)}</div>
      <div class="was">Was: ${fmt(p.price)}</div>
      <div><button data-add="${p.id}">Add to Card</button></div></div>`;
  }).join('');
  grid.querySelectorAll('[data-add]').forEach(btn =>
    btn.addEventListener('click', () => addToCart(btn.getAttribute('data-add'))));
}

function renderCart() {
  const ul = document.getElementById('cart-items');
  ul.innerHTML = cart.map(i => `<li>${i.name} — ${fmt(i.price)} <span class="qty">
    <button data-dec="${i.id}">-</button> Quantitiy: ${i.qty} <button data-inc="${i.id}">+</button></span></li>`).join('');
  ul.querySelectorAll('[data-dec]').forEach(b => b.addEventListener('click', () => changeQty(b.getAttribute('data-dec'), -1)));
  ul.querySelectorAll('[data-inc]').forEach(b => b.addEventListener('click', () => changeQty(b.getAttribute('data-inc'), 1)));
  const total = cart.length ? cartTotal(cart.map(i => ({ price: i.price }))) : 0;
  // BUG 2 visible: concat leaks through as "$049.9912.49" instead of a sum.
  document.getElementById('total').textContent = typeof total === 'number' ? fmt(total) : '$' + total;
}

if (typeof document !== 'undefined') {
  refreshBadge();
  renderProducts(PRODUCTS);
  renderCart();
  document.getElementById('go').addEventListener('click', () => {
    const list = searchProducts(document.getElementById('q').value);
    document.getElementById('results-title').textContent = 'Search results';
    renderProducts(list);
  });
  document.getElementById('q').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('go').click(); });
  document.getElementById('shop-now').addEventListener('click', () => document.getElementById('results-wrap').scrollIntoView());
  document.getElementById('top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.getElementById('checkout').addEventListener('click', () => {
    const names = cart.map(i => i.name).join(', ');
    document.getElementById('checkout-msg').textContent =
      cart.length ? `Order placed for: ${names}` : 'Your card is empty';
  });
}
