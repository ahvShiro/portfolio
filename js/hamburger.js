export function setupHamburgerMenu(hamburgerButton, nav, tabletMediaQuery) {
    if (hamburgerButton && nav) {
        const closeMenu = () => {
            hamburgerButton.setAttribute('aria-expanded', 'false');
            nav.classList.remove('nav-open');
        };

        const openMenu = () => {
            hamburgerButton.setAttribute('aria-expanded', 'true');
            nav.classList.add('nav-open');
        };

        hamburgerButton.addEventListener('click', () => {
            const isOpen = hamburgerButton.getAttribute('aria-expanded') === 'true';

            if (isOpen) {
                closeMenu();
                return;
            }

            openMenu();
        });

        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        document.addEventListener('click', (event) => {
            const clickedOutsideMenu = !nav.contains(event.target) && !hamburgerButton.contains(event.target);

            if (clickedOutsideMenu) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });

        tabletMediaQuery.addEventListener('change', (event) => {
            if (!event.matches) {
                closeMenu();
            }
        });

        if (!tabletMediaQuery.matches) {
            closeMenu();
        }
    }

}