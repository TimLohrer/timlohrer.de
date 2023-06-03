const observcer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            setTimeout(() => {
                entry.target.classList.remove('hidden')
                entry.target.classList.remove('top')
                entry.target.classList.remove('bottom')
                entry.target.classList.remove('left')
                entry.target.classList.remove('right')
                entry.target.classList.remove('stack-animation')
            }, 150)
        }
    });
});

let hiddenElements = document.querySelectorAll('.hidden');
window.onload = setInterval(() => {
    hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(element => observcer.observe(element));
}, 100)