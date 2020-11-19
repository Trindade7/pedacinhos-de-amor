import { randomColor } from './product-model';

export interface BannerModel {
    name: string;
    description: string;
    imageUrl: string;
    color: string;
}
export function newBanner(banner: BannerModel): BannerModel {
    return banner;
}

export function mockBanner(): BannerModel {
    return {
        name: 'any name',
        color: randomColor(),
        imageUrl: 'https://placehold.it/100x100?text=user%20avatar',
        description: `Ad laborum tempor magna ut amet veniam officia
        pariatur qui consectetur nostrud culpa non reprehenderit.`,
    };
}
