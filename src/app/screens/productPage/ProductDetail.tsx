import { Box, Typography, Button, Stack, Chip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { Member } from "../../../lib/types/member";
import { Book } from "../../../lib/types/product";

const mockBook = {
  _id: "686eb04726452961595003da",
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  genre: "FICTION",
  status: "AVAILABLE",
  price: 20,
  format: "HARDCOVER",
  stockCount: 200,
  description:
    "To Kill a Mockingbird is a novel by Harper Lee, published in 1960, that explores themes of racial injustice and childhood innocence in the American South.",
  coverImages: ["/img/default-book.jpg"],
  bookLikes: 21,
};

/** REDUX SLICE && SELECTOR */
// const actionDispatch = (dispatch: ReduxDispatch) => ({
//   setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
//   setChosenProduct: (data: Book) => dispatch(setChosenProduct(data)),
// });

export default function ProductDetail() {
  return (
    <Box className="d-products product-detail">
      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        <Box className="product-image">
          <img
            src={mockBook.coverImages[0] || "/img/default-book.jpg"}
            alt={mockBook.title}
          />
        </Box>

        <Box className="product-info">
          <Typography className="product-title">{mockBook.title}</Typography>
          <Typography className="product-author">
            by {mockBook.author}
          </Typography>
          <Chip label={mockBook.genre} className="genre-chip" />

          <Typography className="product-description" mt={2}>
            {mockBook.description}
          </Typography>

          <Typography className="product-price">${mockBook.price}</Typography>

          <Stack direction="row" spacing={2} mt={3}>
            <Button variant="contained" startIcon={<ShoppingCartIcon />}>
              Add to Cart
            </Button>
            <Button variant="outlined" startIcon={<FavoriteBorderIcon />}>
              Save
            </Button>
          </Stack>

          <Typography className="product-stock" mt={2}>
            {mockBook.stockCount > 0
              ? `${mockBook.stockCount} in stock`
              : "Out of stock"}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
