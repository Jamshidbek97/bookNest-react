import { Box, Typography, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore from "swiper";

SwiperCore.use([]);

const mockRecommendations = [
  {
    title: "1984",
    author: "George Orwell",
    cover: "/img/default-book.jpg",
    price: 18,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "/img/default-book.jpg",
    price: 15,
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    cover: "/img/default-book.jpg",
    price: 17,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    cover: "/img/default-book.jpg",
    price: 16,
  },
];

export default function Recommendations() {
  return (
    <Box className="homepage recommendations">
      <Typography variant="h5" fontWeight={600} mb={3}>
        You May Also Like
      </Typography>

      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {mockRecommendations.map((book, idx) => (
          <SwiperSlide key={idx}>
            <Box className="recommendation-card">
              <Box className="card-image">
                <img src={book.cover} alt={book.title} />
                <Box className="card-icons">
                  <IconButton className="icon-button">
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton className="icon-button">
                    <ShoppingCartIcon />
                  </IconButton>
                  <IconButton className="icon-button">
                    <VisibilityIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box className="card-info">
                <Typography className="book-title">{book.title}</Typography>
                <Typography className="book-author">
                  by {book.author}
                </Typography>
                <Typography className="book-price">${book.price}</Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
