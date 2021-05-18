import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import PlayerMetrics from "./PlayerMetrics";
import PlayerAnimatedLine from "./PlayerAnimatedLine";
import PlayerSlider from "./PlayerSlider";
import { useDispatch, useSelector } from "react-redux";
import { getRowsLength, getSavedId } from "../../redux/ui/uiSlice";
import { resetPlayer } from "../../redux/player/resetPlayer";

export default function PlayerAnimationPanel() {
  const sId = useSelector(getSavedId);
  const rNum = useSelector(getRowsLength);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sId || !rNum) resetPlayer(dispatch);
  }, [sId, dispatch, rNum]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <LinearProgressWithLabel />
      </Grid>
      <Grid item xs={12}>
        <PlayerMetrics />
      </Grid>
      <Grid item xs={12}>
        <PlayerAnimatedLine />
      </Grid>
      <Grid item xs={12}>
        <Box component="div" mt={1}>
          <PlayerSlider />
        </Box>
      </Grid>
    </Grid>
  );
}
