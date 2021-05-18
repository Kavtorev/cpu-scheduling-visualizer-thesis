import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
      },
    },
    MuiTypography: {
      button: {
        textTransform: "none",
        color: "#F5F5F7",
      },
    },
  },
  palette: {
    primary: {
      // darky
      main: "#1D1D1F",
    },
    secondary: {
      // blue
      main: "#0066CC",
    },

    lightWhite: "#F5F5F7",
  },
  navbarHeight: {
    minHeight: 51,
  },
  typography: {
    fontFamily: '"Open Sans","Helvetica","Arial",sans-serif',
  },

  dataGridHeaders: {
    padding: "0 0 0 0.8em",
  },

  dataGridPadding: {
    padding: "1.25em",
  },
});

theme = responsiveFontSizes(theme);

export default theme;
