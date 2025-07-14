import { Box, Button, Container, Stack, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

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

export default function OtherNavbar() {
  const authMember = false; // Replace this with real auth logic

  return (
    <Box className="other-navbar">
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
          <Box className="logo-frame">
            <div className="logo-img" />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
