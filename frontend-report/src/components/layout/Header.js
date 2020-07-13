import React, { Component } from 'react';
import { Paper, Typography, Tabs, Tab } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Shows the header with the main navigation Tabs within a Paper.
 *
 * @see See Material-UIs [Tabs](https://material-ui.com/components/tabs/)
 * @see See Material-UIs [Paper](https://material-ui.com/components/paper/)
 *
 * @author Tom Hager
 * @author Christoph Kunz
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
    // const { user } = this.props;

    return (
      <div style={{ backgroundColor: '#f4f4f4' }}>
        <Paper variant="outlined">
          {/* <ProfileDropDown user={user} /> */}
          <Typography variant="h3" component="h1" align="center">
            <b>iKauf</b> your statistic Shopping App
          </Typography>
          <Typography variant="h4" component="h2" align="center">
            <u>Report</u>
          </Typography>
          {
            //   user ?
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              centered
              value={this.state.tabindex}
              onChange={this.handleTabChange}
            >
              <Tab label="My Report" component={RouterLink} to={`/report`} />
              <Tab label="About" component={RouterLink} to={`/about`} />
            </Tabs>
            // : null
          }
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
