import axios from "axios";
import React, { Component } from "react";
import axios from "axios";

class EmployeeList extends Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    const employeeList = (await axios.get("/api/employees")).data;
    this.setState({employeeList})
  }
  render(props)
  return(

  )
}
