let isMenuOpen = false;
let activeLink = null;
let notificationTimeoutId = null;
let isDarkMode = false;
const navbarContainer = document.querySelector(".navbar-container");
const hamburger = document.querySelector(".hamburger");
const navLinksList = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links a");
const notificationEl = document.getElementById("notification");
const themeToggleBtn = document.querySelector(".theme-toggle");

hamburger.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        navLinksList.classList.add("open");
        hamburger.classList.add("open");
        hamburger.setAttribute("aria-expanded", "true");
    } else {
        navLinksList.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
    }

    console.log("Hamburger clicked. isMenuOpen =", isMenuOpen);
});

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
         // PART 4: PREVENT DEFAULT BEHAVIOR
        /*
           What happens without preventDefault()?
            --------------------------------------
            - These elements are normal <a> tags with an href (e.g. "#home").
            - If we do NOT call event.preventDefault(), the browser will perform
              its default action for a link:
                • It will navigate to the value of href.
                • For a full URL, that means a full page load / reload.
                • For a hash like "#home", the page will jump/scroll to that
                  element and may also add an entry to the browser history.
            - In both cases, the browser is in control of navigation instead
              of our JavaScript.

             Why is it needed in single-page applications?
            ------------------------------------------------------------------
            - In an SPA, we do NOT want the browser to reload or navigate
              in the default way when links are clicked.
            - Instead, the JavaScript code:
                • Updates the visible content,
                • Manages application state (which page is "active"),
                • Shows loading messages, animations, etc.
            - If we allowed the default behavior, the page would reload or
              jump away, our JS state would be lost or interrupted, and the
              app would not behave like a smooth single-page experience.
            - So we call event.preventDefault() to cancel the browser's
              default navigation and keep full control in JavaScript.
        */
        event.preventDefault();
        if (activeLink) {
            activeLink.classList.remove("active");
        }
        activeLink = event.currentTarget; 
        activeLink.classList.add("active");
        const pageName = event.currentTarget.dataset.page;
        if (notificationTimeoutId !== null) {
            clearTimeout(notificationTimeoutId);
        }

        notificationEl.textContent = `Loading ${pageName} page...`;
        notificationTimeoutId = setTimeout(() => {
            notificationEl.textContent = `${pageName} page loaded!`;
        }, 2000);

        if (isMenuOpen) {
            isMenuOpen = false;
            navLinksList.classList.remove("open");
            hamburger.classList.remove("open");
            hamburger.setAttribute("aria-expanded", "false");
        }
        console.log("Nav link clicked:", pageName);
    });
});

navbarContainer.addEventListener("click", () => {
    console.log("Navbar container clicked (bubbled event).");
});

themeToggleBtn.addEventListener("click", () => {
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
        document.body.classList.add("dark");
        themeToggleBtn.textContent = "Light mode";
    } else {
        document.body.classList.remove("dark");
        themeToggleBtn.textContent = "Dark mode";
    }

    console.log("Dark mode:", isDarkMode);
});

if (navLinks.length > 0) {
    activeLink = navLinks[0];
    activeLink.classList.add("active");
}