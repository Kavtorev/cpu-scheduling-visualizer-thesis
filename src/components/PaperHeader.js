import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paperHeader: {
    padding: theme.dataGridHeaders.padding,
  },
}));

export default function PaperHeader({ children, ...rest }) {
  const styles = useStyles();
  console.log(styles);
  return (
    <Typography variant="h6" classes={{ root: styles.paperHeader }}>
      {children}
    </Typography>
  );
}
