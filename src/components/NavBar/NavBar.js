import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Logo from "./Logo";
import { algorithms } from "../DataForm/forms";
import { getChosenAlgorithmName } from "../../redux/ui/uiSlice";
import { getGreeting } from "../../lib/utils";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.primary.main,
      minHeight: theme.navbarHeight.minHeight,
    },

    title: {
      flexGrow: 1,
      marginLeft: "5em",
      color: theme.palette.lightWhite,
      [theme.breakpoints.down("sm")]: {
        marginLeft: "1em",
      },
    },
    paper: {
      backgroundColor: "#1D1D1F",
      width: "300px",
    },
    sideBarDivider: {
      backgroundColor: "#F5F5F7",
      width: "80%",
    },
  };
});

export default function Navbar() {
  const styles = useStyles();
  const algo = useSelector(getChosenAlgorithmName);

  // AppBar is the header tag.
  return (
    <AppBar>
      <Toolbar classes={{ root: styles.root }}>
        <Logo />
        <Typography variant="h6" className={styles.title}>
          {algo !== "_NONE" ? (
            <>{algorithms[algo].label} </>
          ) : (
            `${getGreeting()}`
          )}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
