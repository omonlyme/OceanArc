// Mobile Navigation
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', () => {
    if (mainNav.classList.contains('active')) {
      mainNav.classList.remove('active');
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Slider Functionality
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');

let currentSlide = 0;
const slideCount = slides.length;

// Create dots
for (let i = 0; i < slideCount; i++) {
  const dot = document.createElement('div');
  dot.classList.add('slider-dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  sliderDots.appendChild(dot);
}

const dots = document.querySelectorAll('.slider-dot');

function updateSlider() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function goToSlide(slideIndex) {
  currentSlide = (slideIndex + slideCount) % slideCount;
  updateSlider();
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

// Button events
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto slide
let slideInterval = setInterval(nextSlide, 5000);

// Pause on hover
const hero = document.querySelector('.hero');
hero.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

hero.addEventListener('mouseleave', () => {
  slideInterval = setInterval(nextSlide, 5000);
});

// Touch events for mobile
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  clearInterval(slideInterval);
}, { passive: true });

slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
  slideInterval = setInterval(nextSlide, 5000);
}, { passive: true });

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    nextSlide();
  }
  if (touchEndX > touchStartX + 50) {
    prevSlide();
  }
}

// Sticky header on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});

// Load blog preview
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('https://your-infinityfree-domain.epizy.com/api/posts?limit=3');
    const posts = await response.json();
    
    const blogGrid = document.getElementById('blogPosts');
    if (blogGrid) {
      blogGrid.innerHTML = posts.map(post => `
        <div class="blog-post">
          <img src="${post.image}" alt="${post.title}">
          <div class="blog-content">
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <a href="blog-single.html?id=${post.id}" class="learn-more">Read more <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
});