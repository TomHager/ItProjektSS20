import React from "react";
import { makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

/**
 * Shows the about page with the impressum
 */
function GroupList() {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Paper className={classes.paper}>Gruppe 1</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default GroupList;
