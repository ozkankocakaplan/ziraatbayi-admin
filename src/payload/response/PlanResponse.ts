import { PlanDescriptionResponse } from './PlanDescriptionResponse';

export enum PlanPlatform {
    WEB = 'WEB',
    MOBILE = 'MOBILE',
    ALL = 'ALL'
}

export enum PlanType {
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY'
}

export interface PlanResponse {
    id: number;
    planName: string;
    planPlatform: PlanPlatform;
    planType: PlanType;
    description: string;
    price: number;
    discountPrice: number;
    trialPeriodDays: number;
    cancelPeriodDays: number;
    descriptions: PlanDescriptionResponse[];
    isDeleted: boolean;
}
