import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import Timeline from "./Timeline";

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

const processes = [
  { name: "P1" },
  { name: "P2" },
  { name: "P3" },
  { name: "P1" },
  { name: "P2" },
  { name: "P3" },
];

export default function PlayerAnimatedLine() {
  const styles = useStyles();
  return (
    <Grid container spacing={2} classes={{ root: styles.gridRoot }} mt={3}>
      {processes.map((e) => {
        return (
          <Grid item key={Math.random() + Date.now()}>
            <Box
              display="flex"
              flexWrap="wrap"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              classes={{ root: styles.processBoxRoot }}
            >
              <Box flex="1" display="flex" alignItems="center">
                <Typography>{e.name}</Typography>
              </Box>
              <Box>
                <Timeline />
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}
