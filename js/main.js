// Jquery
$(document).ready(() => {
    // Dropdown menu
    const dropdownToggle = $(".dropdown-toggle"),
        dropdownMenu = $(".dropdown-menu");

    // When hovered on the menu displays
    dropdownToggle.hover(() => {
        dropdownMenu.toggle(200);
    });

    // Mobile nav
    const mobileMenuOpen = $(".mobile-menu-open"),
        mobileMenuClose = $(".mobile-menu-close"),
        contactLink = $(".contact-link"),
        mobileMenu = $(".mobile-menu");

    // Displays the mobile menu when clicked on
    mobileMenuOpen.click(() => {
        mobileMenu.toggle().css({ display: "block" });
    });

    // Exits the mobile menu
    contactLink.click(() => {
        mobileMenu.toggle().css({ display: "none" });
    });

    mobileMenuClose.click(() => {
        mobileMenu.toggle().css({ display: "none" });
    });
});

// Prevent scrolling
// Reference - https://alvarotrigo.com/blog/prevent-scroll-on-scrollable-element-js/

// This prevents the ability for users to scroll when the mobile menu is displayed
let scroll1 = document.querySelector(".scrollable");

scroll1.addEventListener("wheel", (e) => {
    e.preventDefault();
    e.stopPropagation();
});

// liking an article
document.querySelector("body").addEventListener("click", function (e) {
    const target = e.target;

    // If the class of the element click on is heart-icon then the outline of the svg is changed
    if (target.matches(".heart-icon")) {
        target.classList.toggle("filter-red");
    }
});
