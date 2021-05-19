export interface ProductCharacteristic {
  name: string;
  value: string;
}

export interface ReviewModel {
  _id: string;
  name: string;
  title: string;
  description: string;
  rating: number;
  productId: string;
  createdAt: Date;
}

export interface ProductModel {
  _id: string;
  categories: string[];
  tags: string[];
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  credit: number;
  initialRating: number;
  description: string;
  advantages: string;
  disAdvantages: string;
  characteristics: ProductCharacteristic[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  reviews: ReviewModel[];
  reviewCount: number;
  reviewAvg?: number;
}


