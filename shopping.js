document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    assignEventHandlers();
});

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.shopping-cart');
    const productTemplate = document.querySelector('.product-template').content;

    cart.forEach(item => {
        let productElement = productTemplate.cloneNode(true);
        productElement.querySelector('.product-image img').src = item.image;
        productElement.querySelector('.product-title').textContent = item.name;
        productElement.querySelector('.product-description').textContent = item.volume;
        productElement.querySelector('.product-price').textContent = item.price.toFixed(2);
        productElement.querySelector('.product-quantity input').value = item.quantity;
        productElement.querySelector('.product-line-price').textContent = (item.price * item.quantity).toFixed(2);

        productElement.querySelector('.remove-product').addEventListener('click', function() {
            removeItem(this, item.id);
        });
        productElement.querySelector('.product-quantity input').addEventListener('change', function() {
            updateQuantity(this, item.id);
        });

        cartContainer.appendChild(productElement);
    });

    recalculateCart();
}

function updateQuantity(quantityInput, productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity = parseInt(quantityInput.value);
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update line price in the UI
        const productRow = quantityInput.closest('.product');
        const linePriceElement = productRow.querySelector('.product-line-price');
        linePriceElement.textContent = (product.price * product.quantity).toFixed(2);

        // Recalculate cart totals
        recalculateCart();
    }
}

function removeItem(removeButton, productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    removeButton.closest('.product').remove();
    recalculateCart();
}

function recalculateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    let taxRate = 0.05;
    let shippingRate = 15.00;
    let tax = subtotal * taxRate;
    let shipping = (subtotal > 0 ? shippingRate : 0);
    let total = subtotal + tax + shipping;

    document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('cart-tax').textContent = tax.toFixed(2);
    document.getElementById('cart-shipping').textContent = shipping.toFixed(2);
    document.getElementById('cart-total').textContent = total.toFixed(2);

    if (total === 0) {
        document.querySelector('.checkout').style.display = 'none';
    } else {
        document.querySelector('.checkout').style.display = 'block';
    }
}

function assignEventHandlers() {
    document.querySelectorAll('.product-quantity input').forEach(input => {
        input.addEventListener('change', function() {
            const productId = this.closest('.product').dataset.id;
            updateQuantity(this, productId);
        });
    });

    document.querySelectorAll('.remove-product').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.closest('.product').dataset.id;
            removeItem(this, productId);
        });
    });
}
