declare namespace Contracts {
    namespace Gift {
        interface InAction {
            find: null;
            get: GiftId;
            create: BaseGift;
        }
        type GiftId = number;
        interface BaseGift {
            title: string;
            type: GiftType;
            startedAt: number;
            expiredAt: number;
            value: number;
            description: string;
            author: string;
            id: number;
        }
        enum GiftType {
            certificate = 'certificate',
            'discont-bonus' = 'discont-bonus',
            'coupon-bonus' = 'coupon-bonus',
        }
    }
}