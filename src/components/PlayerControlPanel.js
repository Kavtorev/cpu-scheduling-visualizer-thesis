import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import RestoreRoundedIcon from "@material-ui/icons/RestoreRounded";
import UpdateRoundedIcon from "@material-ui/icons/UpdateRounded";
import FastForwardRoundedIcon from "@material-ui/icons/FastForwardRounded";
import FastRewindRoundedIcon from "@material-ui/icons/FastRewindRounded";
import CachedRoundedIcon from "@material-ui/icons/CachedRounded";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { useSelector } from "react-redux";
import {
  getChosenAlgorithm,
  getIsReadyToStart,
  getRows,
} from "../redux/ui/uiSlice";
import useInterval from "use-interval";
import executeAlgo from "../algos";

const playerButtons = [
  {
    id: "dSpeed",
    name: "Decrease speed",
    icon: <FastRewindRoundedIcon />,
    color: "#447579",
  },
  {
    id: "sBack",
    name: "Step Back",
    icon: <RestoreRoundedIcon />,
    color: "#5D6395",
  },
  {
    id: "start",
    name: "Start",
    icon: <PlayArrowRoundedIcon />,
    color: "#0066CC",
  },
  { id: "stop", name: "Stop", icon: <StopRoundedIcon />, color: "#D93148" },
  {
    id: "sForward",
    name: "Step Forward",
    icon: <UpdateRoundedIcon />,
    color: "#A9CB6C",
  },
  {
    id: "iSpeed",
    name: "Increase speed",
    icon: <FastForwardRoundedIcon />,
    color: "#447579",
  },

  {
    id: "reset",
    name: "Reset",
    icon: <CachedRoundedIcon />,
    color: "#C11D1C",
  },
];

export default function PlayerControlPanel() {
  const isReady = useSelector(getIsReadyToStart);
  const algo = useSelector(getChosenAlgorithm);
  const processes = useSelector(getRows);
  const delay = useState(null);

  const handleStart = (event) => {
    if (isReady) {
      executeAlgo(algo, processes);
    }
  };

  const onClickDict = {
    dSpeed: (event) => console.log(event.currentTarget),
    sBack: (event) => console.log(event.currentTarget),
    start: handleStart,
    stop: (event) => console.log(event.currentTarget),
    sForward: (event) => console.log(event.currentTarget),
    iSpeed: (event) => console.log(event.currentTarget),
    reset: (event) => console.log(event.currentTarget),
  };

  // useInterval(addNewFrame, null);

  return (
    <Grid container justify="center" alignItems="center">
      {playerButtons.map((button) => {
        return (
          <Grid item sx={1} key={button.id}>
            <Tooltip title={button.name} aria-label={button.name.toLowerCase()}>
              <IconButton
                aria-label={button.name.toLowerCase()}
                style={{ color: `${button.color}` }}
                size="medium"
                onClick={onClickDict[button.id]}
              >
                {button.icon}
              </IconButton>
            </Tooltip>
          </Grid>
        );
      })}
    </Grid>
  );
}
