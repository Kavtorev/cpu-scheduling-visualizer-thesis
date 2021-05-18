import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PlayerControlPanel from "./PlayerControlPanel";
import PlayerAnimationPanel from "./PlayerAnimationPanel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    height: "50%",
    width: "100%",
    padding: theme.dataGridPadding.padding,
  },
}));

export default function Player() {
  const styles = useStyles();
  return (
    <Paper style={{ borderTop: "1px solid #E87C59" }}>
      <Grid container classes={{ root: styles.gridRoot }}>
        <Grid item xs={12}>
          <PlayerControlPanel />
        </Grid>
        <Grid item xs={12}>
          <PlayerAnimationPanel />
        </Grid>
      </Grid>
    </Paper>
  );
}
