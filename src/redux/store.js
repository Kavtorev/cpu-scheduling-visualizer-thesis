import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui/uiSlice";
import playerReducer from "./player/playerSlice";
import undoable from "redux-undo";

export default configureStore({
  reducer: {
    ui: uiReducer,
    player: undoable(playerReducer, {
      filter: function filterAction(action) {
        return action.type === "animate";
      },
    }),
  },
});
