/* ═══════════════════════════════════════
   On Point — Main JS
   Dark Grid Editorial
   ═══════════════════════════════════════ */

// --- Loader ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => loader.classList.add('hidden'), 1800);
        setTimeout(() => loader.style.display = 'none', 2400);
        // Trigger nav logo glow after loader clears
        setTimeout(() => {
            const navLogo = document.querySelector('.nav__logo-icon');
            if (navLogo) navLogo.style.opacity = '1';
        }, 1300);
    }
});

// --- Mobile Menu ---
const navMenu = document.getElementById('nav-menu');
const mobileMenu = document.getElementById('mobile-menu');

const mobileClose = document.getElementById('mobile-menu-close');
if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navMenu.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    });
}
if (navMenu && mobileMenu) {
    navMenu.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        navMenu.setAttribute('aria-expanded', isOpen);
        mobileMenu.setAttribute('aria-hidden', !isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            navMenu.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    });
}

// --- Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// --- Reveal on Scroll ---
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// --- Accordion ---
document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion__item');
        const content = item.querySelector('.accordion__content');
        const isOpen = item.classList.contains('open');

        // Close siblings
        item.closest('.accordion').querySelectorAll('.accordion__item').forEach(sib => {
            sib.classList.remove('open');
            sib.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
            sib.querySelector('.accordion__content').style.maxHeight = '0';
        });

        if (!isOpen) {
            item.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});

// --- Area Toggles ---
document.querySelectorAll('.areas__toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const more = btn.closest('.areas__more');
        const expanded = more.getAttribute('aria-expanded') === 'true';
        more.setAttribute('aria-expanded', !expanded);
        btn.textContent = expanded ? btn.dataset.moreText || '+ more cities' : '− fewer cities';
    });
});

// Store original text
document.querySelectorAll('.areas__toggle').forEach(btn => {
    btn.dataset.moreText = btn.textContent;
});

// --- Floating Cards Parallax ---
let ticking = false;
// Nav scroll effect
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            document.querySelectorAll('.float-card').forEach((card, i) => {
                const speed = 0.03 + (i * 0.01);
                const y = scrollY * speed;
                const baseRotation = parseFloat(getComputedStyle(card).transform !== 'none' ? 0 : 0);
                card.style.transform = `translateY(${-y}px) rotate(${card.classList.contains('float-card--1') ? -12 : card.classList.contains('float-card--2') ? 15 : card.classList.contains('float-card--3') ? 8 : -10}deg)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});



// --- Staggered Reveal for Hero Children ---
// Add delay attributes to hero children that have .reveal but no data-delay
const heroReveals = document.querySelectorAll('.hero .reveal:not([data-delay])');
heroReveals.forEach((el, i) => {
    el.setAttribute('data-delay', i + 1);
});

// --- Line Draw on Scroll ---
const lineDrawEls = document.querySelectorAll('.line-draw');
const lineDrawObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('drawn');
            lineDrawObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

lineDrawEls.forEach(el => lineDrawObserver.observe(el));

// --- Contact Form ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        const formData = new FormData(contactForm);
        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(res => {
            if (res.ok) {
                btn.innerHTML = '<span>Message Sent ✓</span>';
                btn.style.background = '#4ecdc4';
                contactForm.reset();
            } else {
                btn.innerHTML = '<span>Error — Try Again</span>';
                btn.style.background = '#ff6b6b';
            }
        }).catch(() => {
            btn.innerHTML = '<span>Error — Try Again</span>';
            btn.style.background = '#ff6b6b';
        }).finally(() => {
            btn.disabled = false;
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
            }, 3000);
        });
    });
}

// --- Nav Chat Toggle ---
document.querySelectorAll('.nav__chat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const widget = document.getElementById('chat-widget');
        if (widget) {
            widget.classList.toggle('chat-widget--open');
        }
    });
});
