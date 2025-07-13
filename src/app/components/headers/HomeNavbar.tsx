import { Box, Button, Container, Stack, styled } from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: "#fff",
  fontWeight: 500,
  position: "relative",
  padding: "8px 16px",
  fontSize: "18px",
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

export default function HomeNavbar() {
  const history = useHistory();
  const authMember = false; // Replace this with real auth logic

  const goProducts = () => {
    history.push("/products");
  };

  return (
    <Box className="home-navbar">
      <Container maxWidth="lg" className="navbar-container">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="menu"
        >
          <NavLink to="/">
            <img className="brand-logo" src="/favicon.png" alt="Brand" />
          </NavLink>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            className="links"
          >
            <StyledNavLink to="/" activeClassName="underline">
              Home
            </StyledNavLink>
            <StyledNavLink to="/products" activeClassName="underline">
              Browse
            </StyledNavLink>
            {authMember && (
              <>
                <StyledNavLink to="/orders" activeClassName="underline">
                  Orders
                </StyledNavLink>
                <StyledNavLink to="/member-page" activeClassName="underline">
                  Account
                </StyledNavLink>
              </>
            )}
            <StyledNavLink to="/help" activeClassName="underline">
              Support
            </StyledNavLink>
            {!authMember && (
              <Button
                variant="contained"
                color="primary"
                className="login-button"
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
        >
          <Box className="detailed">
            <Box className="head-main-txt">
              Your Gateway to Limitless Knowledge
            </Box>
            <Box className="wel-txt">Not Just Books — A New Chapter Begins</Box>
            <Box className="service-txt">Accessible Anytime, Anywhere</Box>
            <Box className="signup">
              {!authMember ? (
                <Button
                  variant="contained"
                  color="primary"
                  className="signup-button"
                >
                  Sign Up
                </Button>
              ) : (
                <Button
                  onClick={goProducts}
                  variant="contained"
                  color="primary"
                  className="signup-button"
                >
                  Explore Now
                </Button>
              )}
            </Box>
          </Box>
          <Box className="logo-frame">
            <div className="logo-img" />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
