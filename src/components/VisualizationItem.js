import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import FolderIcon from "@material-ui/icons/Folder";
import { makeStyles } from "@material-ui/core/styles";
import { ListItemText } from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  listItemAvatarRoot: {
    color: "#9A9A9A",
  },
}));

export default function VisualizationItem({ name }) {
  const styles = useStyles();
  return (
    <ListItem button>
      <ListItemAvatar classes={{ root: styles.listItemAvatarRoot }}>
        <FolderIcon />
      </ListItemAvatar>
      <ListItemText>{name}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
