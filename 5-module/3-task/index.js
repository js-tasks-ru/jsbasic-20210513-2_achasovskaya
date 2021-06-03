function initCarousel() {
  let carouselRight = document.getElementsByClassName('carousel__arrow carousel__arrow_right')[0],
    carouselLeft = document.getElementsByClassName('carousel__arrow carousel__arrow_left')[0],
    carouselInner = document.getElementsByClassName('carousel__inner')[0],
    carouselSlide = document.querySelectorAll('.carousel__slide');
  let longCarousel = null,
    numberSlide = 1;
  longCarousel = (carouselSlide[0]).offsetWidth;
  carouselLeft.style.display = 'none';
  carouselRight.addEventListener("click", function () {
    carouselInner.style.transform = 'translateX(-' + (longCarousel * numberSlide) + 'px)';
    numberSlide++;
    carouselLeft.style.display = '';
    if (numberSlide === 4) {
      carouselRight.style.display = 'none';
    }
  });
  carouselLeft.addEventListener("click", function () {
    let numberSlideLeft = numberSlide === 2 ? 0 : (numberSlide - 2);
    // перемести на местонахождение 
    carouselInner.style.transform = 'translateX(-' + (numberSlideLeft * longCarousel) + 'px)';
    numberSlide--;
    carouselRight.style.display = '';
    if (numberSlide === 1) {
      carouselLeft.style.display = 'none';
    }
  });
}
