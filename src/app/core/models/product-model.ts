export interface ProductModel {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
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
        totalComments: 65,
        color: 'red',
        imageUrl: 'https://placehold.it/100x100?text=user%20avatar',
        description: `Ad laborum tempor magna ut amet veniam officia
        pariatur qui consectetur nostrud culpa non reprehenderit.`,
    };
}