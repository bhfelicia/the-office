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
    this.hashChange = this.hashChange.bind(this);
  }
  hashChange() {
    const employeeId = window.location.hash.slice(1);
    this.setState({ employeeId: employeeId });
  }
  async componentDidMount() {
    const employeeList = (await axios.get("/api/employees")).data;
    this.setState({ employeeList });
    window.addEventListener("hashchange", this.hashChange);
    this.setState({ selectedUserId: window.location.hash.slice(1) });
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.hashChange);
  }

  render() {
    const { employeeList, employeeId } = this.state;
    return (
      <div>
        {employeeList.map((employee) => {
          return (
            <div
              key={employee.id}
              className={employee.id === Number(employeeId) ? "selected" : ""}
            >
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
