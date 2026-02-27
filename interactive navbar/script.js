const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const links = document.querySelectorAll('#nav-links a');
const sidenav = document.getElementById("mySidenav");

// Toggle sidebar
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    sidenav.classList.toggle('open');
});

// Active link + auto close
links.forEach(link => {
    link.addEventListener('click', () => {
        links.forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');

        sidenav.classList.remove('open');
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});