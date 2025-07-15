import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@material-ui/core";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";

const newBooks = [
  {
    _id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "FICTION",
    price: 19,
    bookLikes: 22,
    coverImages: ["img/default-book.jpg"],
  },
  {
    _id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "SELF-HELP",
    price: 25,
    bookLikes: 8,
    coverImages: ["img/default-book.jpg"],
  },
  {
    _id: "3",
    title: "Educated",
    author: "Tara Westover",
    genre: "MEMOIR",
    price: 21,
    bookLikes: 31,
    coverImages: ["img/default-book.jpg"],
  },
  {
    _id: "4",
    title: "Dune",
    author: "Frank Herbert",
    genre: "SCI-FI",
    price: 24,
    bookLikes: 10,
    coverImages: ["img/default-book.jpg"],
  },
];

export default function NewBooks() {
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
          const imageSrc =
            book?.coverImages && book.coverImages.length > 0
              ? `/${book.coverImages[0]}`
              : "/img/default-book.jpg";

          return (
            <Card className="book-card-mui" key={book._id} elevation={4}>
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
                  </IconButton>
                  <IconButton className="mui-icon" aria-label="add to cart">
                    <ShoppingCartIcon />
                  </IconButton>
                  <IconButton className="mui-icon" aria-label="view">
                    <VisibilityIcon />
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
