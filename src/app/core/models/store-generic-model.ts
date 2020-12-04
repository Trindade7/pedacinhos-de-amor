export interface StoreModel {
    loading: boolean;
    status: string;
    error: Error | null;
}

export interface QueryOptionsModel {
    limitToLast: number;
    orderBy: 'createdAt' | 'updatedAt' | 'name' | 'email';
    orderDirection: 'asc' | 'desc';
    limitTo: number;
    arrayContains?: {
        arrayName: string;
        value: any;
    };
    path: string | null;
    startAt?: any;
}