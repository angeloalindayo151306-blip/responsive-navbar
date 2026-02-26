const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const links = navLinks.querySelectorAll('a');


// Click link: highlight it + close mobile menu
links.forEach(link => {
    link.addEventListener('click', () => {
        // remove active color from all links
        links.forEach(l => l.classList.remove('active-link'));
        // add active color to clicked link
        link.classList.add('active-link');

        // close mobile menu (if open)
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});