import React, { Component } from "react";
import axios from "axios";

class SingleEmployee extends Component {
  constructor() {
    super();
    this.state = {
      employee: {},
    };
  }
  async componentDidMount() {
    const employee = (
      await axios.get(`/api/employees/${this.props.employeeId}`)
    ).data;
    this.setState({ employee });
  }
  render() {
    const { employee } = this.state;
    console.log(employee);
    return <div>Famous quote: {employee.famousQuote}</div>;
  }
}

export default SingleEmployee;
