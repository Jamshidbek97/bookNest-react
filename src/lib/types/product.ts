import { BookFormat, BookGenre, BookStatus } from "../enums/book.enum";

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: BookGenre;
  status: BookStatus;
  price: number;
  stockCount?: number;
  format?: BookFormat;
  pageCount?: number;
  description?: string;
  coverImages?: string[];
  duration?: string;
  timesBorrowed?: number;
  bookViews: number;
  bookLikes: number;
  badge?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BookInquiry {
  order: string;
  page: number;
  limit: number;
  genre?: BookGenre;
  search?: string;
}
