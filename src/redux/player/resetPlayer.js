import { resetPlayerSlice } from "./playerSlice";
import { resetSliderSlice } from "./sliderSlice";
export const resetPlayer = (dispatch) => {
  dispatch(resetPlayerSlice());
  dispatch(resetSliderSlice());
};
