import React from "react";
import { makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
  content: {
    margin: theme.spacing(1),
  },
}));

/**
 * Shows the about page with the impressum
 */
function Report() {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h6">KEIN Project</Typography>
        <br />
        <Typography>Writen by NULL</Typography>
      </div>
    </Paper>
  );
}

export default Report;
