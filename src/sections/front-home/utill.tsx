// Define types for promo codes
type PercentagePromo = {
    code: string;
    type: 'percentage';
    value: number;
    minPurchase?: number;
};

type SimplePromo = {
    code: string;
    type: 'simple';
    value: number;
    minPurchase?: number;
};

type GroupPromo = {
    code: string;
    type: 'group';
    groupBuy: number;
    groupGet: number;
    minPurchase?: number;
};

export type PromoCode = PercentagePromo | SimplePromo | GroupPromo;
export const availablePromoCodes: PromoCode[] = [
    { code: 'SAVE20', type: 'percentage', value: 20, minPurchase: 10000 }, // 20% off
    { code: 'FIXED5000', type: 'simple', value: 5000, minPurchase: 1000 }, // 5000 XAF off
    { code: 'GROUP3FOR2', type: 'group', groupBuy: 3, groupGet: 1 }, // buy 3 get 1 free
];

