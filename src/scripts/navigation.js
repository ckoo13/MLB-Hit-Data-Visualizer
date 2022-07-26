window.addEventListener('DOMContentLoaded', e => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        console.log(anchor);
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(this);
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});