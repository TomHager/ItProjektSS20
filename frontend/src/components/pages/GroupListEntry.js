import React from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Link,
  Grid,
  TextField,
} from "@material-ui/core";

class GroupListEntry extends Component {
  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      group: props.group,
      showGroupForm: false,
      showGroupDeleteDialog: false,
    };
  }

  /**
   * Shows the about page with the impressum
   */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states group
    const { group, showCustomerForm, showCustomerDeleteDialog } = this.state;

    return (
      <div className={classes.content}>
        <Grid container spacing={1} justify="flex-start" alignItems="center">
          <Grid item>
            <Typography variant="body1" className={classes.heading}>
              {group.get_name()}, {group.get_user_id_list()}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default GroupListEntry;
