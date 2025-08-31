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
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useEffect, useRef, useState } from "react";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";

interface OtherNavbarProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  modalMode: "login" | "signup";
  setModalMode: (mode: "login" | "signup") => void;
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDeleteAll: () => void;
  handleLogoutRequest: () => void;
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const navigate = useNavigate();
  const { authMember } = useGlobals();
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const {
    setModalOpen,
    setModalMode,
    cartItems,
    onAdd,
    onDelete,
    onDeleteAll,
    onRemove,
    handleLogoutRequest,
  } = props;

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setOpen((prev) => !prev);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <Box
      className="other-navbar"
      sx={{
        backgroundImage: `url(${
          darkMode ? "/img/bg-dark.webp" : "img/bg-light.jpg"
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
            <StyledNavLink to="/">
              <MenuIcon fontSize="small" /> Home
            </StyledNavLink>
            <StyledNavLink to="/products" className={({ isActive }: { isActive: boolean }) => isActive ? "underline" : ""}>
              <ShoppingCartIcon fontSize="small" /> Browse
            </StyledNavLink>
            {authMember && (
              <>
                <StyledNavLink to="/orders" className={({ isActive }: { isActive: boolean }) => isActive ? "underline" : ""}>
                  <ShoppingCartIcon fontSize="small" /> Orders
                </StyledNavLink>
                <StyledNavLink to="/member-page" className={({ isActive }: { isActive: boolean }) => isActive ? "underline" : ""}>
                  <PersonIcon fontSize="small" /> Account
                </StyledNavLink>
              </>
            )}
            <StyledNavLink to="/help" className={({ isActive }: { isActive: boolean }) => isActive ? "underline" : ""}>
              <SupportAgentIcon fontSize="small" /> Support
            </StyledNavLink>
            {authMember && (
              <Basket
                cartItems={cartItems}
                onAdd={onAdd}
                onDelete={onDelete}
                onRemove={onRemove}
                onDeleteAll={onDeleteAll}
              />
            )}
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  color="default"
                />
              }
              label={darkMode ? <DarkModeIcon /> : <LightModeIcon />}
              labelPlacement="start"
            />
            {!authMember ? (
              <Button
                variant="contained"
                color="primary"
                className="login-button"
                onClick={() => {
                  setModalMode("login");
                  setModalOpen(true);
                  setOpen(false);
                }}
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
            ) : (
              <Box>
                <div className="user-avatar-wrapper" ref={menuRef}>
                  <img
                    className="user-avatar"
                    src={
                      authMember?.memberImage?.startsWith("uploads/")
                        ? `${serverApi}/${authMember.memberImage}`
                        : `${serverApi}/uploads/members/${authMember.memberImage}`
                    }
                    style={{ cursor: "pointer" }}
                    onClick={toggleMenu}
                    aria-haspopup="true"
                    alt="User Avatar"
                  />
                  {open && (
                    <div className="avatar-dropdown">
                      <button
                        className="logout-button"
                        onClick={handleLogoutRequest}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </Box>
            )}
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          className="header-frame"
          sx={{ mt: 6, gap: 4 }}
        ></Stack>
      </Container>
    </Box>
  );
}
