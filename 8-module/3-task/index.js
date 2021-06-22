export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
