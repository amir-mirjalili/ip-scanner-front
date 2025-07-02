export interface Asset {
    id: number;
    ipAddress: string;
    macAddress?: string | null;
    hostname?: string | null;
    os?: string | null;
    createdAt?: string;
    updatedAt?: string;
}
