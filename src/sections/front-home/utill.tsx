// // Define types for promo codes
// type PercentagePromo = {
//     code: string;
//     type: 'percentage';
//     value: number;
//     minPurchase?: number;
// };

// type SimplePromo = {
//     code: string;
//     type: 'simple';
//     value: number;
//     minPurchase?: number;
// };

// type GroupPromo = {
//     code: string;
//     type: 'group';
//     groupBuy: number;
//     groupGet: number;
//     minPurchase?: number;
// };

export interface BasePromo {
  code: string;
  eventId?: string;
  ticketSelection?: string;
  validityPeriodStart?: string;
  validityPeriodEnd?: string;
  minPurchase?: number;
}

export interface PercentagePromo extends BasePromo {
  type: "percentage";
  value: number; // % discount
}

export interface SimplePromo extends BasePromo {
  type: "simple";
  value: number; // fixed amount discount
}

export interface GroupPromo extends BasePromo {
  type: "group";
  groupBuy: number;
  groupGet: number;
}

export interface EarlyBuyerPromo extends BasePromo {
  type: "earlyBuyer";
  value: number; // % discount for early buyers
}

export type PromoCode =
  | PercentagePromo
  | SimplePromo
  | GroupPromo
  | EarlyBuyerPromo;


export const availablePromoCodes: PromoCode[] = [
    { code: 'SAVE20', type: 'percentage', value: 20, minPurchase: 10000 }, // 20% off
    { code: 'FIXED5000', type: 'simple', value: 5000, minPurchase: 1000 }, // 5000 XAF off
    { code: 'GROUP3FOR2', type: 'group', groupBuy: 3, groupGet: 1 }, // buy 3 get 1 free
];

