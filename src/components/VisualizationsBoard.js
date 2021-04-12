import Paper from "@material-ui/core/Paper";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import VisualizationsList from "./VisualizationsList";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    height: "40vh",
    overflow: "auto",
  },
}));

export default function VisualizationsBoard() {
  const styles = useStyles();
  return (
    <Paper classes={{ root: styles.paperRoot }}>
      <VisualizationsList />
    </Paper>
  );
}
