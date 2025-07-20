import { Box, Button, Typography, Stack, Paper } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";

const featuredBook = {
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  description:
    "An American classic exploring themes of justice, morality, and the innocence of childhood.",
  price: 20,
  bookLikes: 32,
  coverImage: "img/default-book.jpg",
};

export default function BookOfTheMonth() {
  const history = useHistory();
  return (
    <Box className="homepage book-of-the-month">
      <Paper elevation={3} className="book-month-card">
        <Box className="left">
          <div className="cover-wrapper">
            <img
              src={featuredBook.coverImage || "/img/default-book.jpg"}
              alt={featuredBook.title}
              className="cover"
            />
            <span className="badge">
              <StarIcon fontSize="small" /> Book of the Month
            </span>
          </div>
        </Box>

        <Box className="right">
          <Typography variant="h4" className="title">
            {featuredBook.title}
          </Typography>
          <Typography variant="subtitle1" className="author">
            by {featuredBook.author}
          </Typography>
          <Typography variant="body1" className="desc">
            {featuredBook.description}
          </Typography>
          <Typography variant="h6" className="price">
            ${featuredBook.price}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            className="cta-button"
            startIcon={<ShoppingCartIcon />}
            onClick={() => history.push(`/product/all`)}
          >
            Buy Now
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
