import React, { Component } from 'react';
import { Paper, Typography, Tabs, Tab } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ProfileDropDown from '../dialogs/ProfileDropDown';
/**
 * Shows the header with the main navigation Tabs within a Paper.
 *
 * @see See Material-UIs [Tabs](https://material-ui.com/components/tabs/)
 * @see See Material-UIs [Paper](https://material-ui.com/components/paper/)
 *
 * @author Tom Hager
 * @author Lukas Rutkauskas
 */

class Header extends Component {
  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      tabindex: 0,
    };
  }

  /** Handles onChange events of the Tabs component */
  handleTabChange = (e, newIndex) => {
    // console.log(newValue)
    this.setState({
      tabindex: newIndex,
    });
  };

  /** Renders the component */
  render() {
    const { user } = this.props;

    return (
      <div style={{ backgroundColor: '#f4f4f4' }}>
        <Paper variant="outlined">
          <ProfileDropDown user={user} />
          <Typography variant="h3" component="h1" align="center">
            <b>iKauf</b> your futuristic Shopping App
          </Typography>
          <Typography variant="h4" component="h2" align="center">
            <u>Overview</u>
          </Typography>
          {user ? (
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              centered
              value={this.state.tabindex}
              onChange={this.handleTabChange}
            >
              <Tab label="Group" component={RouterLink} to={`/groupList`} />
              {/* <Tab label="Profile" component={RouterLink} to={`/profile`} /> */}
              <Tab label="About" component={RouterLink} to={`/about`} />
            </Tabs>
          ) : null}
        </Paper>
      </div>
    );
  }
}

/** PropTypes */
// Header.propTypes = {
//   /** The logged in firesbase user */
//   user: PropTypes.object,
// }

export default Header;
