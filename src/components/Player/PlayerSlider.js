import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsRestartVisible,
  getIsResumeVisible,
  getFutureFramesLength,
} from "../../redux/player/playerSlice";
import {
  setSliderCurrentValue,
  setSliderPreviousValue,
  getSliderCurrentValue,
  getSliderPreviousValue,
} from "../../redux/player/sliderSlice";
import { makeStep } from "../../redux/player/sliderActions";

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
  const dispatch = useDispatch();
  const framesLength = useSelector(getFutureFramesLength);
  const isRestartVisible = useSelector(getIsRestartVisible);
  const isResumeVisible = useSelector(getIsResumeVisible);
  const currentVal = useSelector(getSliderCurrentValue);
  const prevValue = useSelector(getSliderPreviousValue);

  useEffect(() => {
    dispatch(setSliderCurrentValue(framesLength));
    dispatch(setSliderPreviousValue(framesLength));
  }, [framesLength, dispatch]);

  const handleOnChnageCommitted = (_, val) => {
    if (val === prevValue) return;
    makeStep(dispatch, val - prevValue);
    dispatch(setSliderPreviousValue(val));
  };

  const handleOnChange = (_, val) => {
    dispatch(setSliderCurrentValue(val));
  };

  return (
    <PrettoSlider
      value={currentVal}
      min={1}
      disabled={!(isRestartVisible || isResumeVisible)}
      max={framesLength}
      step={1}
      valueLabelDisplay="auto"
      onChangeCommitted={handleOnChnageCommitted}
      onChange={handleOnChange}
    />
  );
}
