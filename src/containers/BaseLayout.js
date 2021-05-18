import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import DataTable from "../components/DataTable/DataTable";
import DataForm from "../components/DataForm/DataForm.js";
import Player from "../components/Player/Player.js";
import Logger from "../components/Logger";

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    marginTop: theme.navbarHeight.minHeight,
    width: "100%",
    padding: "2.5625em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
    },
  },
}));

export default function BaseLayout() {
  const styles = useStyles();
  return (
    <Grid container classes={{ root: styles.gridRoot }}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <DataForm />
            <Box mb={2} />
            <DataTable />
            <Box mb={2} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Logger />
            <Box mb={2} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Player />
          </Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
