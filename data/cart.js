export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

export function addToCart(productId) {
  let match;

  let quantity = Number(
    document.querySelector(`.js-quantity-selector-${productId}`).value
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
    });
  }
}

export function removeFromCart(id) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (id !== cartItem.productId) {
      newCart.push(cartItem);
    }
  });

  console.log(newCart);
}
