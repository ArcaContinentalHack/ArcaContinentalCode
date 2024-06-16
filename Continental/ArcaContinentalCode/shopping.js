document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const shoppingCartContainer = document.querySelector('.shopping-cart');

    cart.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.dataset.index = index;
        productElement.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <div class="product-title">${product.name}</div>
                <p class="product-description">${product.volume}</p>
            </div>
            <div class="product-price">${product.price}</div>
            <div class="product-quantity">
                <input type="number" value="1" min="1" onchange="updateQuantity(this)">
            </div>
            <div class="product-removal">
                <button class="remove-product" onclick="removeProduct(${index})">Remove</button>
            </div>
            <div class="product-line-price">${parseFloat(product.price.replace('$', ''))}</div>
        `;
        shoppingCartContainer.appendChild(productElement);
    });

    updateCartTotals();
});

function updateQuantity(input) {
    const productElement = input.closest('.product');
    const index = productElement.dataset.index;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const quantity = input.value;

    cart[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartTotals();
}

function removeProduct(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));

    location.reload();
}

function updateCartTotals() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    cart.forEach(product => {
        const price = parseFloat(product.price.replace('$', ''));
        const quantity = product.quantity || 1;
        subtotal += price * quantity;
    });

    const tax = subtotal * 0.05;
    const shipping = 15.00;
    const total = subtotal + tax + shipping;

    document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('cart-tax').textContent = tax.toFixed(2);
    document.getElementById('cart-shipping').textContent = shipping.toFixed(2);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}
