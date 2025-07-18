import axios from "axios";
import { serverApi } from "../../lib/config";
import { Book, BookInquiry } from "../../lib/types/product";

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getProducts(input: BookInquiry): Promise<Book[]> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      if (input.genre) url += `&productCollection=${input.genre}`;
      if (input.search) url += `&search=${input.search}`;

      const result = await axios.get(url);

      return result.data;
    } catch (err) {
      console.log("Error, getProducts", err);
      throw err;
    }
  }

  public async getProduct(productId: string): Promise<Book> {
    try {
      const url = `${this.path}/product/${productId}`;
      const result = await axios.get(url, { withCredentials: true });
      console.log("result chosen", result);
      return result.data;
    } catch (err) {
      console.log("Error, getProduct", err);
      throw err;
    }
  }
}

export default ProductService;
