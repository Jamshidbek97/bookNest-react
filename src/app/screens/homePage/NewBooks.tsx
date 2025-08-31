import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewBooks } from "./selector";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { useNavigate } from "react-router-dom";

/*********** REDUX SLICE AND SELECTOR ***********/
const newBooksRetriever = createSelector(retrieveNewBooks, (newBooks) => ({
  newBooks,
}));

interface NewProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function NewBooks(props: NewProductsProps) {
  const { onAdd } = props;
  const { newBooks } = useSelector(newBooksRetriever);

  const navigate = useNavigate();

  return (
    <Box className="new-books">
      <Typography
        variant="h4"
        align="center"
        style={{ marginBottom: 40, fontWeight: 600 }}
      >
        🆕 New Arrivals
      </Typography>
      <Box className="book-card-container">
        {newBooks.map((book) => {
          const imageSrc = `${serverApi}/${
            book.coverImages?.[0] || "img/default-book.jpg"
          }`;

          return (
            <Card
              className="book-card-mui"
              style={{ cursor: "pointer" }}
              key={book._id}
              elevation={4}
              onClick={() => navigate(`/product/${book._id}`)}
            >
              <Box position="relative">
                <CardMedia
                  component="img"
                  height="360"
                  image={imageSrc}
                  alt={book.title}
                  className="book-img"
                />
                <Box className="badge-top-left">🔥 Hot</Box>
                <Box className="mui-hover-icons">
                  <IconButton className="mui-icon" aria-label="like">
                    <FavoriteIcon />
                    {book.bookLikes > 0 && (
                      <span className="cart-badge">{book.bookLikes}</span>
                    )}
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      onAdd({
                        _id: book._id,
                        quantity: 1,
                        title: book.title,
                        price: book.price,
                        coverImage: imageSrc,
                      });
                      console.log("Button clicked");
                      e.stopPropagation();
                    }}
                    className="mui-icon"
                    aria-label="add to cart"
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                  <IconButton className="mui-icon" aria-label="view">
                    <VisibilityIcon />
                    {book.bookViews > 0 && (
                      <span className="cart-badge">{book.bookViews}</span>
                    )}
                  </IconButton>
                </Box>
              </Box>
              <CardContent>
                <Typography variant="h6" style={{ fontWeight: 600 }}>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {book.author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {book.genre}
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: 600, marginTop: 8 }}
                >
                  ${book.price}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
