import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CallToAction() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/products");
  };

  return (
    <Box className="homepage call-to-action">
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
          className="cta-box"
        >
          <Box className="cta-text">
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Discover Your Next Favorite Book
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Thousands of titles are waiting for you — jump in and start your
              next adventure.
            </Typography>
          </Box>

          <Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleExplore}
              className="cta-button"
            >
              Browse Library
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
