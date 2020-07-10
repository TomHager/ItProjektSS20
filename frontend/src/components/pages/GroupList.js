import React from "react";
import { makeStyles, Paper, Typography, Grid } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="GroupList-content"
          id="GroupList-header"
        >
          <Paper>Group 1</Paper>
        </AccordionSummary>
        <AccordionDetails>
          <Paper>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Paper>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default GroupList;
