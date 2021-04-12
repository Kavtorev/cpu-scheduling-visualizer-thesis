import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DataTable from "../components/DataTable";
import DataForm from "../components/DataForm";
import VisualizationsBoard from "../components/VisualizationsBoard";

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    marginTop: theme.navbarHeight.minHeight,
    width: "100%",
    padding: "2.5625em",
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
            <DataTable />
          </Grid>
          <Grid item xs={12} md={4}>
            {/* Saved Animations go here */}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {/* animation player goes here */}
          <Grid item xs={12} sm={6}></Grid>
          {/* Logger goes here */}
          <Grid item xs={12} sm={6}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
