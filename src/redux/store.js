import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui/uiSlice";
import playerReducer from "./player/playerSlice";

export default configureStore({
  reducer: {
    ui: uiReducer,
    player: playerReducer,
  },
});
