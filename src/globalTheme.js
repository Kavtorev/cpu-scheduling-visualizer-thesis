import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  navbarHeight: {
    minHeight: 51,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
