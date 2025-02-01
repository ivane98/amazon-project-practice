import { formatMoney } from "../scripts/utils/money.js";

export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStars() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatMoney(this.priceCents)}`;
  }

  extraInfoHtml() {
    return ``;
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHtml() {
    return `
    <a href="${this.sizeChartLink}" target=_blank>Size Chart</a>
    `;
  }
}

class Appliance extends Product {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHtml() {
    return `
    <a href="${this.instructionsLink}" target=_blank>Instructions</a>
    <a href="${this.warrantyLink}" target=_blank>Warranty</a>
    `;
  }
}

export let products = [];

export async function loadProductsAsync(url) {
  const response = await fetch(url);
  const data = await response.json();
  products = data.map((productDetail) => {
    if (productDetail.type === "clothing") {
      return new Clothing(productDetail);
    } else if (productDetail.type === "appliance") {
      return new Appliance(productDetail);
    }
    return new Product(productDetail);
  });
  console.log("load products");
}
