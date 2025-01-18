export let cart = [];

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
