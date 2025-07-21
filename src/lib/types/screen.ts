import { Member } from "./member";
import { Order } from "./order";
import { Book } from "./product";

/** REACT APP STATE **/

export interface AppRootState {
  homePage: HomePageState;
  productPage: ProductPageState;
  ordersPage: OrdersPageState;
}

/** HomePage **/
export interface HomePageState {
  popularBooks: Book[];
  newBooks: Book[];
  spotlightMembers: Member[];
}

/** ProductsPage **/
export interface ProductPageState {
  // FIXME: Need to change member later
  admin: Member | null;
  productDetail: Book | null;
  products: Book[];
  alsoLike: Book[];
}

/** OrderPage **/
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
