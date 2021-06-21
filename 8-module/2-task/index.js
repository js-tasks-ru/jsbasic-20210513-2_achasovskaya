import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = document.createElement('div');
    this.elem.classList.add("products-grid");
    this.render(products);
  }

  render(products) {
    const list = products.map(value => `<div class="card"> <div class="card__top">
    <img src="/assets/images/products/${value.image}" class="card__image" alt="product">
    <span class="card__price">€${Number(value.price).toFixed(2)}</span>
</div>
<div class="card__body">
    <div class="card__title">${value.name}</div>
    <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
</div>
</div>`).join('');
    this.elem.innerHTML = `
    <div class="products-grid__inner">
    ${list}
  </div>`;
  }
  updateFilter(filters) {
    Object.assign(this.filters, filters);
    let inner = this.elem.querySelector('.products-grid__inner');
    inner.innerHTML = '';
    for (let elem of this.products) {
      if (this.filters.noNuts && elem.nuts) {
        continue;
      }
      if (this.filters.vegeterianOnly && !elem.vegeterian) {
        continue;
      }
      if (this.filters.maxSpiciness && elem.spiciness > this.filters.maxSpiciness) {
        continue;
      }
      if (this.filters.category && elem.category != this.filters.category) {
        continue;
      }
      let test = new ProductCard(elem);
      inner.append(test.elem);
    }
  }
}
