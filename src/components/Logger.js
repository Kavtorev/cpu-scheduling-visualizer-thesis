import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Chip from "@material-ui/core/Chip";
import { useSelector } from "react-redux";
import { getChosenAlgorithmName } from "../redux/ui/uiSlice";
import { getCurrentFrames } from "../redux/player/playerSlice";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  rowRoot: {
    "& .MuiTableCell-root": {
      padding: 0,
    },
  },
});

const chipMeta = [
  {
    label: "Running",
    color: "rgba(52, 218, 25, 0.5)",
  },
  {
    label: "Preempted",
    color: "rgba(220, 238, 13, 0.5)",
  },
  {
    label: "Finished",
    color: "rgba(235, 38, 61, 0.5)",
  },
];

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const algo = useSelector(getChosenAlgorithmName);
  const chip = chipMeta.find((e) => e.label === row.state);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.process.name}
        </TableCell>
        <TableCell align="left">
          <Chip
            label={chip.label}
            style={{ backgroundColor: `${chip.color}` }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow classes={{ root: classes.rowRoot }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Arrival Time</TableCell>
                    <TableCell align="center">CPU Time Left</TableCell>
                    <TableCell align="center">State</TableCell>
                    <TableCell align="center">Waiting Time</TableCell>
                    {algo.startsWith("_PRIOR") ? (
                      <TableCell align="right">Priority</TableCell>
                    ) : null}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.process.id}
                    </TableCell>
                    <TableCell align="center">
                      {row.process.arrivalTime}
                    </TableCell>
                    <TableCell align="center">
                      {row.process.cpuTimeLeft}
                    </TableCell>
                    <TableCell align="center">{row.state}</TableCell>
                    <TableCell align="center">
                      {row.process.waitingTime}
                    </TableCell>
                    {algo.startsWith("_PRIOR") ? (
                      <TableCell align="center">
                        {row.process.arrivalTime}
                      </TableCell>
                    ) : null}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function CollapsibleTable() {
  const currentFrames = useSelector(getCurrentFrames);
  return (
    <TableContainer
      component={Paper}
      style={{ borderTop: "1px solid #373B76" }}
    >
      <Table aria-label="collapsible table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Logger</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentFrames.map((frame, index) => (
            <React.Fragment key={Math.random() + Date.now() + index}>
              <Row row={frame.start} />
              <Row row={frame.finish} />
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default function Logger() {
  return <CollapsibleTable />;
}
