import React, { Component } from "react";

export default class Testing extends Component {
  constructor() {
    super();
    this.state = { name: "", email: "" };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("User name : " + this.state.name);
    console.log("User Email : " + this.state.email);
    const url = "http://desktop-s3rcllp:8081/api/iKauf/users";
    const data = { id: 5, name: this.state.name, email: this.state.email };
    fetch(url, {
      method: "POST", // or "PUT"
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" onChange={this.handleChange} />
        <input type="email" name="email" onChange={this.handleChange} />
        <input type="submit" value="Add user" />{" "}
      </form>
    );
  }
}
