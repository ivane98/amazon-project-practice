import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { cart } from "../data/cart-class.js";
import { loadProductsAsync } from "../data/products.js";

async function loadPage() {
  try {
    await loadProductsAsync("https://supersimplebackend.dev/products");
  } catch (error) {
    console.log("please try again");
  }
  cart.loadCartFetch();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();
