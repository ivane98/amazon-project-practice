function Cart(localStorageString) {
  const cart = {
    cartItems: undefined,
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageString)) || [
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
    },

    saveToStorage() {
      localStorage.setItem(localStorageString, JSON.stringify(cart.cartItems));
    },

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
    },

    removeFromCart(id) {
      let newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (id !== cartItem.productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;

      saveToStorage();
    },

    calculateCartQuantity() {
      let cartQuantity = 0;

      this.cartItems.forEach((item) => {
        cartQuantity += item.quantity;
      });

      return cartQuantity;
    },

    updateQuantity(productId, newQuantity) {
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          cartItem.quantity = newQuantity;
          localStorage.setItem(
            localStorageString,
            JSON.stringify(this.cartItems)
          );
        }
      });
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let match;

      this.cartItems.forEach((item) => {
        if (productId === item.productId) {
          match = item;
        }
      });

      match.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    },
  };

  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");

cart.loadFromStorage();
businessCart.loadFromStorage();
