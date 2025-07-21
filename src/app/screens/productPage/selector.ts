import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productPage;

export const retrieveRestaurant = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.admin
);

export const retrieveChosenProduct = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.productDetail
);

export const retrieveProducts = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.products
);

export const retrieveAlsoLike = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.alsoLike
);
