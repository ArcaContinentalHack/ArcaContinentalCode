document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target');
            const data = +counter.innerText;
            const time = value / speed;
            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 1);
            } else {
                counter.innerText = value;
            }
        };
        animate();
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.hamburger-menu ion-icon');
    const mobileMenu = document.getElementById('mobileMenu');

    menuIcon.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
});
