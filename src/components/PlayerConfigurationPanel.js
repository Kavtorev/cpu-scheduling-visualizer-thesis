import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ColumnForm from "./ColumnForm";
import MenuItem from "@material-ui/core/MenuItem";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import RestoreRoundedIcon from "@material-ui/icons/RestoreRounded";
import UpdateRoundedIcon from "@material-ui/icons/UpdateRounded";
import FastForwardRoundedIcon from "@material-ui/icons/FastForwardRounded";
import FastRewindRoundedIcon from "@material-ui/icons/FastRewindRounded";
import CachedRoundedIcon from "@material-ui/icons/CachedRounded";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  algoSelectionRoot: {
    width: "100%",
  },
}));

const algorithms = [
  { label: "FIFO", value: "_FIFO" },
  { label: "SJF", value: "SJF" },
  { label: "SRTF", value: "_SRTF" },
  { label: "RR", value: "_RR" },
  { label: "Priority sch.", value: "_Priority sch." },
];

const playerButtons = [
  {
    name: "Decrease speed",
    icon: <FastRewindRoundedIcon />,
    color: "#447579",
  },
  { name: "Step Back", icon: <RestoreRoundedIcon />, color: "#5D6395" },
  { name: "Start", icon: <PlayArrowRoundedIcon />, color: "#0066CC" },
  { name: "Stop", icon: <StopRoundedIcon />, color: "#D93148" },
  { name: "Step Forward", icon: <UpdateRoundedIcon />, color: "#A9CB6C" },
  {
    name: "Increase speed",
    icon: <FastForwardRoundedIcon />,
    color: "#447579",
  },

  { name: "Reset", icon: <CachedRoundedIcon />, color: "#C11D1C" },
];

export default function PlayerConfigurationPanel() {
  const styles = useStyles();

  //TODO convert to Redux
  const [algo, setAlgo] = React.useState("_FIFO");
  const handleAlgoChange = ({ target }) => setAlgo(target.value);

  const [toggle, setToggle] = React.useState(false);
  const handleSwitchToggle = () => setToggle(!toggle);

  return (
    <Grid container alignItems="center">
      <Grid item lg={3}>
        <ColumnForm
          helperText="Please select an algorithm"
          select
          value={algo}
          onChange={handleAlgoChange}
          classes={{ root: styles.algoSelectionRoot }}
        >
          {algorithms.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </ColumnForm>
      </Grid>
      <Grid item lg={6}>
        <Grid container justify="center" alignItems="center">
          {playerButtons.map((button) => {
            return (
              <Grid item sx={1} key={button.name}>
                <Tooltip
                  title={button.name}
                  aria-label={button.name.toLowerCase()}
                >
                  <IconButton
                    aria-label={button.name.toLowerCase()}
                    style={{ color: `${button.color}` }}
                    size="medium"
                  >
                    {button.icon}
                  </IconButton>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item lg={3}>
        <FormControlLabel
          control={
            <Switch
              checked={toggle}
              onChange={handleSwitchToggle}
              name="checkedB"
              color="primary"
            />
          }
          label="W wyłaszczeniami"
        />
      </Grid>
    </Grid>
  );
}
