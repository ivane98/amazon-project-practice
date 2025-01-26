export function renderCheckoutHeader(cartQuantity) {
  document.querySelector(
    ".js-quantity-link"
  ).innerHTML = `${cartQuantity} items`;
}
