import axios from "axios";
import React, { Component } from "react";
import SingleEmployee from "./SingleEmployee";

class EmployeeList extends Component {
  constructor() {
    super();
    this.state = {
      employeeList: [],
      employeeId: "",
    };
  }
  async componentDidMount() {
    const employeeList = (await axios.get("/api/employees")).data;
    this.setState({ employeeList });
    window.addEventListener("hashchange", () => {
      const employeeId = window.location.hash.slice(1);
      this.setState({ employeeId: employeeId });
    });
    this.setState({ selectedUserId: window.location.hash.slice(1) });
  }

  render() {
    const { employeeList, employeeId } = this.state;
    return (
      <div>
        {employeeList.map((employee) => {
          return (
            <div key={employee.id}>
              <a href={`#${employee.id}`}>{employee.name}</a>
              {employee.bossId === null ? ", Aka the Big Boss" : ""}
            </div>
          );
        })}
        <hr></hr>
        <div>{!!employeeId && <SingleEmployee employeeId={employeeId} />}</div>
      </div>
    );
  }
}

export default EmployeeList;
