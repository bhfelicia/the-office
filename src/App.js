import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      office: {},
    };
  }
  async componentDidMount() {
    const office = (await axios.get("/api/office")).data;
    this.setState({ office });
    console.log(office);
  }
}
