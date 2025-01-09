export enum PlanPlatform {
    WEB = 'WEB',
    MOBILE = 'MOBILE',
    ALL = 'ALL'
}

export enum PlanType {
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY'
}

export interface PlanDescriptionDto {
    id?: number;
    description: string;
    isDeleted: boolean;
}

export interface UpdatePlanRequest {
    id?: number;
    planName: string;
 
    description: string;
    price: number;
    discountPrice: number;
    trialPeriodDays: number;
    cancelPeriodDays: number;
    descriptions: PlanDescriptionDto[];
} 