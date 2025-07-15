import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
// import "./Footer.css";

export default function Footer() {
  return (
    <Box component="footer" className="site-footer">
      <Container maxWidth="lg" className="footer-container">
        <Box className="footer-grid">
          <Box className="footer-column">
            <Box className="footer-logo">
              <img src="/img/logo.png" alt="Company Logo" />
              <Typography variant="body1" className="footer-description">
                Your Gateway to Limitless Knowledge, Not Just Books — A New
                Chapter Begins
              </Typography>
            </Box>
          </Box>

          <Box className="footer-column">
            <Typography variant="h6" className="footer-heading">
              Quick Links
            </Typography>
            <ul className="footer-links">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </Box>

          <Box className="footer-column">
            <Typography variant="h6" className="footer-heading">
              Support
            </Typography>
            <ul className="footer-links">
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/shipping">Shipping</Link>
              </li>
              <li>
                <Link href="/returns">Returns</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </Box>

          <Box className="footer-column">
            <Typography variant="h6" className="footer-heading">
              Connect With Us
            </Typography>
            <Box className="social-links">
              <IconButton aria-label="Facebook" className="social-icon">
                <Facebook />
              </IconButton>
              <IconButton aria-label="Twitter" className="social-icon">
                <Twitter />
              </IconButton>
              <IconButton aria-label="Instagram" className="social-icon">
                <Instagram />
              </IconButton>
              <IconButton aria-label="LinkedIn" className="social-icon">
                <LinkedIn />
              </IconButton>
            </Box>
            <Box className="newsletter">
              <Typography variant="body2" className="newsletter-text">
                Subscribe to our newsletter
              </Typography>
              <Box component="form" className="newsletter-form">
                <input
                  type="email"
                  placeholder="Your email"
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-button">
                  Subscribe
                </button>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="footer-bottom">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Not Just Books — A New Chapter
            Begins. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
