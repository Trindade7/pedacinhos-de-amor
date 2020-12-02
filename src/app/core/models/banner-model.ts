import { randomColor } from './product-model';

export interface BannerSimpleModel {
    name: string;
    imageUrl: string;
    color: string;
}
export interface BannerModel extends BannerSimpleModel {
    description: string;
}

export function newBanner(banner: BannerModel): BannerModel {
    return banner;
}

export function mockBanner(): BannerModel {
    const imageName = Math.floor(Math.random() * 3 + 1);

    return {
        name: 'any name',
        color: randomColor(),
        imageUrl: `assets/images/${imageName}.jfif`,
        description: `Ad laborum tempor magna ut amet veniam officia
        pariatur qui consectetur nostrud culpa non reprehenderit.`,
    };
}
