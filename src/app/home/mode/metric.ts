import { FdDate } from '@fundamental-ngx/core';

export interface Metric {
    metricId: number | undefined,
    metricTitle: string,
    earlyLimit: number,
    lateLimit: number,
    alwaysEarly: boolean,
    underMaximum: number,
    overMaximum: number,
    alwaysOver: boolean,
    isActive: boolean,
    activeDate: FdDate,
    // isAllPast: boolean,
    isAfterDate: boolean,
    supplierGroup: string[],
    checkSupplierGroup: boolean
    purchaseGroup: string[],
    checkPurchaingGroup: boolean,
    purchaeOrg: string[],
    checkPurchaseOrg: boolean
}

export const METRIC_DEFAULT_VALUE: Metric = {
    metricId: undefined,
    metricTitle: '',
    earlyLimit: 0,
    lateLimit: 0,
    alwaysEarly: false,
    underMaximum: 0,
    overMaximum: 0,
    alwaysOver: false,
    isActive: false,
    activeDate: FdDate.getNow(),
    // isAllPast: false,
    isAfterDate: true,
    supplierGroup: [],
    checkSupplierGroup: false,
    purchaseGroup: [],
    checkPurchaingGroup: false,
    purchaeOrg: [],
    checkPurchaseOrg: false
}