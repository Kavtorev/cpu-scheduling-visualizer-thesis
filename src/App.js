import React from "react";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./globalTheme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
    </ThemeProvider>
  );
}

export default App;
