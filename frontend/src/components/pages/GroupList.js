import React, { Component } from "react";
import {
  Paper,
  Typography,
  Grid,
  IconButton,
  Container,
} from "@material-ui/core";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import ShoppingAPI from "../../api/ShoppingAPI";
import EditIcon from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import GroupDialog from "../dialogs/GroupDialog";
import PropTypes from "prop-types";

class GroupList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      users: ["Jens", "Philips", "Dieter", "Günther", "Gustav"],
      showGroupDialog: false,
    };
  }

  async fetchGroups() {
    const res = await fetch("http://desktop-s3rcllp:8081/api/iKauf/groups");
    const resjson = await res.json();
    this.setState({ groups: resjson });
    console.log(this.state.groups);
  }

  async updateGroup(newData) {
    ShoppingAPI.getAPI().updateGroup(newData);
    this.fetchGroups();
  }

  componentDidMount() {
    this.fetchGroups();
  }

  editGroupButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showGroupDialog: true,
    });
  };

  customerFormClosed = (customer) => {
    console.log("It works");
    this.setState({
      showGroupDialog: false,
    });
  };

  render() {
    const { classes } = this.props;
    const { users } = this.state;
    const { groups } = this.state;
    const showGroupDialog = this.state;
    return (
      <div align="center" direction="row">
        <Paper className={classes.accordion}>
          {groups.map((group) => (
            <div key={group.id}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography align="left" className={classes.listHeading}>
                    {group.name}
                    <IconButton
                      aria-label="edit"
                      style={{ padding: "10px", marginLeft: "1em" }}
                      onClick={this.editGroupButtonClicked}
                    >
                      <EditIcon />
                    </IconButton>
                  </Typography>
                </Grid>
                <Grid item>
                  <div className={classes.lists}>
                    {users.map((user, index) => (
                      <div key={index}>
                        <List>
                          <ListItem>
                            <ListItemText primary={user} />
                          </ListItem>
                        </List>
                      </div>
                    ))}
                  </div>
                </Grid>
              </Grid>
            </div>
          ))}
        </Paper>
        <GroupDialog show={showGroupDialog} onClose={this.customerFormClosed} />
      </div>
    );
  }
}

const styles = (theme) => ({
  accordion: {
    width: "57em",
    marginTop: "3em",
    padding: "2em",
  },
  heading: {
    fontWeight: theme.typography.fontWeightRegular,
    fontWeight: "bolder",
  },
  lists: {
    fontFamily: "Roboto",
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
  },
});

export default withStyles(styles)(GroupList);
