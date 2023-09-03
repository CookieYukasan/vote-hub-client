import { PromoCodes } from "@/@types";

export const PREMIUM_PRICE = parseInt(process.env.PREMIUM_PRICE) || 199;

export const discountPercentage: PromoCodes = {
  "30off": 30,
  "50off": 50,
  "80off": 80,
  free4u: 100,
};

export const calculatePriceByPromoCode = (price: number, promoCode: string) => {
  return Math.floor(price - (price * discountPercentage[promoCode]) / 100);
};
