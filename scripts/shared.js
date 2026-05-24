// shared utility functions for GSAP and generic UI simulations

// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Utility to stagger page entry elements
const staggerPageIn = (selector = '.stagger-in') => {
    if (typeof gsap === 'undefined') return;
    gsap.from(selector, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
    });
};

// UI Component: Expand Step Panel
const activateStep = (panelSelector, index) => {
    const panels = document.querySelectorAll(panelSelector);
    if (!panels.length) return;
    
    // reset all
    panels.forEach(p => p.classList.remove('active'));
    
    // set active
    const target = panels[index];
    if (target) {
        target.classList.add('active');
        // trigger specific entry animation for the content
        gsap.fromTo(target.querySelector('.step-content > *'), 
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", delay: 0.3 }
        );
    }
};

// UI Component: Animate Progress Bar
const animateProgress = (barSelector, targetPercent, duration = 1.5, onComplete) => {
    const bar = document.querySelector(barSelector);
    if (!bar) return;
    
    gsap.to(bar, {
        width: `${targetPercent}%`,
        duration: duration,
        ease: "power2.inOut",
        onComplete: onComplete
    });
};

// UI Component: Status Badge Pop
const popBadge = (badgeSelector) => {
    const badge = document.querySelector(badgeSelector);
    if (!badge) return;
    
    gsap.fromTo(badge, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
};

// UI Component: Modal toggle
const toggleModal = (modalId, show) => {
    const overlay = document.getElementById(modalId);
    if (!overlay) return;

    if (show) {
        gsap.set(overlay, { clearProps: "opacity" });
        overlay.classList.add('active');
        gsap.fromTo(overlay.querySelector('.modal-content'),
            { scale: 0.9, y: 20 },
            { scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
        );
    } else {
        gsap.to(overlay.querySelector('.modal-content'), {
            scale: 0.9, y: 20, duration: 0.3, ease: "power2.in"
        });
        gsap.to(overlay, { 
            opacity: 0, duration: 0.3, 
            onComplete: () => overlay.classList.remove('active') 
        });
    }
};

// Simulated Typewriter effect
const typeWriter = (elementSelector, text, speed = 30) => {
    const el = document.querySelector(elementSelector);
    if (!el) return;
    el.innerHTML = '';
    let i = 0;
    
    const type = () => {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

window.FaiRe = {
    staggerPageIn,
    activateStep,
    animateProgress,
    popBadge,
    toggleModal,
    typeWriter
};
