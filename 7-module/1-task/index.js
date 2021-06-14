import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');
    this.elem.classList.add("ribbon");
    this.render(this.elem, categories);
    this.CaruselRibbon();
    let active = this.elem.querySelectorAll('.ribbon__item_active');
    for (let elem of active) {
      elem.classList.remove("ribbon__item_active");
    }
    let category = this.elem.querySelectorAll('.ribbon__item');
    for (let elem of category) {
      elem.addEventListener('click', (event) => this.onClick(event));
    };
  }


  render(elem, categories) {
    const list = categories.map(value => `
    <a href="#" class="ribbon__item ribbon__item_active" data-id="${value.id}">${value.name}</a>
      `).join('');
    elem.innerHTML = `<div class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></div>
    <div class="ribbon__inner"> ${list}</div>
    <div class="ribbon__arrow ribbon__arrow_right"> <img src="/assets/images/icons/angle-left-icon.svg" alt="icon"></div>
    `;
  }


  CaruselRibbon() {
    let carouselRight = this.elem.querySelector('.ribbon__arrow_right'),
      carouselLeft = this.elem.querySelector('.ribbon__arrow_left'),
      ribbonInner = this.elem.querySelector('.ribbon__inner');

    carouselLeft.addEventListener("click", function () {
      ribbonInner.scrollBy(350, 0);
    });
    carouselRight.addEventListener("click", function () {
      ribbonInner.scrollBy(-350, 0);
    });

    ribbonInner.addEventListener("scroll", function () {
      let scrollLeft = ribbonInner.scrollLeft,
        scrollWidth = ribbonInner.scrollWidth,
        clientWidth = ribbonInner.clientWidth,
        scrollRight = scrollWidth - scrollLeft - clientWidth;
      if (scrollLeft < 1) {
        carouselRight.classList.remove("ribbon__arrow_visible");
        carouselLeft.classList.add("ribbon__arrow_visible");
      }
      if (scrollRight < 1) {
        carouselLeft.classList.remove("ribbon__arrow_visible");
        carouselRight.classList.add("ribbon__arrow_visible");
      }
    });
  }
  onClick(event) {
    let category = event.target.closest('.ribbon__item');
    let id = category.dataset.id;
    let active = this.elem.querySelectorAll('.ribbon__item_active');
    for (let elem of active) {
      elem.classList.remove("ribbon__item_active");
    }
    category.classList.add("ribbon__item_active");
    this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
      detail: id,
      bubbles: true
    }));
  }
}
