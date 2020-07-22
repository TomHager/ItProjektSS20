import React, { Component } from 'react';
// import PropTypes from "prop-types";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import { TextField } from '@material-ui/core';
import GroupMembershipBO from '../../api/GroupMembershipBO';
import ShoppingAPI from '../../api/ShoppingAPI';

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
    const membership = new GroupMembershipBO();
    membership.setGroupMember(this.state.userID);
    membership.setGroupMembership(this.state.groupID);
    ShoppingAPI.getAPI().addGroupMembership(membership);
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
