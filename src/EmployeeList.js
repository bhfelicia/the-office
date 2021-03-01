import axios from "axios";
import React, { Component } from "react";
import SingleEmployee from "./SingleEmployee";

class EmployeeList extends Component {
  constructor() {
    super();
    this.state = {
      employeeList: [],
    };
  }
  async componentDidMount() {
    const employeeList = (await axios.get("/api/employees")).data;
    this.setState({ employeeList });
  }
  render() {
    const { employeeList } = this.state;
    return employeeList.map((employee) => {
      return (
        <div key={employee.id}>
          {" "}
          <a href={`#${employee.id}`}>{employee.name}</a>
          {employee.bossId === null ? ", Aka the Big Boss" : ""}
        </div>
      );
    });
  }
}

export default EmployeeList;
