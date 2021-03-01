import React, { Component } from "react";
import axios from "axios";
import EmployeeList from "./EmployeeList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      office: {},
      employeeList: [],
      showEmployees: false,
    };
    this.displayEmployees = this.displayEmployees.bind(this);
  }
  async componentDidMount() {
    const office = (await axios.get("/api/office")).data;
    this.setState({ office });
  }
  displayEmployees() {
    const { showEmployees } = this.state;
    this.setState({ showEmployees: !showEmployees });
  }
  render() {
    const { office } = this.state;
    return (
      <div>
        <h1>{office.companyName}</h1>
        <h2>A {office.industry} company</h2>
        <div>Located in lovely {office.location}</div>
        <hr></hr>
        <div id="employees" onClick={() => this.displayEmployees()}>
          <a href="#">So who works here, you ask?</a>
        </div>
        {this.state.showEmployees && (
          <div>
            <hr></hr>
            <EmployeeList />
          </div>
        )}
      </div>
    );
  }
}

export default App;
