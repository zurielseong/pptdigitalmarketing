/* ================================================
   SUPERBOWL LIPIS STORE — App Logic
   Product catalog, cart, UI interactions
================================================ */

// ── Product Catalog ──────────────────────────────
const SBL_PRODUCTS = [
  {
    id: 'sbl-tee-classic',
    name: 'SBL Classic Tee',
    category: 'apparel',
    price: 49.00,
    badge: 'Best Seller',
    emoji: '👕',
    color: 'linear-gradient(135deg, #c0392b, #922b21)',
    variants: ['S', 'M', 'L', 'XL'],
    description: 'Our iconic classic tee. Soft cotton, bold logo. Available in Black, White and Red.',
  },
  {
    id: 'sbl-hoodie-premium',
    name: 'SBL Premium Hoodie',
    category: 'apparel',
    price: 89.00,
    badge: 'New',
    emoji: '🧥',
    color: 'linear-gradient(135deg, #1a1a2e, #c0392b)',
    variants: ['S', 'M', 'L', 'XL'],
    description: 'Heavy-weight fleece hoodie with embroidered SBL crest. Unisex fit.',
  },
  {
    id: 'sbl-cap-snapback',
    name: 'SBL Snapback Cap',
    category: 'apparel',
    price: 39.00,
    badge: null,
    emoji: '🧢',
    color: 'linear-gradient(135deg, #111, #c0392b)',
    variants: ['One Size'],
    description: 'Structured snapback with embroidered SBL logo. One size fits all.',
  },
  {
    id: 'sbl-tote-bag',
    name: 'SBL Canvas Tote',
    category: 'accessories',
    price: 25.00,
    badge: null,
    emoji: '🛍️',
    color: 'linear-gradient(135deg, #2c3e50, #4a235a)',
    variants: ['Natural', 'Black'],
    description: 'Heavy-duty canvas tote with screen-printed SBL Lipis graphic.',
  },
  {
    id: 'sbl-water-bottle',
    name: 'SBL Water Bottle',
    category: 'accessories',
    price: 45.00,
    badge: 'Popular',
    emoji: '🍶',
    color: 'linear-gradient(135deg, #1e3c72, #2a5298)',
    variants: ['500ml', '750ml'],
    description: 'Insulated stainless steel bottle. Keeps cold 24hr, hot 12hr.',
  },
  {
    id: 'sbl-mug-ceramic',
    name: 'SBL Ceramic Mug',
    category: 'lifestyle',
    price: 29.00,
    badge: null,
    emoji: '☕',
    color: 'linear-gradient(135deg, #1e3c1e, #27ae60)',
    variants: ['White', 'Black'],
    description: '11oz ceramic mug with the SBL crest. Dishwasher safe.',
  },
  {
    id: 'sbl-sticker-pack',
    name: 'SBL Sticker Pack (5pcs)',
    category: 'lifestyle',
    price: 15.00,
    badge: 'Value',
    emoji: '🎨',
    color: 'linear-gradient(135deg, #f39c12, #c0392b)',
    variants: ['Pack A', 'Pack B', 'Mixed'],
    description: 'Set of 5 premium vinyl stickers. Waterproof and UV resistant.',
  },
  {
    id: 'sbl-enamel-pin',
    name: 'SBL Enamel Pin Set',
    category: 'lifestyle',
    price: 20.00,
    badge: 'Limited',
    emoji: '📌',
    color: 'linear-gradient(135deg, #6c3483, #1a5276)',
    variants: ['Set of 3'],
    description: 'Collectible hard enamel pins. 3-piece set featuring SBL icons.',
  },
];

// ── Cart Utilities ────────────────────────────────
function getCart() {
  try { return JSON.parse(localStorage.getItem('sbl_cart')) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('sbl_cart', JSON.stringify(cart));
}

function addToCart(productId, variant) {
  const product = SBL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  let cart = getCart();
  const cartId = productId + (variant ? '_' + variant : '');
  const existing = cart.find(i => i.id === cartId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: cartId,
      productId: productId,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      color: product.color,
      variant: variant || null,
      qty: 1,
    });
  }

  saveCart(cart);
  updateCartCount();
  showToast('✅ ' + product.name + ' added to cart');
}

function removeFromCart(cartId) {
  let cart = getCart().filter(i => i.id !== cartId);
  saveCart(cart);
  updateCartCount();
  if (typeof renderCart === 'function') renderCart();
  showToast('🗑️ Item removed from cart');
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  ['cartCount', 'mobileCartCount'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = count > 0 ? count : '0';
      el.style.display = count > 0 ? '' : 'none';
    }
  });
}

// ── Product Card Renderer ─────────────────────────
function renderProductCard(product) {
  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-card__img">
        <div class="product-card__img-inner" style="background:${product.color}">
          <span style="font-size:52px;">${product.emoji}</span>
        </div>
        <div class="product-card__overlay">
          <button class="add-to-cart-btn" data-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
      <div class="product-card__body">
        <p class="product-card__cat">${product.category}</p>
        <h3 class="product-card__name">${product.name}</h3>
        <div class="product-card__price-row">
          <span class="product-card__price">RM ${product.price.toFixed(2)}</span>
          ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

function bindAddToCart(container) {
  container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.id;
      const product = SBL_PRODUCTS.find(p => p.id === id);
      const variant = product && product.variants ? product.variants[0] : null;
      addToCart(id, variant);
      btn.textContent = 'Added!';
      btn.style.background = '#27ae60';
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.background = '';
      }, 1500);
    });
  });
}

// ── Toast ─────────────────────────────────────────
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ── Mobile Nav ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const closeNav = document.getElementById('closeNav');
  const overlay = document.getElementById('overlay');

  function openNav() {
    mobileNav && mobileNav.classList.add('open');
    overlay && overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeNavFn() {
    mobileNav && mobileNav.classList.remove('open');
    overlay && overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  menuBtn && menuBtn.addEventListener('click', openNav);
  closeNav && closeNav.addEventListener('click', closeNavFn);
  overlay && overlay.addEventListener('click', closeNavFn);

  // Newsletter
  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      showToast('🎉 Subscribed! Welcome to the SBL Family.');
      form.reset();
    });
  }

  // Sticky header shadow
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10 ? '0 2px 16px rgba(0,0,0,0.1)' : 'none';
    }, { passive: true });
  }
});
