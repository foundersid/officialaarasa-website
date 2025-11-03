// Remove preload class after page loads
window.addEventListener('load', () => {
  document.body.classList.remove('preload');
});

// Add preload class initially
document.body.classList.add('preload');

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      
      // Update icon
      const icon = mobileMenuBtn.querySelector('svg path');
      if (mobileMenu.classList.contains('hidden')) {
        icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      } else {
        icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
      }
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('svg path');
        icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      });
    });
  }
  
  // Floating menu functionality
  const floatingMenuBtn = document.getElementById('floating-menu-btn');
  const floatingMenuPanel = document.getElementById('floating-menu-panel');
  const floatingMenuOverlay = document.getElementById('floating-menu-overlay');
  const closeFloatingMenu = document.getElementById('close-floating-menu');
  
  const openFloatingMenu = () => {
    floatingMenuPanel.classList.remove('translate-x-full');
    floatingMenuOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };
  
  const closeFloatingMenuFunc = () => {
    floatingMenuPanel.classList.add('translate-x-full');
    floatingMenuOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  };
  
  if (floatingMenuBtn) {
    floatingMenuBtn.addEventListener('click', openFloatingMenu);
  }
  
  if (closeFloatingMenu) {
    closeFloatingMenu.addEventListener('click', closeFloatingMenuFunc);
  }
  
  if (floatingMenuOverlay) {
    floatingMenuOverlay.addEventListener('click', closeFloatingMenuFunc);
  }
  
  // Close floating menu when clicking on a link
  const floatingMenuLinks = document.querySelectorAll('.floating-menu-link');
  floatingMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeFloatingMenuFunc();
    });
  });
  
 // Scroll to top button functionality by Gemini
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      // Show button after scrolling 300px down
      if (window.pageYOffset > 300) { 
        scrollToTopBtn.classList.remove('hidden');
      } else {
        scrollToTopBtn.classList.add('hidden');
      }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Active navigation highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  const highlightNav = () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', highlightNav);
  highlightNav();
});

// Simple FAQ Accordion - No Auto Padding, No Glitches
document.addEventListener('DOMContentLoaded', () => {
  const faqButtons = document.querySelectorAll('.faq-btn');
  
  faqButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const answer = document.getElementById(targetId);
      const isActive = answer.classList.contains('active');
      
      // Close all other FAQs
      document.querySelectorAll('.faq-answer').forEach(item => {
        item.classList.remove('active');
      });
      
      document.querySelectorAll('.faq-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Toggle current FAQ
      if (!isActive) {
        answer.classList.add('active');
        this.classList.add('active');
      }
    });
  });
  
  // Scroll reveal animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-reveal');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add hover effect to cards
  const cards = document.querySelectorAll('[class*="shadow"]');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Parallax effect for hero image
  const heroImage = document.querySelector('section img[alt*="Carob Powder"]');
  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      if (heroImage.parentElement) {
        heroImage.parentElement.style.transform = `translateY(${rate}px)`;
      }
    });
  }
  
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Counter animation for nutrition facts
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 20);
  };
  
  // Observe nutrition stats
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statElement = entry.target.querySelector('p[class*="text-3xl"]');
        if (statElement) {
          const value = parseFloat(statElement.textContent);
          if (!isNaN(value)) {
            animateCounter(statElement, value);
          }
        }
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const statCards = document.querySelectorAll('[class*="border-green-700"][class*="border-2"]');
  statCards.forEach(card => {
    statsObserver.observe(card);
  });
});

// Add stagger animation to grid items
const addStaggerAnimation = () => {
  const grids = document.querySelectorAll('[class*="grid"]');
  grids.forEach(grid => {
    const items = grid.children;
    Array.from(items).forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
    });
  });
};

// Initialize stagger animations
window.addEventListener('load', addStaggerAnimation);

// NEW: PDF Lab Report Modal
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-lab-report');
  const closeBtn = document.getElementById('close-lab-report');
  const modal = document.getElementById('pdf-modal');

  if (openBtn && closeBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    // Also close if clicking on the background overlay
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('testimonial-carousel');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');

    if (carousel && prevButton && nextButton) {
        const scrollDistance = 320; // Adjust this value to match one card width + margin

        nextButton.addEventListener('click', () => {
            carousel.scrollBy({
                left: scrollDistance,
                behavior: 'smooth'
            });
        });

        prevButton.addEventListener('click', () => {
            carousel.scrollBy({
                left: -scrollDistance,
                behavior: 'smooth'
            });
        });
    }

    // Hide scrollbar on the carousel element for cleaner look
    if (carousel) {
        carousel.style.scrollbarWidth = 'none'; // Firefox
        carousel.style.msOverflowStyle = 'none'; // IE and Edge
        carousel.insertAdjacentHTML('afterbegin', '<style>:::-webkit-scrollbar{display:none}</style>'); // WebKit (Chrome, Safari)
    }
});


// Promotion Bar Close Button
document.addEventListener('DOMContentLoaded', () => {
  const promoBar = document.getElementById('promo-bar');
  const closePromoBtn = document.getElementById('close-promo-btn');

  if (promoBar && closePromoBtn) {
    closePromoBtn.addEventListener('click', () => {
      promoBar.style.display = 'none';
    });
  }
});
