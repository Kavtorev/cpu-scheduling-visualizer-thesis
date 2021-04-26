import { ActionCreators } from "redux-undo";
import { stop } from "../player/playerSlice";
export const makeStep = (dispatch, payload) => {
  dispatch(ActionCreators.jump(payload));
  dispatch(stop());
};
