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
    error: false,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // onSubmit = (e) => {
  //   e.preventDefault();

  // };
  validateCreate = (e) => {
    this.state.retailer.trim() === ''
      ? this.setState({ error: true })
      : this.handleCreateRetailer(e);
  };

  handleCreateRetailer = (event) => {
    this.setState({ error: false });
    event.preventDefault();
    const { retailer } = this.state;
    this.props.addRetailer(retailer);
    console.log('Created Group : ' + retailer);
    const url = 'http://desktop-s3rcllp:8081/api/iKauf/retailers';
    const data = { name: retailer };
    console.log('hier');
    document.getElementById('retailerInput').value = '';
    this.setState({ retailer: '' });

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
          id="retailerInput"
          name="retailer"
          style={{ flex: '10', padding: '5px' }}
          placeholder="Enter Retailername ..."
          onChange={this.onChange}
          error={this.state.error}
        ></TextField>
        <IconButton onClick={this.validateCreate.bind(this)}>
          <AddIcon />
        </IconButton>
      </div>
    );
  }
}
