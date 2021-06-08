import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.elem = document.createElement('div');
    this.elem.classList.add("card");
    this.render(product);
    let button = this.elem.getElementsByClassName('card__button')[0];
    this.product = product;

    button.addEventListener('click', (event) => this.onClick(event));
  }

  render(product) {
    this.elem.innerHTML = `
    <div class="card__top">
        <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
        <span class="card__price">€${Number(product.price).toFixed(2)}</span>
    </div>
    <div class="card__body">
        <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
    `;
  }


  onClick(event) {
    let eventTest = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
      detail: this.product.id, // Уникальный идентификатора товара из объекта товара
      bubbles: true // это событие всплывает - это понадобится в дальнейшем
    });
    this.elem.dispatchEvent(eventTest);
  }
}
