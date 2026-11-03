/**
 * Navigation Module
 * Controls sticky navbar, mobile menu drawer, smooth scrolling, and active section highlights
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // 1. Sticky Navbar on Scroll
    function handleScroll() {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. Mobile Menu Toggle
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('open');
        if (isOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });

      // Close menu when clicking any nav link
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          closeMobileMenu();
        });
      });

      // Close menu on Escape key press
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
          closeMobileMenu();
        }
      });
    }

    function openMobileMenu() {
      navMenu.classList.add('open');
      mobileToggle.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // prevent background scrolling
    }

    function closeMobileMenu() {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    // 3. Smooth Scrolling with Header Offset Compensation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = navbar ? navbar.offsetHeight + 10 : 70;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // 4. Active Section Highlighting using IntersectionObserver
    if ('IntersectionObserver' in window && sections.length > 0) {
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      };

      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, observerOptions);

      sections.forEach(section => sectionObserver.observe(section));
    }
  });
})();
