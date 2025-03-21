const navTogglerBtn = document.querySelector('.nav-toggler button');
const headerNav = document.querySelector('.header__nav');

navTogglerBtn.addEventListener('click', ({ target }) => {
    const isMenuOpen = navTogglerBtn.getAttribute('aria-expanded') === 'true'
        ? 'false'
        : 'true';        
    const navVisibility = headerNav.getAttribute('data-visibility');
    
    navTogglerBtn.setAttribute('aria-expanded', isMenuOpen)
    
    if (navVisibility === 'hidden') {
        headerNav.setAttribute('data-visibility', 'visible');
        headerNav.classList.add('header__nav--open');
    } else {
        headerNav.classList.remove('header__nav--open');
        
        // wait for transition finish
        headerNav.addEventListener('transitionend', () => {
            headerNav.setAttribute('data-visibility', 'hidden');
        }, { once: true });
    }

    // avoid body scrolling
    if (document.body.style.position === 'fixed') {
        document.body.style = null;
    } else {
        document.body.style.position = 'fixed';
        document.body.style.inset = '0';
    }
});
