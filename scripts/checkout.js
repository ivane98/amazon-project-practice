import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { formatMoney } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

let cartHtml = "";

cart.forEach((cartItem) => {
  let productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");

  cartHtml += `<div class="cart-item-container js-${matchingProduct.id}">
            <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">$${formatMoney(
                  matchingProduct.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span> </span>
                  <span data-product-id="${
                    matchingProduct.id
                  }" class="update-quantity-link link-primary">
                    Update
                  </span>
                  <input type='text' class='quantity-input js-input-${
                    matchingProduct.id
                  }' />
                  <span data-product-id="${
                    matchingProduct.id
                  }" class='save-quantity-link link-primary'>Save</span>
                  
                  <span data-product-id="${
                    matchingProduct.id
                  }" class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${displayDeliveryOptions(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
`;
});

function displayDeliveryOptions(matchingProduct, cartItem) {
  let deliveryHtml = ``;

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE"
        : `$${formatMoney(deliveryOption.priceCents)} -`;

    let isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    deliveryHtml += `<div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? "checked" : ""}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
        `;
  });

  return deliveryHtml;
}

document.querySelector(".order-summary").innerHTML = cartHtml;

document.querySelectorAll(".delete-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    let productId = link.dataset.productId;
    removeFromCart(productId);
    document.querySelector(`.js-${productId}`).remove();
    updateCartQuantity();
  });
});

function updateCartQuantity() {
  document.querySelector(
    ".js-quantity-link"
  ).innerHTML = `${calculateCartQuantity()} items`;
}

updateCartQuantity();

document.querySelectorAll(".update-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    let productId = link.dataset.productId;
    document
      .querySelector(`.js-${productId}`)
      .classList.add("is-editing-quantity");
    // link.classList.add("hide");
  });
});

document.querySelectorAll(".save-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    let productId = link.dataset.productId;
    document
      .querySelector(`.js-${productId}`)
      .classList.remove("is-editing-quantity");

    let value = Number(document.querySelector(`.js-input-${productId}`).value);
    updateQuantity(productId, value);
    document.querySelector(
      ".js-quantity-link"
    ).innerHTML = `${calculateCartQuantity()} items`;
  });

  link.parentElement.children[1].computedStyleMap.display = "initial";
});
