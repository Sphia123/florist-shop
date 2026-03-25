

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  const buttons = document.querySelectorAll('[data-add-cart]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = {
        name: btn.dataset.name,
        price: btn.dataset.price,
        image: btn.dataset.image
      };
      addToCart(item);
    });
  });

  if (document.getElementById('cart-items')) {
    renderCart();
  }
});

/**
 * 
 * @param {Object} item - 
 */
function addToCart(item) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${item.name} Товар добавлен в корзину`);
}


function updateCartCount() {
  const countEls = document.querySelectorAll('.cart-count');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  countEls.forEach(el => {
    el.textContent = cart.length;
  });
}


function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const list = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  list.innerHTML = '';
  let total = 0;
  if (cart.length === 0) {
    list.innerHTML = '<p>Твоя корзина пуста. Перейди в <a href="catalog.html">каталог</a>, чтобы добавить красивые букеты.</p>';
    totalEl.textContent = '0';
    return;
  }
  cart.forEach((item, idx) => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = item.name;
    const priceCell = document.createElement('td');
    priceCell.textContent = `€${parseFloat(item.price).toFixed(2)}`;
    total += parseFloat(item.price);
    const removeCell = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Удалить';
    removeBtn.addEventListener('click', () => removeFromCart(idx));
    removeCell.appendChild(removeBtn);
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(removeCell);
    list.appendChild(row);
  });
  totalEl.textContent = total.toFixed(2);
}

/**
 * 
 * @param {number} index - 
 */
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}