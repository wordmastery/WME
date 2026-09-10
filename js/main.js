/* ============================================================
   A&N VIBE — Main JavaScript
   - Pricing Configuration (yahin prices change karein)
   - Product Enquiry to WhatsApp
   - Contact Form to WhatsApp
   - Quantity + Custom MOQ handling
   ============================================================ */

/* ============================================================
   ⚙️ PRICING CONFIG
   ------------------------------------------------------------
   Yahan se har product ka MOQ aur pricing change kar sakte hain.
   
   Har tier mein:
   - min:  Minimum quantity
   - max:  Maximum quantity (Infinity = usse zyada bhi chalega)
   - price: Unit price us range ke liye (₹)
   ============================================================ */
const pricing = {
  pencil: {
    name: 'Premium Pencil Pouch',
    moq: 10,
    tiers: [
      { min: 10, max: 24, price: 199 },
      { min: 25, max: 49, price: 179 },
      { min: 50, max: 99, price: 159 },
      { min: 100, max: Infinity, price: 149 }
    ]
  },
  tote: {
    name: 'Classic Tote Bag',
    moq: 5,
    tiers: [
      { min: 5, max: 19, price: 499 },
      { min: 20, max: 49, price: 449 },
      { min: 50, max: Infinity, price: 399 }
    ]
  },
  jhola: {
    name: 'Premium Jhola Bag',
    moq: 5,
    tiers: [
      { min: 5, max: 19, price: 699 },
      { min: 20, max: 49, price: 629 },
      { min: 50, max: Infinity, price: 559 }
    ]
  },
  backpack: {
    name: 'Backpack',
    moq: 5,
    tiers: [
      { min: 5, max: 19, price: 999 },
      { min: 20, max: 49, price: 899 },
      { min: 50, max: Infinity, price: 799 }
    ]
  },
  laptop: {
    name: 'Laptop Backpack',
    moq: 5,
    tiers: [
      { min: 5, max: 19, price: 1299 },
      { min: 20, max: 49, price: 1199 },
      { min: 50, max: Infinity, price: 1099 }
    ]
  },
  duffel: {
    name: 'Travel Duffel Bag',
    moq: 5,
    tiers: [
      { min: 5, max: 19, price: 899 },
      { min: 20, max: 49, price: 799 },
      { min: 50, max: Infinity, price: 699 }
    ]
  },
  sling: {
    name: 'Sling Bag',
    moq: 10,
    tiers: [
      { min: 10, max: 24, price: 399 },
      { min: 25, max: 49, price: 349 },
      { min: 50, max: Infinity, price: 299 }
    ]
  }
};

/* ============================================================
   📞 CONTACT INFO (yahin change karein)
   ============================================================ */
const CONTACT = {
  whatsapp: '917903433690', // WhatsApp number (91 ke saath)
  email: 'anvibe@gmail.com'
};

/* ============================================================
   HELPER: Get unit price for a given quantity
   ============================================================ */
function getUnitPrice(productKey, quantity) {
  const product = pricing[productKey];
  for (let tier of product.tiers) {
    if (quantity >= tier.min && quantity <= tier.max) {
      return tier.price;
    }
  }
  return product.tiers[0].price;
}

/* ============================================================
   HELPER: Get current quantity (dropdown or custom input)
   ============================================================ */
function getCurrentQuantity(productKey) {
  const select = document.querySelector(`.qty-select[data-product="${productKey}"]`);
  if (select.value === 'custom') {
    const customInput = document.querySelector(`.custom-qty[data-product="${productKey}"]`);
    return parseInt(customInput.value) || 0;
  }
  return parseInt(select.value);
}

/* ============================================================
   HELPER: Update price display on card
   ============================================================ */
