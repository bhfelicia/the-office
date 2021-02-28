const {
  Models: { Office, Employee },
  syncAndSeed,
} = require("./db");

const express = require("express");

const app = express();

app.get("/api/office", async (req, res, next) => {
  try {
    const office = await Office.findAll();
    res.send(office);
  } catch (error) {
    next(error);
  }
});

app.get("/api/employees", async (req, res, next) => {
  try {
    const employees = await Employee.findAll({
      include: {
        model: Employee,
        alias: "boss",
      },
    });
    res.send(employees);
  } catch (error) {
    next(error);
  }
});

app.get("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      include: {
        model: Employee,
        alias: "boss",
      },
    });
    res.send(employee);
  } catch (error) {
    next(error);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
init();
