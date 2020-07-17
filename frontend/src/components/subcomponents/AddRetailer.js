import React, { Component } from "react";
import PropTypes from "prop-types";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { TextField } from "@material-ui/core";

export default class AddRetailer extends Component {
  state = {
    retailer: "",
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addRetailer(this.state.retailer);
    this.setState({ retailer: "" });
  };

  render() {
    return (
      <div>
        <TextField
          type="text"
          name="retailer"
          style={{ flex: "10", padding: "5px" }}
          placeholder="Enter Retailername ..."
          value={this.state.retailer}
          onChange={this.onChange}
        ></TextField>
        <IconButton onClick={this.onSubmit}>
          <AddIcon />
        </IconButton>
      </div>
    );
  }
}
