import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
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
