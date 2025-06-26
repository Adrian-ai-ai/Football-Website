
 //AUTOMATIC HOME IMAGE SLIDE
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

  // MANUAL IMG SLIDE
  // const cTrackCont = document.querySelector('.carousel-track-container');
  // const track = document.querySelector('.carousel-track');
  // const cSlides = Array.from(track.children);
  // const nextButton = document.querySelector('.next');
  // const prevButton = document.querySelector('.prev');

  // let slideWidth = cSlides[0].getBoundingClientRect().width;
  // let currentSlide = 0;
  // let startX = 0;
  // let autoplayInterval = null;

  // function updateSlideWidth() {
  //   slideWidth = cSlides[0].getBoundingClientRect().width;
  // }

  // function updateTrackPosition() {
  //   const visibleSlides = Math.round(track.offsetWidth / slideWidth);
  //   const maxSlide = cSlides.length - visibleSlides;
  //   if (currentSlide > maxSlide) currentSlide = 0;
  //   track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
  // }

  // nextButton.addEventListener('click', () => {
  //   currentSlide++;
  //   updateTrackPosition();
  // });

  // prevButton.addEventListener('click', () => {
  //   currentSlide = Math.max(currentSlide - 1, 0);
  //   updateTrackPosition();
  // });

  // function startAutoplay() {
  //   autoplayInterval = setInterval(() => {
  //     currentSlide++;
  //     updateTrackPosition();
  //   }, 6000);
  // }

  // function stopAutoplay() {
  //   clearInterval(autoplayInterval);
  // }

  // window.addEventListener('resize', () => {
  //   updateSlideWidth();
  //   updateTrackPosition();
  // });
  // //TOUCH EVENTS
  // cTrackCont.addEventListener('touchstart', e =>{
  //   startX = e.touches[0].clientX;
  //   }
  // )
  // cTrackCont.addEventListener('touchend', e =>{
  //   let endX = e.changedTouches[0].clientX;
  //   let diff = startX - endX;

  //   if (diff > 50 && index < totalSlides - 1)index++;
  //   if(diff < -50 && index > 0) indexx--;

  //   track.style.transform = `translateX(-${index * 100}%)`;
    
  //   }
  // )

  // // Pause on hover
  // document.querySelector('.carousel').addEventListener('mouseenter', stopAutoplay);
  // document.querySelector('.carousel').addEventListener('mouseleave', startAutoplay);

  // // Initial setup
  // updateSlideWidth();
  // updateTrackPosition();
  // startAutoplay();

const track = document.querySelector('.carousel-track');
let tslides = Array.from(track.children);
const visibleSlides = 3; // Still 3 visible at once
const totalSlides = tslides.length;

// Clone necessary slides (1 from start and end for looping one-by-one)
track.appendChild(tslides[0].cloneNode(true));
track.insertBefore(tslides[tslides.length - 1].cloneNode(true), tslides[0]);

tslides = Array.from(track.children); // update slide list with clones
let index = 1; // start at first real slide (after prepended clone)

let slideWidth = tslides[0].getBoundingClientRect().width;
track.style.transform = `translateX(-${index * slideWidth}px)`;

// Responsive fix
window.addEventListener('resize', () => {
  slideWidth = tslides[0].getBoundingClientRect().width;
  track.style.transition = 'none';
  track.style.transform = `translateX(-${index * slideWidth}px)`;
});

// Move to current index
function moveToIndex() {
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}

// Loop fix
track.addEventListener('transitionend', () => {
  if (index === tslides.length - 1) {
    index = 1;
    track.style.transition = 'none';
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }
  if (index === 0) {
    index = tslides.length - 2;
    track.style.transition = 'none';
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }
});

// Navigation buttons
document.querySelector('.next').addEventListener('click', () => {
  index++;
  moveToIndex();
});

document.querySelector('.prev').addEventListener('click', () => {
  index--;
  moveToIndex();
});

// Touch swipe
let startX = 0;
let endX = 0;
const container = document.querySelector('.carousel-track-container');

container.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

container.addEventListener('touchend', e => {
  endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (diff > 50) {
    index++;
    moveToIndex();
  } else if (diff < -50) {
    index--;
    moveToIndex();
  }
});