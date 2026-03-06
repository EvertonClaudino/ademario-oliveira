/* ═══════════════════════════════════════════════════════
   ADEMARIO OLIVEIRA — CONSTRUÇÃO CIVIL
   script.js
═══════════════════════════════════════════════════════ */

// ─── NAV SCROLL ───────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── REVEAL ON SCROLL ─────────────────────────────────
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

// ─── COUNTER ANIMATION ────────────────────────────────
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
    };
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.count-num[data-target]').forEach(animateCounter);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('#stats, #hero').forEach(s => counterObserver.observe(s));

// ─── SMOOTH SCROLL ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

// ─── HERO REVEAL ON LOAD ──────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('#hero .reveal, #hero .reveal-right').forEach(el => el.classList.add('visible'));
    }, 120);
});

// ─── STEP STAGGER ANIMATION ───────────────────────────
const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.step-item').forEach((step, i) => {
                setTimeout(() => {
                    step.style.opacity = '1';
                    step.style.transform = 'translateX(0)';
                }, i * 100);
            });
            stepObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.steps-list').forEach(list => {
    list.querySelectorAll('.step-item').forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(20px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    stepObserver.observe(list);
});