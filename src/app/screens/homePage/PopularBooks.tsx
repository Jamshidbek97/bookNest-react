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
import { createSelector } from "reselect";
import { retrievePopularBooks } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Book } from "../../../lib/types/product";

/*********** REDUX SLICE AND SELECTOR ***********/
const popularBooksRetriever = createSelector(
  retrievePopularBooks,
  (popularBooks) => ({ popularBooks })
);

export default function PopularBooks() {
  const { popularBooks } = useSelector(popularBooksRetriever);
  return (
    <Box className="popular-books">
      <Typography
        variant="h4"
        align="center"
        style={{ marginBottom: 40, fontWeight: 600 }}
      >
        ⭐ Popular Books
      </Typography>
      <Box className="book-card-container">
        {popularBooks.map((book: Book) => {
          const imageSrc = `${serverApi}/${
            book.coverImages?.[0] || "img/default-book.jpg"
          }`;

          return (
            <Card className="book-card-popular" key={book._id} elevation={5}>
              <Box position="relative">
                <CardMedia
                  component="img"
                  height="360"
                  image={imageSrc}
                  alt={book.title}
                  className="book-img"
                />
                {book.bookLikes > 15 && (
                  <Box className="badge-top-right">🏆 Bestseller</Box>
                )}
                <Box className="mui-vertical-icons">
                  <IconButton className="mui-icon-vertical" aria-label="like">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton className="mui-icon-vertical" aria-label="cart">
                    <ShoppingCartIcon />
                  </IconButton>
                  <IconButton className="mui-icon-vertical" aria-label="view">
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
