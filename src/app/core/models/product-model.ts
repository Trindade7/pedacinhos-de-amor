export interface ProductModel {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    discaunt: number;
    averageReview: number;
    totalComments: number;
    color: string;
}

export function newProduct(product: ProductModel): ProductModel {
    return product;
}
export function mockProduct(): ProductModel {

    return {
        name: 'any name',
        averageReview: 4,
        price: 300,
        discaunt: 20,
        totalComments: 65,
        color: randomColor(),
        imageUrl: 'https://placehold.it/100x100?text=user%20avatar',
        description: `Ad laborum tempor magna ut amet veniam officia
        pariatur qui consectetur nostrud culpa non reprehenderit.`,
    };
}

export function randomColor(): string {
    const colorIndex = Math.floor(Math.random() * PLACEHOLDER_COLORS.length);

    return PLACEHOLDER_COLORS[colorIndex];
}

const PLACEHOLDER_COLORS = [
    '#176ba3',
    '#ffa1a1b2',
    '#e7e7e7',
    '#ffa1a1b2',
    '#ffa1a1b2',
    '#ff6e6eb2',
    '#ff6e6eb2',
    '#15202b',
    '#ff3b3bb2',
    '#ffa1a1b2'
];