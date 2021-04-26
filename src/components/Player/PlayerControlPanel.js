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
  getIsDeAcceleratable,
  getIsStartVisible,
  getIsRestartVisible,
  getIsResumeVisible,
  getIsStopVisible,
  startAction,
  stop,
  setFrames,
  resume,
  increaseSpeed,
  descreaseSpeed,
  restartAction,
  getFutureFramesLength,
  getCurrentFrames,
} from "../../redux/player/playerSlice";
import { makeStep } from "../../redux/player/sliderActions";
import {
  moveSliderBack,
  moveSliderForward,
} from "../../redux/player/sliderSlice";

export default function PlayerControlPanel() {
  let dispatch = useDispatch();
  let isReady = useSelector(getIsReadyToStart);
  let algo = useSelector(getChosenAlgorithm);
  let processes = useSelector(getRows);
  let isStartVisible = useSelector(getIsStartVisible);
  let isResumeVisible = useSelector(getIsResumeVisible);
  let isStopVisible = useSelector(getIsStopVisible);
  let isRestartVisible = useSelector(getIsRestartVisible);
  let isDeAcceleratable = useSelector(getIsDeAcceleratable);
  let framesLength = useSelector(getFutureFramesLength);
  let currentFramesLength = useSelector(getCurrentFrames).length;

  const playerButtons = [
    {
      id: "dSpeed",
      name: "Decrease speed",
      icon: <FastRewindRoundedIcon />,
      color: "#447579",
      style: {},
    },
    {
      id: "sBack",
      name: "Step Back",
      icon: <RestoreRoundedIcon />,
      color: "#5D6395",
      style: {},
    },
    {
      id: "start",
      name: "Start",
      icon: isStartVisible ? <PlayArrowRoundedIcon /> : <CachedRoundedIcon />,
      color: "#0066CC",
      style: {
        display: isStartVisible || isRestartVisible ? "block" : "none",
      },
    },
    {
      id: "resume",
      name: "Resume",
      icon: <PlayArrowRoundedIcon />,
      color: "#0066CC",
      style: {
        display: isResumeVisible ? "block" : "none",
      },
    },
    // {
    //   id: "restart",
    //   name: "Restart",
    //   icon: <CachedRoundedIcon />,
    //   color: "#C11D1C",
    //   style: {
    //     display: isRestartVisible ? "block" : "none",
    //   },
    // },
    {
      id: "stop",
      name: "Stop",
      icon: <StopRoundedIcon />,
      color: "#D93148",
      style: {
        display: isStopVisible ? "block" : "none",
      },
    },
    {
      id: "sForward",
      name: "Step Forward",
      icon: <UpdateRoundedIcon />,
      color: "#A9CB6C",
      style: {},
    },
    {
      id: "iSpeed",
      name: "Increase speed",
      icon: <FastForwardRoundedIcon />,
      color: "#447579",
      style: {},
    },
  ];

  let handleClick = ({ currentTarget }) => {
    if (isReady) {
      switch (currentTarget.id) {
        case "dSpeed":
          if (isDeAcceleratable) {
            dispatch(descreaseSpeed());
          }
          break;
        case "sBack":
          if (
            (isRestartVisible || isResumeVisible) &&
            currentFramesLength > 1
          ) {
            makeStep(dispatch, -1);
            dispatch(moveSliderBack());
          }
          break;
        case "start":
          let { frames } = executeAlgo(algo, processes);
          dispatch(setFrames(frames));
          dispatch(startAction());
          break;
        case "resume":
          dispatch(resume());
          break;
        case "stop":
          dispatch(stop());
          break;
        case "sForward":
          if (isRestartVisible || isResumeVisible) {
            makeStep(dispatch, 1);
            dispatch(moveSliderForward(framesLength));
          }
          break;
        case "iSpeed":
          if (isDeAcceleratable) {
            dispatch(increaseSpeed());
          }
          break;
        case "restart":
          dispatch(restartAction());
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
          <Grid item sx={1} key={button.id} style={button.style}>
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
