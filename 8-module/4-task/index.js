import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let cartItem = [];
    cartItem = this.cartItems.find(item => item.product.id == product.id);
    if (cartItem) {
      cartItem.count++;
    } else {
      cartItem = {
        product: product,
        count: 1
      };
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = [];
    cartItem = this.cartItems.find(item => item.product.id == productId);
    cartItem.count += amount;
    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length < 1;
  }

  getTotalCount() {
    let summ = 0;
    for (let elem of this.cartItems) {
      if (elem) {
        summ += elem.count;
      }
    }
    return summ;
  }

  getTotalPrice() {
    let summ = 0;
    for (let elem of this.cartItems) {
      if (elem) {
        summ += elem.count * elem.product.price;
      }
    }
    return summ;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.modalBody = document.createElement('div');
    for (let elem of this.cartItems) {
      this.modalBody.append(this.renderProduct(elem.product, elem.count));
    }
    this.modalBody.append(this.renderOrderForm());
    this.modal.setBody(this.modalBody);
    this.modalBody.querySelector(".cart-form").onsubmit = (event) => this.onSubmit(event);
    this.modalBody.addEventListener('click', this.onClick);
    this.modal.open();
  }

  onClick = (event) => {
    let cart = event.target.closest('.cart-product');
    if (cart) {
      let productId = cart.dataset.productId;
      let amount = event.target.closest('.cart-counter__button_plus') ? 1 : -1;
      this.updateProductCount(productId, amount);
    }
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (document.getElementsByClassName("is-modal-open").length > 0) {
      let productId = cartItem.product.id;
      let modalBody = this.modalBody;
      // Элемент, который хранит количество товаров с таким productId в корзине
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      // Элемент с общей стоимостью всех единиц этого товара
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      // Элемент с суммарной стоимостью всех товаров
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.count*cartItem.product.price).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`
      if (this.cartItems.length === 0) {
        this.modal.close();
        return;
      }
      if (cartItem.count === 0) {
        this.modalBody.querySelector(`[data-product-id="${productId}"]`).remove();
      }
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    this.modalBody.querySelector(`[type="submit"]`).classList.add(".is-loading");
    let cartForm = this.modalBody.querySelector(`.cart-form`);
    let response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(cartForm)
    });
    if (response.status === 200) {
      this.modal.setTitle('Success!');
      for (let member in this.cartItems) delete this.cartItems[member];
      this.cartItems.length = 0;
      this.modalBody.innerHTML = '<div class="modal__body-inner"><p>Order successful!Your order is being cooked: ) <br>We’ ll notify you about delivery time shortly. <br><img src = "/assets/images/delivery.gif" ></p></div>';
      this.modal.setBody(this.modalBody);
      this.cartIcon.update(this);
    } else {
      alert("Произошла ошибка при отправке");
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
