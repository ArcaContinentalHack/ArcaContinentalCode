document.addEventListener('DOMContentLoaded', () => {
    const artistElements = document.querySelectorAll('.artist');
    const submitButton = document.querySelector('.submit-button');

    artistElements.forEach(artist => {
        artist.addEventListener('click', () => {
            artist.classList.toggle('selected');
            updateSubmitButton();
        });
    });

    submitButton.addEventListener('click', () => {
        const selectedArtists = document.querySelectorAll('.artist.selected').length;
        
        if (selectedArtists >= 1) {
            window.location.href = 'main.html'; // Redirigir a la nueva página
        }
    });

    function updateSubmitButton() {
        const selectedArtists = document.querySelectorAll('.artist.selected').length;
        
        if (selectedArtists >= 1) {
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
});
