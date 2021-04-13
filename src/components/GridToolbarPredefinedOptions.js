import React, { memo } from "react";
import {
  GridFilterToolbarButton,
  GridDensitySelector,
  GridToolbarExport,
} from "@material-ui/data-grid";
import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";
import Button from "@material-ui/core/Button";
import { Menu, MenuItem } from "@material-ui/core";
function GridToolBarImport() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        aria-controls="import-csv"
        aria-haspopup="true"
        aria-label="Upload data"
        size="small"
        onClick={handleClick}
      >
        <PublishOutlinedIcon />
        Import
      </Button>
      <Menu
        id="import-csv"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>Upload CSV</MenuItem>
      </Menu>
    </>
  );
}

export default memo(function GridToolbarPredefinedOptions() {
  return (
    <>
      <GridDensitySelector />
      <GridToolbarExport />
      <GridToolBarImport />
      <GridFilterToolbarButton />
    </>
  );
});
