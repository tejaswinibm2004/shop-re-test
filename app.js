// QuickByte demo shop logic — contains planted logic bugs (see PLANTED_BUGS.md).
var PRODUCTS = [
  { id: 'milk', name: 'Milk 1L', price: 2.49, img: '/images/milk.png' },
  { id: 'bread', name: 'Bread', price: 1.99, img: '/images/bread.png' },
  { id: 'eggs', name: 'Eggs x12', price: 3.29, img: '/images/eggs.png' },
  { id: 'apple', name: 'Apples 1kg', price: 4.10, img: '/images/missing.png' },
  { id: 'rice', name: 'Rice 5kg', price: 9.99, img: '/images/rice.png' },
  { id: 'soap', name: 'Soap', price: 0.99, img: '/images/soap.png' },
];

var cart = [];

// BUG 6 (money — must require human approval): string concat instead of numeric add.
function cartTotal(a, b) {
  return a + b;
}

function fmt(n) {
  return '₹' + Number(n).toFixed(2);
}

function renderProducts() {
  var grid = document.getElementById('grid');
  grid.innerHTML = PRODUCTS.map(function (p) {
    return '<div class="card"><img src="' + p.img + '"><h3>' + p.name + '</h3>' +
      '<div class="price">' + fmt(p.price) + '</div>' +
      '<button data-add="' + p.id + '">Add to Card</button></div>';
  }).join('');
  grid.querySelectorAll('[data-add]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var p = PRODUCTS.find(function (x) { return x.id === btn.getAttribute('data-add'); });
      // BUG 7: price stored as string — feeds the concat bug above.
      cart.push({ id: p.id, name: p.name, price: String(p.price) });
      renderCart();
    });
  });
}

function renderCart() {
  var ul = document.getElementById('cart-items');
  ul.innerHTML = cart.map(function (i) { return '<li>' + i.name + ' — ' + fmt(i.price) + '</li>'; }).join('');
  var total = cart.reduce(function (acc, i) { return cartTotal(acc, i.price); }, 0);
  document.getElementById('total').textContent = fmt(total);
}

if (typeof document !== 'undefined') {
  document.getElementById('checkout').addEventListener('click', function () {
    // BUG 8: reads .name off the array (undefined) instead of joining items.
    var label = cart.name || 'cart';
    document.getElementById('checkout-msg').textContent =
      cart.length ? ('Order placed for ' + label + ' (' + cart.length + ' items)') : 'Your card is empty';
  });

  renderProducts();
  renderCart();
}

export { cartTotal, fmt, PRODUCTS };
