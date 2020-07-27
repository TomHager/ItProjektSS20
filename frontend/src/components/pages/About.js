import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
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
 *
 * @author Tom Hager
 */

function About() {
  const classes = useStyles();

  return (
    <div align="center">
      <Paper elevation={0} className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h6">iKauf Project</Typography>
          <br />
          <Typography>written by Group 7</Typography>
          <br />
          <Typography align="left">Tom Hager: th116@hdm-stuttgart.de</Typography>
          <br />
          <Typography align="left">Erik Lebedkin: el027@hdm-stuttgart.de</Typography>
          <br />
          <Typography align="left">Lukas Rutkauskas: lr057@hdm-stuttgart.de</Typography>
          <br />
          <Typography align="left">Dimitrios Apazidis: da038@hdm-stuttgart.de</Typography>
          <br />
          <Typography align="left">Robin Fink: rf022@hdm-stuttgart.de</Typography>
        </div>
      </Paper>
    </div>
  );
}

export default About;