function updatePriceDisplay(productKey, quantity) {
  if (!quantity || quantity < pricing[productKey].moq) {
    document.getElementById(`price-${productKey}`).textContent = '—';
    document.getElementById(`unit-${productKey}`).textContent = 'Enter valid quantity';
    return;
  }
  const unitPrice = getUnitPrice(productKey, quantity);
  const totalPrice = quantity * unitPrice;
  document.getElementById(`price-${productKey}`).textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
  document.getElementById(`unit-${productKey}`).textContent = `(₹${unitPrice}/pc)`;
}

/* ============================================================
   HANDLER: Dropdown change
   ============================================================ */
function onQuantityChange(selectElement) {
  const productKey = selectElement.dataset.product;
  const customInput = document.querySelector(`.custom-qty[data-product="${productKey}"]`);
  const errorEl = document.getElementById(`error-${productKey}`);
  
  if (selectElement.value === 'custom') {
    customInput.classList.add('show');
    customInput.focus();
    errorEl.classList.remove('show');
    document.getElementById(`price-${productKey}`).textContent = '—';
    document.getElementById(`unit-${productKey}`).textContent = `Min ${pricing[productKey].moq} pcs`;
  } else {
    customInput.classList.remove('show');
    customInput.value = '';
    errorEl.classList.remove('show');
    const quantity = parseInt(selectElement.value);
    updatePriceDisplay(productKey, quantity);
  }
}

/* ============================================================
   HANDLER: Custom quantity input
   ============================================================ */
function onCustomQtyInput(inputElement) {
  const productKey = inputElement.dataset.product;
  const moq = pricing[productKey].moq;
  const errorEl = document.getElementById(`error-${productKey}`);
  const quantity = parseInt(inputElement.value);
  
  if (!quantity || quantity < moq) {
    errorEl.classList.add('show');
    errorEl.textContent = `Minimum quantity is ${moq} pcs`;
    document.getElementById(`price-${productKey}`).textContent = '—';
    document.getElementById(`unit-${productKey}`).textContent = `Min ${moq} pcs`;
  } else {
    errorEl.classList.remove('show');
    updatePriceDisplay(productKey, quantity);
  }
}

/* ============================================================
   ACTION: Product enquiry → WhatsApp
   ============================================================ */
function enquireProduct(productKey) {
  const quantity = getCurrentQuantity(productKey);
  const moq = pricing[productKey].moq;
  
  if (!quantity || quantity < moq) {
    alert(`Please enter a valid quantity (minimum ${moq} pcs) for ${pricing[productKey].name}.`);
    return;
  }
  
  const product = pricing[productKey];
  const unitPrice = getUnitPrice(productKey, quantity);
  const totalPrice = quantity * unitPrice;
  
  const message = `Hello A&N VIBE!\n\nI would like to enquire about:\n*Product:* ${product.name}\n*Quantity:* ${quantity} pcs\n*Unit Price:* ₹${unitPrice}/pc\n*Total Price:* ₹${totalPrice.toLocaleString('en-IN')}\n\nPlease share more details regarding customization, delivery, and payment.\n\nThank you.`;
  
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodedMessage}`, '_blank');
}

/* ============================================================
   ACTION: Contact form → WhatsApp
   ============================================================ */
function sendToWhatsApp(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const product = document.getElementById('productSelect').value;
  const message = document.getElementById('message').value.trim();
  
  if (!name || !phone || !message) {
    alert('Please fill in all required fields.');
    return;
  }
  
  const waMessage = `Hello A&N VIBE!\n\n*New Enquiry*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Product:* ${product}\n*Message:* ${message}\n\nPlease get back to me.`;
  
  const encodedMessage = encodeURIComponent(waMessage);
  window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodedMessage}`, '_blank');
}

/* ============================================================
   INIT: Smooth scroll + setup on page load
   ============================================================ */
document.addEventListener('DOMContentLoaded', function() {
  
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelector('.nav-links').classList.remove('show');
      }
    });
  });
  
  // Initialize prices for all products
  document.querySelectorAll('.qty-select').forEach(select => {
    const productKey = select.dataset.product;
    const quantity = parseInt(select.value);
    updatePriceDisplay(productKey, quantity);
  });
  
});