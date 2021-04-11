import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./globalTheme";
import BaseLayout from "./containers/BaseLayout";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <BaseLayout />
    </ThemeProvider>
  );
}

export default App;
