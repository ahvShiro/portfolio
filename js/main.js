import { setupHamburgerMenu } from "./hamburger.js";
import { getLastFmData } from "./api.js";


document.addEventListener("DOMContentLoaded", () => {

    const hamburgerButton = document.querySelector('.hamburger-button');
    const nav = document.querySelector('header nav');
    const tabletMediaQuery = window.matchMedia('(max-width: 880px)');

    setupHamburgerMenu(hamburgerButton, nav, tabletMediaQuery);

    getLastFmData();
});
