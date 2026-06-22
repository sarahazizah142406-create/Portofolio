document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      });
    });
  }

  // Typewriter Animation
  const words = ['Software Developer', 'Tech Educator', 'Content Creator'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeTextSpan = document.getElementById('typewriter-text');

  function type() {
    if (!typeTextSpan) return;
    
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typeTextSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typeTextSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at the end of the word
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  // Start the typewriter loop
  if (typeTextSpan) {
    setTimeout(type, 1000);
  }

  // Project Filtering Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active styling from all buttons
        filterBtns.forEach(b => {
          b.classList.remove('bg-indigo-600', 'text-white');
          b.classList.add('bg-gray-800/60', 'text-gray-400', 'hover:bg-gray-800');
        });

        // Add active styling to clicked button
        btn.classList.add('bg-indigo-600', 'text-white');
        btn.classList.remove('bg-gray-800/60', 'text-gray-400', 'hover:bg-gray-800');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category').split(' ');
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Scroll Tracking & Navigation Active State
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // triggers when section is in the middle of viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
            link.classList.add('text-indigo-400');
            link.classList.remove('text-gray-300');
          } else {
            link.classList.remove('active');
            link.classList.remove('text-indigo-400');
            link.classList.add('text-gray-300');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Contact Form Submission Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Visual feedback loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin h-5 w-5 mr-3 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Sending...
      `;

      setTimeout(() => {
        // Success state
        submitBtn.innerHTML = `
          <svg class="h-5 w-5 mr-3 inline-block text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg> Sent Successfully!
        `;
        submitBtn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
        submitBtn.classList.add('bg-green-600');
        
        contactForm.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.classList.remove('bg-green-600');
          submitBtn.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
        }, 3000);
      }, 1500);
    });
  }

  // Newsletter Form Submission Handling
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      const inputField = newsletterForm.querySelector('input[type="email"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Subscribing...';

      setTimeout(() => {
        submitBtn.textContent = 'Subscribed!';
        submitBtn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
        submitBtn.classList.add('bg-green-600');
        inputField.value = '';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.classList.remove('bg-green-600');
          submitBtn.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
        }, 3000);
      }, 1200);
    });
  }
});
