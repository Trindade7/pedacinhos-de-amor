export interface ProductModel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  discount: number;
  averageReview: number;
  color: string;
  createdAt?: Date;
  totalComments?: number;
  category?: string;
  tags?: string[];
}

export function newProduct(product: ProductModel): ProductModel {
  return product;
}
export function mockProduct(): ProductModel {
  return {
    id: new Date().toISOString(),
    name: randomString(),
    averageReview: (Number(Math.random().toFixed(1)) * 10) / 2,
    price: Number(Math.random().toFixed(2)) * 100000,
    discount: Number(Math.random().toFixed(2)) * (100000 * 0.9),
    totalComments: Math.round(Math.random() * 365),
    color: randomColor(),
    imageUrl: 'https://placehold.it/100x100?text=user%20avatar',
    description: randomString(100),
    category: 'products',
    tags: [randomString(1), randomString(1), randomString(1)],
  };
}


function randomString(maxWords = 4, separator = ' '): string {
  const words = [
    'Ad',
    'laborum',
    'tempor',
    'magna',
    'ut',
    'amet',
    'veniam',
    ',',
    'officia',
    'pariatur',
    'qui',
    'consectetur',
    'nostrud',
    'culpa',
    'reprehenderit',
    'non',
    'tempor',
    ',',
    'est',
    'irure',
    'officia',
    'Lorem',
    'officia',
    'Adipisicing',
    ',',
    'cupidatat',
    'dolor',
    'sunt',
    'Lorem',
    'incididunt',
    'non',
    'proident', '.',
    'non',
    'sunt',
    'excepteur',
    'est',
    'aute',
    'anim', '.',
    'Ex',
    'aliqua',
    'tempor',
    ',',
    'aute',
    'qui',
    'velit',
    'Proident',
    'velit',
    'et',
    'ea',
    'do',
    'cillum',
    'consectetur',
    'duis',
    'labore',
    'velit',
    'Sunt',
    'tempor',
    'dolore',
    'ullamco',
    ',',
    'ex',
    'consectetur',
    'excepteur',
    'consectetur',
    'commodo',
    'cupidatat',
    'proident',
    'est',
    'Officia',
    'elit',
    'minim',
    'elit',
    ',',
    'voluptate',
    'deserunt',
    'in',
    'do',
    'proident',
    'qui',
    'do',
    'ullamco',
    '.',
  ];

  const newPhrase = [];
  const phraseSize = Math.round(Math.random() * maxWords);

  for (let i = 0; i < phraseSize; i++) {
    const wordIndex = Math.floor(Math.random() * words.length);
    newPhrase.push(words[wordIndex]);
  }

  return newPhrase.join(separator);
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
  '#ffa1a1b2',
];
