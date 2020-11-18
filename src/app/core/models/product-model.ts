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
