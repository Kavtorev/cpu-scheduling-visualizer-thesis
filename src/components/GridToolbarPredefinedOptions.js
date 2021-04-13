import React, { memo } from "react";
import {
  GridFilterToolbarButton,
  GridDensitySelector,
  GridToolbarExport,
} from "@material-ui/data-grid";
import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";
import Button from "@material-ui/core/Button";
function GridToolBarImport() {
  return (
    <>
      <Button aria-label="Upload data" size="small">
        <PublishOutlinedIcon />
        Import
      </Button>
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
