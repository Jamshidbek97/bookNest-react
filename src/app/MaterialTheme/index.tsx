import { createTheme, Theme } from "@mui/material/styles";
import { common } from "@mui/material/colors";

const baseTheme = {
  typography: {
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 8px rgba(0, 0, 0, 0.1)",
    "0px 6px 12px rgba(0, 0, 0, 0.15)",
    "0px 8px 16px rgba(0, 0, 0, 0.2)",
    "0px 10px 20px rgba(0, 0, 0, 0.25)",
    ...Array(19).fill("none"),
  ] as Theme["shadows"],
};

const light = {
  ...baseTheme,
  palette: {
    mode: "light" as const,
    background: {
      default: "#f8f9fa",
      paper: common.white,
    },
    primary: {
      main: "#6440FB",
      light: "#8A63FF",
      dark: "#4B2FCB",
      contrastText: common.white,
    },
    secondary: {
      main: "#FF9F43",
      light: "#FFB873",
      dark: "#E08A3E",
      contrastText: common.white,
    },
    text: {
      primary: "#343434",
      secondary: "#6C757D",
      disabled: "#ADB5BD",
    },
    success: {
      main: "#28A745",
      contrastText: common.white,
    },
    info: {
      main: "#17A2B8",
      contrastText: common.white,
    },
    warning: {
      main: "#FFC107",
      contrastText: common.black,
    },
    error: {
      main: "#DC3545",
      contrastText: common.white,
    },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100%",
          scrollBehavior: "smooth",
        },
        body: {
          height: "100%",
          minHeight: "100%",
          backgroundColor: "#f8f9fa",
        },
        "#root": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
        "*::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "*::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "*::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none" as const,
          fontWeight: 600,
          letterSpacing: "0.5px",
          padding: "8px 20px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined" as "outlined",
        fullWidth: true,
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          height: "100%",
        },
      },
    },
  },
};

let theme = createTheme(light);

theme = createTheme(theme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          [theme.breakpoints.up("lg")]: {
            maxWidth: "1320px",
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "gradient" },
          style: {
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            },
          },
        },
        {
          props: { variant: "gradient", color: "secondary" },
          style: {
            background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
            color: theme.palette.secondary.contrastText,
            "&:hover": {
              background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[4],
          },
        },
      },
    },
  },
});

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    gradient: true;
  }
}

export default theme;
