export interface CartItem {
  _id: string;
  quantity: number;
  title: string;
  price: number;
  coverImage: string;
  author?: string;
  genre?: string;
}
