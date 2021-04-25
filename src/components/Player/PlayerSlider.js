import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsRestartVisible,
  getIsResumeVisible,
  getFutureFramesLength,
  stop,
} from "../../redux/player/playerSlice";
import { ActionCreators } from "redux-undo";

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function PlayerSlider() {
  const [prevValue, setPrevValue] = useState(0);
  const dispatch = useDispatch();
  const framesLength = useSelector(getFutureFramesLength);
  const isRestartVisible = useSelector(getIsRestartVisible);
  const isResumeVisible = useSelector(getIsResumeVisible);

  useEffect(() => {
    setPrevValue(framesLength);
  }, [framesLength]);

  const handleOnChnageCommitted = (_, val) => {
    if (val === prevValue) return;
    if (val < prevValue) {
      dispatch(ActionCreators.jump(val - prevValue));
      dispatch(stop());
    } else {
      dispatch(ActionCreators.jump(val - prevValue));
      dispatch(stop());
    }
    setPrevValue(val);
  };

  return (
    <PrettoSlider
      defaultValue={1}
      min={1}
      disabled={!(isRestartVisible || isResumeVisible)}
      max={framesLength}
      step={1}
      valueLabelDisplay="auto"
      onChangeCommitted={handleOnChnageCommitted}
    />
  );
}
