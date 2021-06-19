document.addEventListener("DOMContentLoaded", () => {
    
    document.querySelector('#begin-btn').addEventListener('click', () => {
        let title = document.querySelector('#title-screen')
        title.style.opacity = '0%';
        setTimeout(() => {
            title.style.display = 'none';
        }, 1000);
    });

    document.querySelector('#ok-btn').addEventListener('click', () => {
        let speechBox = document.querySelector('#speech-container')
        speechBox.classList.remove('fadeIn')
        speechBox.classList.add('fadeOut')
    });
});