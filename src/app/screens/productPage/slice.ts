import { createSlice } from "@reduxjs/toolkit";
import { ProductPageState } from "../../../lib/types/screen";

const initialState: ProductPageState = {
  admin: null,
  productDetail: null,
  products: [],
  alsoLike: [],
};

const productPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    // setAdmin: (state, action) => {
    //   state.admin = action.payload;
    // },
    setProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setAlsoLike: (state, action) => {
      state.alsoLike = action.payload;
    },
  },
});

export const { setProductDetail, setProducts, setAlsoLike } =
  productPageSlice.actions;

const ProductsPageReducer = productPageSlice.reducer;
export default ProductsPageReducer;
