import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import PlayerMetrics from "./PlayerMetrics";
import PlayerAnimatedLine from "./PlayerAnimatedLine";
import PlayerSlider from "./PlayerSlider";

const useStyles = makeStyles((theme) => ({}));
export default function PlayerAnimationPanel() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <LinearProgressWithLabel value={20} />
      </Grid>
      <Grid item xs={12}>
        <PlayerMetrics />
      </Grid>
      <Grid item xs={12}>
        <PlayerAnimatedLine />
      </Grid>
      <Grid item xs={12}>
        <Box component="div" mt={3}>
          <PlayerSlider />
        </Box>
      </Grid>
    </Grid>
  );
}
