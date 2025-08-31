import { Box, Typography, Button, Stack, Chip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import { Book } from "../../../lib/types/product";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProductDetail } from "./slice";
import { retrieveChosenProduct } from "./selector";
import { CartItem } from "../../../lib/types/search";
import ProductService from "../../services/Product.Service";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE && SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProductDetail: (data: Book) => dispatch(setProductDetail(data)),
});

const productDetailRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct: any) => ({
    chosenProduct,
  })
);

interface DetailProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductDetail(props: DetailProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  const { setProductDetail } = actionDispatch(dispatch);

  const chosenProduct = useSelector(retrieveChosenProduct);

  useEffect(() => {
    if (productId) {
      const product = new ProductService();
      product
        .getProduct(productId)
        .then((data) => setProductDetail(data))
        .catch((err) => console.log("Error: ", err));
    }
  }, [productId]);

  return (
    <Box className="d-products product-detail">
      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        <Box className="product-image">
          <img
            src={
              chosenProduct?.coverImages?.[0]
                ? `${serverApi}/${chosenProduct.coverImages[0]}`
                : "/img/default-book.jpg"
            }
            alt={chosenProduct?.title}
          />
        </Box>

        <Box className="product-info">
          <Typography className="product-title">
            {chosenProduct?.title}
          </Typography>
          <Typography className="product-author">
            by {chosenProduct?.author}
          </Typography>
          <Chip label={chosenProduct?.genre} className="genre-chip" />

          <Typography className="product-description" mt={2}>
            {chosenProduct?.description}
          </Typography>

          <Typography className="product-price">
            ${chosenProduct?.price}
          </Typography>

          <Stack direction="row" spacing={2} mt={3}>
            <Button
              onClick={(e) => {
                onAdd({
                  _id: chosenProduct!._id,
                  quantity: 1,
                  title: chosenProduct!.title,
                  price: chosenProduct!.price,
                  coverImage: chosenProduct?.coverImages?.[0]
                    ? `${serverApi}/${chosenProduct.coverImages[0]}`
                    : "/img/default-book.jpg",
                });
              }}
              variant="contained"
              startIcon={<ShoppingCartIcon />}
            >
              Add to Cart
            </Button>
            <Button variant="outlined" startIcon={<FavoriteBorderIcon />}>
              Save
            </Button>
          </Stack>

          <Typography className="product-stock" mt={2}>
            {/*@ts-ignore */}
            {chosenProduct?.stockCount > 0
              ? `${chosenProduct?.stockCount} in stock`
              : "Out of stock"}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
