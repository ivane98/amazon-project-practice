class Cart {
  cartItems;
  #localStorageString;

  constructor(localStorageString) {
    this.#localStorageString = localStorageString;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(
      localStorage.getItem(this.#localStorageString)
    ) || [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }

  saveToStorage() {
    localStorage.setItem(
      this.#localStorageString,
      JSON.stringify(cart.cartItems)
    );
  }

  addToCart(productId) {
    let match;

    let quantity = Number(
      document.querySelector(`.js-quantity-selector-${productId}`)?.value || 1
    );

    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        match = item;
      }
    });

    if (match) {
      match.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  }

  removeFromCart(id) {
    let newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (id !== cartItem.productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((item) => {
      cartQuantity += item.quantity;
    });

    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        cartItem.quantity = newQuantity;
        localStorage.setItem(
          this.#localStorageString,
          JSON.stringify(this.cartItems)
        );
      }
    });
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let match;

    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        match = item;
      }
    });

    match.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }

  async loadCartFetch() {
    const res = await fetch("https://supersimplebackend.dev/cart");
    const data = await res.text();
    console.log(data);
    return data;
  }

  updateCartQuantity() {
    document.querySelector(".cart-quantity").innerHTML =
      this.calculateCartQuantity();
  }
}

export const cart = new Cart("cart-oop");
