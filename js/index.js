function toggleProject(header) {
    const accordion = header.parentElement;
    const isActive = accordion.classList.contains('active');
    
    document.querySelectorAll('.project-accordion.active').forEach(acc => {
        acc.classList.remove('active');
    });
    
    if (!isActive) {
        accordion.classList.add('active');
        
        const progressFill = accordion.querySelector('.progress-fill');
        const progressPercentage = accordion.querySelector('.progress-percentage');
        const targetProgress = parseInt(progressFill.dataset.progress);
        
        setTimeout(() => {
            progressFill.style.width = targetProgress + '%';
            animatePercentage(progressPercentage, targetProgress);
        }, 300);
    }
}

function animatePercentage(element, target) {
    let current = 0;
    const increment = target / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + '%';
    }, 20);
}

window.addEventListener('load', () => {
    const accordions = document.querySelectorAll('.project-accordion');
    accordions.forEach(accordion => {
        accordion.style.animationPlayState = 'running';
    });
});

const sectionObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            sectionObserver.unobserve(entry.target);
        }
    });
}, sectionObserverOptions);

const projectObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, projectObserverOptions);

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.projects, .skills-section, footer');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    const projectAccordions = document.querySelectorAll('.project-accordion');
    projectAccordions.forEach(accordion => {
        projectObserver.observe(accordion);
    });
    
    setTimeout(() => {
        const heroSection = document.querySelector('.main-content');
        if (heroSection) {
            heroSection.classList.add('is-visible');
        }
    }, 100);
});