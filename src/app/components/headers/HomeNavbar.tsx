import {
  Box,
  Button,
  Container,
  Stack,
  styled,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useState } from "react";

export default function HomeNavbar() {
  const history = useHistory();
  const authMember = false; // Replace this with real auth logic
  const [darkMode, setDarkMode] = useState(false);

  const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    color: darkMode ? "#fff" : "#111",
    fontWeight: 500,
    position: "relative",
    padding: "8px 16px",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "color 0.3s ease",
    "&.underline::after, &:hover::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "60%",
      height: "2px",
      backgroundColor: theme.palette.primary.main,
    },
  }));

  const goProducts = () => {
    history.push("/products");
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <Box
      className="home-navbar"
      sx={{
        backgroundImage: `url(${
          darkMode ? "/img/bg-dark.jpg" : "img/bg-light.jpg"
        })`,
        color: darkMode ? "#fff" : "#000",
        pb: 4,
      }}
    >
      <Container maxWidth="lg" className="navbar-container">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="menu"
          sx={{ py: 2 }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <NavLink to="/">
              <img
                className="brand-logo"
                src="/favicon.png"
                alt="Brand"
                style={{ height: 40 }}
              />
            </NavLink>
            <Typography
              variant="h6"
              fontWeight={700}
              color={darkMode ? "#fff" : "#111"}
            >
              BookNest
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            className="links"
          >
            <StyledNavLink to="/" activeClassName="underline">
              <MenuBookIcon fontSize="small" /> Home
            </StyledNavLink>
            <StyledNavLink to="/products" activeClassName="underline">
              <ShoppingCartIcon fontSize="small" /> Browse
            </StyledNavLink>
            {authMember && (
              <>
                <StyledNavLink to="/orders" activeClassName="underline">
                  <ShoppingCartIcon fontSize="small" /> Orders
                </StyledNavLink>
                <StyledNavLink to="/member-page" activeClassName="underline">
                  <PersonIcon fontSize="small" /> Account
                </StyledNavLink>
              </>
            )}
            <StyledNavLink to="/help" activeClassName="underline">
              <SupportAgentIcon fontSize="small" /> Support
            </StyledNavLink>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  color="default"
                />
              }
              label={darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
              labelPlacement="start"
            />
            {!authMember && (
              <Button
                variant="contained"
                color="primary"
                className="login-button"
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
            )}
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          className="header-frame"
          sx={{ mt: 6, gap: 4 }}
        >
          <Box className="detailed">
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Your Gateway to Limitless Knowledge
            </Typography>
            <Typography
              variant="h6"
              color={darkMode ? "grey.300" : "grey.700"}
              gutterBottom
            >
              Not Just Books — A New Chapter Begins
            </Typography>
            <Typography
              variant="subtitle1"
              color={darkMode ? "grey.400" : "grey.800"}
            >
              Accessible Anytime, Anywhere
            </Typography>
            <Box className="signup" mt={4}>
              {!authMember ? (
                <Button variant="contained" color="secondary" size="large">
                  Sign Up
                </Button>
              ) : (
                <Button
                  onClick={goProducts}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Explore Now
                </Button>
              )}
            </Box>
          </Box>
          <Box className="logo-frame">
            {!darkMode ? (
              <div
                className="logo-img"
                style={{
                  width: 300,
                  height: 300,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
            ) : (
              <div className="no-logo-img" />
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
