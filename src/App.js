import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      office: {},
      employeeList: [],
    };
  }
  async componentDidMount() {
    const office = (await axios.get("/api/office")).data;
    this.setState({ office });
    console.log(office);
  }
  render() {
    const { office } = this.state;
    return (
      <div>
        <h1>{office.companyName}</h1>
        <h2>A {office.industry} company</h2>
        <div>Located in lovely {office.location}</div>
        <hr></hr>
        <div>
          <a href="/employees">So who works here, you ask?</a>
        </div>
      </div>
    );
  }
}

export default App;
