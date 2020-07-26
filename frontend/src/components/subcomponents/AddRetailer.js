import React, { Component } from 'react';
// import PropTypes from "prop-types";
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { TextField } from '@material-ui/core';

/**
 *
 * @author Tom Hager
 * @author Robin Fink
 * @author Lukas Rutkauskas
 */

export default class AddRetailer extends Component {
  state = {
    retailerName: '',
    error: false,
  };


  // onSubmit = (e) => {
  //   e.preventDefault();

  // };
  validateCreate = () => {
    this.state.retailerName.trim() === ''
      ? this.setState({ error: true })
      : this.handleCreateRetailer();
  };

  handleCreateRetailer = () => {
this.props.addRetailer(this.state.retailerName)
this.setState({error:false})
document.getElementById("retailerInput").value=""
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
          onChange={e=> this.setState({retailerName: e.target.value})}
          error={this.state.error}
        ></TextField>
        <IconButton onClick={this.validateCreate.bind(this)}>
          <AddIcon />
        </IconButton>
      </div>
    );
  }
}
