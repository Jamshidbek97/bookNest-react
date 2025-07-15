import { Box, Typography, Avatar, Stack, Paper } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const testimonials = [
  {
    name: "Jane Doe",
    role: "Book Enthusiast",
    avatar: "/img/user1.jpg",
    message:
      "BookNest completely changed my reading life. I discovered so many authors I never knew before!",
  },
  {
    name: "Mark Smith",
    role: "University Professor",
    avatar: "/img/user2.jpg",
    message:
      "Their selection is unmatched and the delivery is fast. Highly recommended for students and academics.",
  },
  {
    name: "Lina Kim",
    role: "Content Creator",
    avatar: "/img/user3.jpg",
    message:
      "The site is so easy to use, and the curated lists helped me find what I love.",
  },
];

export default function Testimonials() {
  return (
    <Box className="products testimonials">
      <Typography className="testimonials-title">
        What Our Readers Say
      </Typography>
      <Stack direction="row" spacing={4} className="testimonials-list">
        {testimonials.map((t, i) => (
          <Paper key={i} elevation={3} className="testimonial-card">
            <FormatQuoteIcon className="quote-icon" />
            <Typography className="testimonial-msg">"{t.message}"</Typography>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              className="testimonial-user"
            >
              <Avatar src={t.avatar} alt={t.name} />
              <Box>
                <Typography className="user-name">{t.name}</Typography>
                <Typography className="user-role">{t.role}</Typography>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
