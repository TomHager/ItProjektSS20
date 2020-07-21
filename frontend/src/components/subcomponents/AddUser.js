import React, { Component } from 'react';
// import PropTypes from "prop-types";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import { TextField } from '@material-ui/core';

/**
 *
 *
 * @author Lukas Rutkauskas
 */

export default class AddUser extends Component {
  state = {
    userMail: '',
    user: [],
    group: [],
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // onSubmit = (e) => {
  //   e.preventDefault();

  //   this.setState({ user: "" });
  // };

  async fetchUserByMail() {
    const res = await fetch(
      `http://DESKTOP-S3RCLLP:8081/api/iKauf/users${this.state.userMail}`
    );
    const resjson = await res.json();
    this.setState({ user: resjson });
  }

  async fetchGroupByName() {
    const res = await fetch(
      `http://DESKTOP-S3RCLLP:8081/api/iKauf/groups${this.state.groupName}`
    );
    const resjson = await res.json();
    this.setState({ group: resjson });
    console.log(resjson);
  }

  addUserToGroup = (event) => {
    event.preventDefault();
    this.props.addUser(this.state.userMail);
    console.log('Added to group : ' + this.state.userMail);
    const url = 'http://desktop-s3rcllp:8081/api/iKauf/users';
    const data = {
      id: this.state.userId,
      group_membership: this.state.groupMembershipId,
    };
    fetch(url, {
      method: 'POST', // or "POST"
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then((response) => console.log('Success:', response));
  };

  render() {
    return (
      <div>
        <TextField
          type="text"
          name="user"
          style={{ flex: '10', padding: '5px' }}
          placeholder="Add user ..."
          value={this.state.user}
          onChange={this.onChange}
        ></TextField>
        <IconButton onClick={this.addUserToGroup}>
          <PersonAddIcon />
        </IconButton>
      </div>
    );
  }
}
