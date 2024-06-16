function addToCart(event, button) {
    event.stopPropagation(); // Evita que el evento de clic se propague al contenedor del producto
    const productElement = button.closest('.product');
    const product = {
        image: productElement.querySelector('img').src,
        name: productElement.querySelector('.product-name').textContent,
        price: productElement.querySelector('.product-price').textContent,
        volume: productElement.querySelector('.product-volume').textContent
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'shopping.html';
}

function toggleSelection(productElement) {
    productElement.classList.toggle('selected');
    updateSubmitButton();
}

function updateSubmitButton() {
    const selectedProducts = document.querySelectorAll('.product.selected').length;
    const submitButton = document.querySelector('.submit-button');

    if (selectedProducts >= 1) {
        submitButton.textContent = 'Continuar';
        submitButton.style.backgroundColor = '#e71d2a';
        submitButton.style.cursor = 'pointer';
        submitButton.disabled = false;
    } else {
        submitButton.textContent = 'Elige al menos 1 marca';
        submitButton.style.backgroundColor = '#ccc';
        submitButton.style.cursor = 'not-allowed';
        submitButton.disabled = true;
    }
}
