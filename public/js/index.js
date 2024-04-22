setTimeout(() => {
    const buttons = document.getElementsByClassName('button');

    for (let button of buttons) {
        button.addEventListener('click', () => {
            window.open(button.getAttribute('href'), '_blank');
        });
    }
}, 0);