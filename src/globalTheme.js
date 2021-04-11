import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  // typography:{
  //     h3:{
  //         [theme.breakpoints.down('sm')]:
  //     }
  // }
});

theme = responsiveFontSizes(theme);

export default theme;
