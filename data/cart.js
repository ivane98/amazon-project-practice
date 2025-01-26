export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [
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

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let match;

  let quantity = Number(
    document.querySelector(`.js-quantity-selector-${productId}`)?.value || 1
  );

  cart.forEach((item) => {
    if (productId === item.productId) {
      match = item;
    }
  });

  if (match) {
    match.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: "1",
    });
  }

  saveToStorage();
}

export function removeFromCart(id) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (id !== cartItem.productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      cartItem.quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let match;

  cart.forEach((item) => {
    if (productId === item.productId) {
      match = item;
    }
  });

  match.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
