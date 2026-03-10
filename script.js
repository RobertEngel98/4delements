// ========================================
// 4D Elements – Interaktives Script
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('open');
    });
  });

  // Nav scroll effect
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Scroll animations (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    '.service-card, .advantage, .process-step, .faq-item, .section-header'
  );

  animateElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${i % 3 * 0.1}s, transform 0.6s ease ${i % 3 * 0.1}s`;
    observer.observe(el);
  });

  // Add visible class styles
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // Smooth anchor scrolling for older browsers
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Cookie Banner
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner) {
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');
    const cookieConsent = localStorage.getItem('cookie-consent');

    if (!cookieConsent) {
      setTimeout(() => {
        cookieBanner.classList.add('visible');
      }, 1000);
    }

    function hideBanner(consent) {
      localStorage.setItem('cookie-consent', consent);
      cookieBanner.classList.remove('visible');
    }

    if (cookieAccept) {
      cookieAccept.addEventListener('click', () => hideBanner('accepted'));
    }
    if (cookieReject) {
      cookieReject.addEventListener('click', () => hideBanner('rejected'));
    }
  }
});
