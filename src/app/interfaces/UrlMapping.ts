// models/UrlMapping.ts

export interface UrlMapping {
    id: number;
    originalUrl: string;
    shortUrl: string;
    createdAt: Date;
    clickCount: number;
}
