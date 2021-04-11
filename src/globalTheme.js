import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  navbarHeight: {
    minHeight: 51,
  },
  typography: {
    fontFamily: '"Open Sans","Helvetica","Arial",sans-serif',
  },
});

theme = responsiveFontSizes(theme);

export default theme;
