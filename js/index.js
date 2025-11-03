// Fonction originale pour l'accordéon
function toggleProject(header) {
    const accordion = header.parentElement;
    const content = accordion.querySelector('.project-content');
    const isActive = accordion.classList.contains('active');
    
    document.querySelectorAll('.project-accordion.active').forEach(acc => {
        if (acc !== accordion) {
            acc.classList.remove('active');
            const otherContent = acc.querySelector('.project-content');
            otherContent.style.maxHeight = '0';
        }
    });
    
    if (isActive) {
        accordion.classList.remove('active');
        content.style.maxHeight = '0';
    } else {
        accordion.classList.add('active');
        const realHeight = content.scrollHeight;
        content.style.maxHeight = realHeight + 'px';
        
        const progressFills = accordion.querySelectorAll('.progress-fill');
        const progressPercentages = accordion.querySelectorAll('.progress-percentage');
        
        setTimeout(() => {
            progressFills.forEach((progressFill, index) => {
                const targetProgress = parseInt(progressFill.dataset.progress);
                progressFill.style.width = targetProgress + '%';
                animatePercentage(progressPercentages[index], targetProgress);
            });
        }, 300);
    }
}

// Fonction originale pour animer le pourcentage
function animatePercentage(element, target) {
    let current = 0;
    const duration = 2000;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const stepIncrement = target / totalSteps;
    
    const timer = setInterval(() => {
        current += stepIncrement;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + '%';
    }, stepTime);
}

// Écouteur d'événement 'load' original
window.addEventListener('load', () => {
    const accordions = document.querySelectorAll('.project-accordion');
    accordions.forEach(accordion => {
        accordion.style.animationPlayState = 'running';
    });
});

// Options IntersectionObserver originales
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

// Écouteur d'événement DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Code original d'observation
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