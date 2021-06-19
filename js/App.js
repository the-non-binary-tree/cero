document.addEventListener("DOMContentLoaded", () => {
    console.log('gjdl')
    document.querySelector('#begin-btn').addEventListener('click', () => {
        let title = document.querySelector('#title-screen')
        title.style.opacity = '0%';
        setTimeout(() => {
            title.style.display = 'none';
        }, 1000);
    });

});