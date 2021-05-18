import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/NavBar/NavBar";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./globalTheme";
import BaseLayout from "./containers/BaseLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <BaseLayout />
      <ToastContainer style={{ width: "400px" }} />
    </ThemeProvider>
  );
}

export default App;
