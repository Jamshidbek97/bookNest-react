import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import reduxLogger from "redux-logger";
import ProductsPageReducer from "./screens/productPage/slice";
// import ProductsPageReducer from "./screens/productsPage/slice";
// import OrdersPageReducer from "./screens/orderPage/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    //@ts-ignore
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    productPage: ProductsPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
