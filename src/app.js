// Shared app.js — navigation, animations, interactions

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('menu-close');
    const overlay = document.getElementById('mobile-overlay');

    function openMenu() {
        if (mobileMenu) mobileMenu.classList.add('is-open');
        if (overlay) overlay.classList.remove('hidden');
    }
    function closeMenu() {
        if (mobileMenu) mobileMenu.classList.remove('is-open');
        if (overlay) overlay.classList.add('hidden');
    }

    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // --- Scroll Reveal ---
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        reveals.forEach(el => observer.observe(el));
    }

    // --- FAQ Accordion ---
    document.querySelectorAll('.faq-item').forEach(item => {
        const btn = item.querySelector('.faq-toggle');
        const answer = item.querySelector('.faq-answer');
        const chevron = item.querySelector('.faq-chevron');
        let isOpen = false;

        if (btn && answer) {
            btn.addEventListener('click', () => {
                isOpen = !isOpen;
                answer.classList.toggle('is-open', isOpen);
                if (chevron) chevron.classList.toggle('is-rotated', isOpen);
            });
        }
    });

    // --- Pricing Toggle ---
    const toggleMonthly = document.getElementById('toggle-monthly');
    const toggleAnnual = document.getElementById('toggle-annual');
    const savingsBadge = document.getElementById('savings-badge');
    if (toggleMonthly && toggleAnnual) {
        let isAnnual = false;
        const activeStyle = 'padding:0.5rem 1.5rem;border-radius:9999px;font-size:0.875rem;font-weight:600;color:#fff;background:linear-gradient(to right,#3b82f6,#1d4ed8);box-shadow:0 1px 3px rgba(0,0,0,0.15);transition:all 0.3s ease;cursor:pointer;';
        const inactiveStyle = 'padding:0.5rem 1.5rem;border-radius:9999px;font-size:0.875rem;font-weight:500;color:#6b7280;background:none;box-shadow:none;transition:all 0.3s ease;cursor:pointer;';

        function updatePricing() {
            const period = isAnnual ? 'annual' : 'monthly';
            const periodLabel = isAnnual ? '/yıllık (2 ay ücretsiz)' : '/aylık';
            toggleAnnual.style.cssText = isAnnual ? activeStyle : inactiveStyle;
            toggleMonthly.style.cssText = isAnnual ? inactiveStyle : activeStyle;
            if (savingsBadge) savingsBadge.style.opacity = isAnnual ? '1' : '0';
            document.querySelectorAll('.price-amount').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(4px)';
                setTimeout(() => {
                    el.textContent = el.dataset[period];
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 150);
            });
            document.querySelectorAll('.price-period').forEach(el => {
                el.textContent = periodLabel;
            });
        }

        toggleMonthly.addEventListener('click', () => { if (isAnnual) { isAnnual = false; updatePricing(); } });
        toggleAnnual.addEventListener('click', () => { if (!isAnnual) { isAnnual = true; updatePricing(); } });
        document.querySelectorAll('.price-amount').forEach(el => {
            el.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
        });
        if (savingsBadge) savingsBadge.style.transition = 'opacity 0.3s ease';
    }

    // --- Header scroll effect ---
    const header = document.querySelector('header');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const current = window.scrollY;
            if (current > 50) {
                header.classList.add('shadow-sm');
            } else {
                header.classList.remove('shadow-sm');
            }
            lastScroll = current;
        }, { passive: true });
    }

    // --- Counter Animation ---
    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.counter);
                    const suffix = el.dataset.suffix || '';
                    const duration = 2000;
                    const start = performance.now();
                    
                    function update(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                        el.textContent = Math.floor(eased * target).toLocaleString('tr-TR') + suffix;
                        if (progress < 1) requestAnimationFrame(update);
                    }
                    requestAnimationFrame(update);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(el => counterObserver.observe(el));
    }
});
