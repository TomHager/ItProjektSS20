import React, { Component } from 'react';
// import PropTypes from "prop-types";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import { TextField } from '@material-ui/core';

export default class AddUser extends Component {
  state = {
    user: '',
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addUser(this.state.user);
    this.setState({ user: '' });
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
        <IconButton onClick={this.onSubmit}>
          <PersonAddIcon />
        </IconButton>
      </div>
    );
  }
}
