import React, { Component } from "react";
import { makeStyles, Paper, Typography, Grid } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { SentimentSatisfied } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import ShoppingAPI from "../../api/ShoppingAPI";

/**
 * Shows the about page with the impressum
 */

class GroupList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      users: ["Jens", "Philips", "Dieter", "Günther", "Gustav"],
    };
  }

  async fetchGroups() {
    const res = await fetch("http://desktop-s3rcllp:8081/api/iKauf/groups");
    const resjson = await res.json();
    this.setState({ groups: resjson });
    console.log(this.groups);
  }

  async updateGroup(newData) {
    ShoppingAPI.getAPI().updateGroup(newData);
    this.fetchGroups();
  }

  componentDidMount() {
    this.fetchGroups();
  }

  render() {
    const { classes } = this.props;
    const { users } = this.state;
    const { groups } = this.state;
    return (
      <div>
        <Grid
          container
          direction="column"
          className={classes.lists}
          align="left"
        >
          <Grid item>
            <Accordion>
              {users.map((group) => (
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  key={group.id}
                >
                  {group.name}
                </AccordionSummary>
              ))}
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    width: "100%",
    paddingTop: "1em",
  },
  heading: {
    fontWeight: theme.typography.fontWeightRegular,
    fontWeight: "bolder",
  },
  lists: {
    fontFamily: "Roboto",
    listStyleType: "none",
  },
  listHeading: {
    fontWeight: "bolder",
  },
  page: {
    width: "70em",
    padding: "2em",
    backgroundColor: "#E3E0DF",
    marginTop: "3em",
    marginLeft: "4em",
    // border: "1px solid #000000",
  },
});

export default withStyles(styles)(GroupList);
