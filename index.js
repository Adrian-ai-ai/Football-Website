
  const slides = document.querySelectorAll('.slide');
  const flash = document.querySelector('.flash-screen');
  let current = 0;

  function showSlide(index) {
    // Flash blue screen
    flash.style.opacity = '1';
    
    setTimeout(() => {
      // Hide all slides
      slides.forEach(slide => slide.classList.remove('active'));
      // Show next slide
      slides[index].classList.add('active');
      // Hide flash screen
      flash.style.opacity = '0';
    }, 1000); // Flash duration
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }-

  // Start automatic slider
  setInterval(nextSlide, 6000); // Change slide every 4 seconds

  // CarouselSLider
  const track = document.querySelector('.carousel-track');
  const cSlides = Array.from(track.children);
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');

  let slideWidth = cSlides[0].getBoundingClientRect().width;
  let currentSlide = 0;
  let autoplayInterval = null;

  function updateSlideWidth() {
    slideWidth = cSlides[0].getBoundingClientRect().width;
  }

  function updateTrackPosition() {
    const visibleSlides = Math.round(track.offsetWidth / slideWidth);
    const maxSlide = cSlides.length - visibleSlides;
    if (currentSlide > maxSlide) currentSlide = 0;
    track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
  }

  nextButton.addEventListener('click', () => {
    currentSlide++;
    updateTrackPosition();
  });

  prevButton.addEventListener('click', () => {
    currentSlide = Math.max(currentSlide - 1, 0);
    updateTrackPosition();
  });

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      currentSlide++;
      updateTrackPosition();
    }, 6000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  window.addEventListener('resize', () => {
    updateSlideWidth();
    updateTrackPosition();
  });

  // Pause on hover
  document.querySelector('.carousel').addEventListener('mouseenter', stopAutoplay);
  document.querySelector('.carousel').addEventListener('mouseleave', startAutoplay);

  // Initial setup
  updateSlideWidth();
  updateTrackPosition();
  startAutoplay();

