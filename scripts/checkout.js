import { renderOrderSummary } from "./checkout/orderSummary.js";

import { renderPaymentSummary } from "./checkout/paymentSummary.js";

import "../data/cart-class.js";
import { loadProductsAsync } from "../data/products.js";

async function loadPage() {
  try {
    await loadProductsAsync("https://supersimplebackend.dev/products");
  } catch (error) {
    console.log("please try again");
  }

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();
