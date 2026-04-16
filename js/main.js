import { setupHamburgerMenu } from "./hamburger.js";
import { getLastFmData } from "./api.js";
import { initTheme, switchTheme } from "./theme.js";

document.addEventListener("DOMContentLoaded", () => {

    const hamburgerButton = document.querySelector('.hamburger-button');
    const nav = document.querySelector('header nav');
    const tabletMediaQuery = window.matchMedia('(max-width: 880px)');
    const themeChanger = document.querySelector('#themeChanger');

    setupHamburgerMenu(hamburgerButton, nav, tabletMediaQuery);
    getLastFmData();
    initTheme();
    themeChanger.onclick = switchTheme;

});
