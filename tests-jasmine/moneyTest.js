import { formatMoney } from "../scripts/utils/money.js";

describe("test suite: formatCurrency", () => {
  it("converts cents into dollars", () => {
    expect(formatMoney(2095)).toEqual("20.95");
  });

  it("works with zero", () => {
    expect(formatMoney(0)).toEqual("0.00");
  });

  it("rounds up to the nearest cent", () => {
    expect(formatMoney(2000.5)).toEqual("20.01");
  });
});
