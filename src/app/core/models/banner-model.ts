export interface BannerModel {
    name: string;
    description: string;
    imageUrl: string;
    color: string;
}
export function newBanner(banner: BannerModel): BannerModel {
    return banner;
}
