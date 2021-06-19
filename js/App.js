document.addEventListener("DOMContentLoaded", () => {
    
    // title screen trigger
    document.querySelector('#begin-btn').addEventListener('click', () => {
        let title = document.querySelector('#title-screen')
        title.style.opacity = '0%';
        setTimeout(() => {
            title.style.display = 'none';
        }, 1000);
    });

    // menu display
    let menuOn = false
    document.querySelector('#menu-btn').addEventListener('click', () => {
        let menu = document.querySelector('#menu')
        if (menuOn) {
            menu.classList.remove('fadeIn');
            menu.classList.add('fadeOut');
            setTimeout(() => {
                menu.style.display = 'none';
            }, 1000);
            menuOn = false;
        } else {
            menu.style.display = 'flex';
            menu.classList.remove('fadeOut');
            menu.classList.add('fadeIn');
            menuOn = true;
        }
    });

    // close speech box
    document.querySelector('#ok-btn').addEventListener('click', () => {
        let speechBox = document.querySelector('#speech-container')
        speechBox.classList.remove('fadeIn')
        speechBox.classList.add('fadeOut')
    });


});