import React, { Component } from 'react';
// import PropTypes from "prop-types";
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { TextField } from '@material-ui/core';

/**
 *
 * @author Robin Fink
 * @author Lukas Rutkauskas
 */

export default class AddRetailer extends Component {
  state = {
    retailer: '',
    retailerName: '',
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // onSubmit = (e) => {
  //   e.preventDefault();

  // };

  handleCreateRetailer = (event) => {
    event.preventDefault();
    this.props.addRetailer(this.state.retailer);
    console.log('Created Group : ' + this.state.retailer);
    const url = 'http://desktop-s3rcllp:8081/api/iKauf/retailers';
    const data = { name: this.state.retailer };
    fetch(url, {
      method: 'POST', // or "POST"
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then((response) => console.log('Success:', response));
  };

  handleRetailerNameOnChange = (event) => {
    this.setState({ retailerName: event.target.value });
  };

  render() {
    return (
      <div>
        <TextField
          type="text"
          name="retailer"
          style={{ flex: '10', padding: '5px' }}
          placeholder="Enter Retailername ..."
          value={this.state.retailer}
          onChange={this.onChange}
        ></TextField>
        <IconButton onClick={this.handleCreateRetailer.bind(this)}>
          <AddIcon />
        </IconButton>
      </div>
    );
  }
}
