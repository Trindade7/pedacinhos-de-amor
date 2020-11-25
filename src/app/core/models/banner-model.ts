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
    const imageName = Math.floor(Math.random() * 3 + 1);
    console.log(imageName);

    return {
        name: 'any name',
        color: randomColor(),
        imageUrl: `assets/images/${imageName}.jfif`,
        description: `Ad laborum tempor magna ut amet veniam officia
        pariatur qui consectetur nostrud culpa non reprehenderit.`,
    };
}
