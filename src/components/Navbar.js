import React from "react";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Logo from "./Logo";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      backgroundColor: "#1D1D1F",
      minHeight: theme.navbarHeight.minHeight,
    },

    title: {
      flexGrow: 1,
      marginLeft: "5em",
      color: "#F5F5F7",
      [theme.breakpoints.down("sm")]: {
        marginLeft: "1em",
      },
    },
    authButton: {
      width: "90px",
      height: "35.22px",
      textTransform: "none",
      margin: " 0 1em",
      color: "#F5F5F7",
    },

    loginButton: {
      backgroundColor: "#0066CC",
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
  const [toggle, setToggle] = React.useState(false);

  const toggleDrawer = (option) => () => setToggle(option);

  // AppBar is the header tag.
  return (
    <AppBar>
      <Toolbar classes={{ root: styles.root }}>
        <Logo />
        <Typography variant="h6" className={styles.title}>
          Goog Morning Dima.
        </Typography>
        <Hidden xsDown>
          <LoginButton
            className={clsx(styles.authButton, styles.loginButton)}
          />
          <RegisterButton className={styles.authButton} />
        </Hidden>
        <Hidden smUp>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <div className="sideBar" onClick={toggleDrawer(false)}>
          <Drawer
            open={toggle}
            anchor={"right"}
            classes={{ paper: styles.paper }}
            onClose={toggleDrawer(false)}
          >
            <List>
              <ListItem button>
                <LoginButton className={styles.authButton} />
              </ListItem>
              <Divider
                classes={{ root: styles.sideBarDivider }}
                variant="middle"
              />
              <ListItem button>
                <RegisterButton className={styles.authButton} />
              </ListItem>
            </List>
          </Drawer>
        </div>
      </Toolbar>
    </AppBar>
  );
}
