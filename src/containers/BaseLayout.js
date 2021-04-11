import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    marginTop: theme.navbarHeight.minHeight,
    width: "100%",
  },
}));

export default function BaseLayout() {
  const styles = useStyles();
  return (
    <Grid container classes={{ root: styles.gridRoot }}>
      <Grid
        item
        xs={12}
        style={{ border: "1px solid black", padding: "0.2em" }}
      >
        <Grid container>
          {/* DataGrid goes here */}
          <Grid
            item
            xs={12}
            sm={6}
            style={{ border: "1px solid black", padding: "0.2em" }}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={6}
            style={{ border: "1px solid black", padding: "0.2em" }}
          >
            {/* Saved Animations go here */}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        style={{ border: "1px solid black", padding: "0.2em" }}
      >
        <Grid container>
          {/* animation player goes here */}
          <Grid
            item
            xs={12}
            sm={6}
            style={{ border: "1px solid black", padding: "0.2em" }}
          ></Grid>
          {/* Logger goes here */}
          <Grid
            item
            xs={12}
            sm={6}
            style={{ border: "1px solid black", padding: "0.2em" }}
          ></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
