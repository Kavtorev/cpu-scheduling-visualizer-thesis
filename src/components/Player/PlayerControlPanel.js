import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getChosenAlgorithm,
  getIsReadyToStart,
  getRows,
} from "../../redux/ui/uiSlice";
import executeAlgo from "../../algos/";
import {
  getIsPlayable,
  getIsStartedStoppedFinished,
  getIsStoppableOrAccDec,
  startAction,
  stop,
  setFrames,
  reset,
  increaseSpeed,
  descreaseSpeed,
} from "../../redux/player/playerSlice";

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
  let dispatch = useDispatch();
  let isReady = useSelector(getIsReadyToStart);
  let algo = useSelector(getChosenAlgorithm);
  let processes = useSelector(getRows);
  let isPlayable = useSelector(getIsPlayable);
  let isStoppable = useSelector(getIsStoppableOrAccDec);

  let { isStarted, isStopped, isFinished } = useSelector(
    getIsStartedStoppedFinished
  );

  let handleClick = ({ currentTarget }) => {
    if (isReady) {
      switch (currentTarget.id) {
        case "dSpeed":
          if (isStoppable) {
            dispatch(descreaseSpeed());
          }
          break;
        case "sBack":
          break;
        case "start":
          if (isPlayable) {
            let { frames } = executeAlgo(algo, processes);
            // for (let fr of frames) {
            //   // console.log("Start time", fr.start.time);
            //   // console.log("Finish time", fr.finish.time);
            //   console.log(fr.start.process.name);
            // }
            dispatch(setFrames(frames));
            dispatch(startAction());
          }
          break;
        case "stop":
          if (isStoppable) {
            dispatch(stop());
          }
          break;
        case "sForward":
          break;
        case "iSpeed":
          if (isStoppable) {
            dispatch(increaseSpeed());
          }
          break;
        case "reset":
          if (isFinished) {
            dispatch(reset());
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <Grid container justify="center" alignItems="center">
      {playerButtons.map((button) => {
        return (
          <Grid item sx={1} key={button.id}>
            <Tooltip title={button.name} aria-label={button.name.toLowerCase()}>
              <IconButton
                id={button.id}
                aria-label={button.name.toLowerCase()}
                style={{ color: `${button.color}` }}
                size="medium"
                onClick={handleClick}
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
