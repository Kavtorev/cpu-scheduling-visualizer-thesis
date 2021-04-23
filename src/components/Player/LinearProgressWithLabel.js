import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import { getIndex, getNumberOfFrames } from "../../redux/player/playerSlice";

export default function LinearProgressWithLabel(props) {
  const index = useSelector(getIndex);
  const numFrames = useSelector(getNumberOfFrames);
  const percentage = (100 / numFrames) * index || 0;

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={percentage} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          percentage
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
