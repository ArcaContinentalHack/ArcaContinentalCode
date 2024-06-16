function addToCart(event, button) {
    event.stopPropagation(); // Evita que el evento de clic se propague al contenedor del producto
    const productElement = button.closest('.product');
    const product = {
        id: productElement.getAttribute('data-id'),
        name: productElement.querySelector('.product-name').textContent,
        price: parseFloat(productElement.querySelector('.product-price').textContent),
        volume: productElement.querySelector('.product-volume').textContent,
        image: productElement.querySelector('img').src,
        quantity: 1
    };

    // Obtener el carrito actual desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirigir a la página del carrito con el producto seleccionado
    window.location.href = 'shopping.html';
}
