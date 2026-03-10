/* ═══════════════════════════════════════
   On Point — GSAP Animations
   Neobrutalist hero entrance
   ═══════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

function initAnimations() {

    // Set initial states
    gsap.set('.hero__accent--top', { opacity: 0, scale: 0.7 });
    gsap.set('.hero__text', { opacity: 0, scale: 0.3 });
    gsap.set('.hero__accent--bottom', { opacity: 0, scale: 0.7 });
    gsap.set('.hero__subtitle', { opacity: 0, y: 20 });
    gsap.set('.hero__btn', { opacity: 0, y: 20 });
    gsap.set('.hero__marquee', { opacity: 0, y: 30 });

    // Fire right as loader fades
    const loaderDelay = 2000;

    setTimeout(() => {
        const tl = gsap.timeline();

        // 1. "we're" pops in
        tl.to('.hero__accent--top', {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(3)'
        });

        // Brief pause
        tl.to({}, { duration: 0.15 });

        // 2. "ON POINT" zooms in and overshoots
        tl.to('.hero__text', {
            opacity: 1,
            scale: 1.08,
            duration: 0.25,
            ease: 'power4.out',
            stagger: 0.06
        });

        // Snap back with bounce
        tl.to('.hero__text', {
            scale: 0.97,
            duration: 0.08,
            ease: 'power1.in'
        });
        tl.to('.hero__text', {
            scale: 1.02,
            duration: 0.06,
            ease: 'power1.out'
        });
        tl.to('.hero__text', {
            scale: 1,
            duration: 0.05,
            ease: 'power1.inOut'
        });

        // 3. "nice to meet you!" pops in
        tl.to('.hero__accent--bottom', {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(3)'
        }, '-=0.1');

        // 4. Subtitle and button fade up
        tl.to('.hero__subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
        }, '-=0.15');

        tl.to('.hero__btn', {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'back.out(2)'
        }, '-=0.2');

        // 5. Marquee slides up
        tl.to('.hero__marquee', {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        }, '-=0.1');

    }, loaderDelay);

    // ─── Nav CTA pulse on scroll ───
    ScrollTrigger.create({
        trigger: '.about-intro',
        start: 'top center',
        once: true,
        onEnter: () => {
            gsap.fromTo('.nav__cta',
                { scale: 1 },
                { scale: 1.1, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.inOut' }
            );
        }
    });
}

window.addEventListener('load', () => {
    initAnimations();
});
