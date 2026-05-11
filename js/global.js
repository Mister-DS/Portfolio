(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light-mode');
})();

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });


  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.toggle('light-mode');
      localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });
  }


  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = (i * 0.08) + 's';
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


  document.querySelectorAll('.skill-fill').forEach(bar => {
    const target = bar.dataset.width;
    if (target) {
      setTimeout(() => { bar.style.width = target; }, 100);
    }
  });


  document.querySelectorAll('.progress-fill').forEach(bar => {
    const p = bar.dataset.progress;
    setTimeout(() => { bar.style.width = p + '%'; }, 300);
  });

 
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && lightboxImage && lightboxCaption && lightboxClose) {
    const openLightbox = (img) => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt || '';
      lightboxCaption.textContent = img.alt || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImage.src = '';
      lightboxCaption.textContent = '';
      document.body.style.overflow = '';
    };

    document.querySelectorAll('main .section img').forEach(img => {
      img.addEventListener('click', () => openLightbox(img));
    });

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    lightboxClose.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }


  const carouselTrack = document.querySelector('.carousel-track');
  const carouselWrapper = document.querySelector('.carousel-track-wrapper');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const carouselBtnPrev = document.querySelector('.carousel-btn-prev');
  const carouselBtnNext = document.querySelector('.carousel-btn-next');
  const carouselDots = document.querySelectorAll('.carousel-dot');

  if (carouselTrack && carouselItems.length > 0) {
    let currentSlide = 0;

    const updateCarousel = () => {
      const activeItem = carouselItems[currentSlide];
      if (!activeItem) return;
      const wrapperWidth = carouselWrapper.clientWidth;
      const itemWidth = activeItem.clientWidth;
      const offsetLeft = activeItem.offsetLeft;
      const offset = Math.max(0, offsetLeft - Math.round((wrapperWidth - itemWidth) / 2));
      carouselTrack.style.transform = `translateX(-${offset}px)`;

      carouselDots.forEach((dot, i) => {
        if (i === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });

      carouselBtnPrev.disabled = currentSlide === 0;
      carouselBtnNext.disabled = currentSlide === carouselItems.length - 1;
    };

    carouselBtnPrev.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
      }
    });

    carouselBtnNext.addEventListener('click', () => {
      if (currentSlide < carouselItems.length - 1) {
        currentSlide++;
        updateCarousel();
      }
    });

    carouselDots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        currentSlide = parseInt(e.currentTarget.dataset.slide, 10);
        updateCarousel();
      });
    });

    updateCarousel();
    window.addEventListener('resize', () => {
      clearTimeout(window._carouselResizeTimeout);
      window._carouselResizeTimeout = setTimeout(updateCarousel, 120);
    });
  }
});

