import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import Timeline from "./Timeline";
import { useDispatch, useSelector } from "react-redux";
import {
  getFrames,
  finish,
  getIsStartedStoppedFinished,
  getSpeed,
  getIndex,
  animateAction,
  getCurrentFrames,
} from "../../redux/player/playerSlice";
import useInterval from "use-interval";
import { useTransition, animated } from "react-spring";
import ScrollContainer from "react-indiana-drag-scroll";
import "./ScrollContainer.css";

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    height: 130,
    marginTop: "0.9em",
    width: "100%",
    flexWrap: "nowrap",
    overflow: "auto",
  },
  processBoxRoot: {
    width: 182,
    height: 88,
    backgroundColor: "#C4C4C4",
  },
}));

export default function PlayerAnimatedLine() {
  const styles = useStyles();
  const dispatch = useDispatch();
  let speed = useSelector(getSpeed);
  let frames = useSelector(getFrames);
  let index = useSelector(getIndex);
  let items = useSelector(getCurrentFrames);

  let { isStarted, isStopped, isFinished } = useSelector(
    getIsStartedStoppedFinished
  );

  let transition = useTransition(items, {
    onPause: () => console.log("paused?"),
    config: {
      duration: 1000,
    },
    keys: items.map((el, index) => el),
    from: { opacity: "0", transform: "translate(15px, 0)" },
    enter: { opacity: "1", transform: "translate(0, 0)" },
    leave: { opacity: "0" },
  });

  let handleFramePush = () => {
    if (!isFinished) {
      if (frames.length && index < frames.length) {
        dispatch(animateAction(index));
      } else dispatch(finish());
    }
  };
  useInterval(handleFramePush, speed);

  return (
    <ScrollContainer
      className="scroll-container"
      vertical={false}
      hideScrollbars={false}
    >
      {transition(
        (prop, item) =>
          item && (
            <Grid item>
              <animated.div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 182,
                  height: 88,
                  backgroundColor: "#C4C4C4",
                  ...prop,
                }}
              >
                <Box flex="1" display="flex" alignItems="center">
                  <Typography>{item.start.process.id}</Typography>
                </Box>
                <Box>
                  <Timeline start={item.start.time} finish={item.finish.time} />
                </Box>
              </animated.div>
            </Grid>
          )
      )}
    </ScrollContainer>
  );
}
