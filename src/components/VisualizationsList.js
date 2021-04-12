import React from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { getVisualizations } from "../redux/ui/uiSlice";
import VisualizationItem from "./VisualizationItem";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import PaperHeader from "./PaperHeader";

const useStyles = makeStyles((theme) => ({
  boxRoot: {
    backgroundColor: "#215B90",
    color: "#F5F5F7",
  },
}));

export default function VisualizationsList() {
  const vis = useSelector(getVisualizations);
  const styles = useStyles();
  return (
    <List disablePadding={true}>
      <ListSubheader disableGutters={true}>
        <Box classes={{ root: styles.boxRoot }}>
          <PaperHeader>Twoje Wizualizacje</PaperHeader>
        </Box>
      </ListSubheader>
      {vis.map((e) => {
        return <VisualizationItem key={e.id} name={e.name} />;
      })}
    </List>
  );
}
