const { Sequelize, Model, DataTypes } = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/the_office_db",
  { logging: false }
);

class Office extends Model {}

Office.init(
  {
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.city}, ${this.state}`;
      },
    },
  },
  { sequelize: db, modelName: "offices" }
);

class Employee extends Model {}

Employee.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    famousQuote: {
      type: DataTypes.TEXT,
    },
  },
  { sequelize: db, modelName: "employees" }
);

Employee.belongsTo(Office);
Office.hasMany(Employee);

Employee.hasMany(Employee, { as: "boss" });
Employee.belongsTo(Employee, { foreignKey: "bossId" });

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    console.log("database synced!");
    const theOffice = await Office.create({
      companyName: "Dunder Mifflin",
      industry: "paper sales",
      state: "PA",
      city: "Scranton",
    });
    const michael = await Employee.create({
      name: "Michael Scott",
      famousQuote:
        "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.",
    });
    const dwight = await Employee.create({
      name: "Dwight Schrute",
      famousQuote:
        "Yes, I have a wig for every single person in the office. You never know when you're gonna need to bear a passing resemblance to someone",
    });
    const pam = await Employee.create({
      name: "Pam Beesly",
      famousQuote: "AND I FEEL GOD IN THIS CHILI’S TONIGHT.",
    });
    const jim = await Employee.create({
      name: "Jim Halpert",
      famousQuote:
        "I Am About To Do Something Very Bold At This Job That I've Never Done Before. Try.",
    });

    const stanley = await Employee.create({
      name: "Stanley Hudson",
      famousQuote: "Boy Have You Lost Your Mind, Cause I'll Help You Find It.",
    });
    const phyllis = await Employee.create({
      name: "Phyllis Vance",
      famousQuote:
        "This isn't your grandmother's Christmas party. Unless of course she's from Morocco, in which case it's very accurate",
    });
    michael.officeId = theOffice.id;

    dwight.bossId = michael.id;
    dwight.officeId = theOffice.id;

    pam.bossId = michael.id;
    pam.officeId = theOffice.id;

    jim.bossId = michael.id;
    jim.officeId = theOffice.id;

    stanley.bossId = michael.id;
    stanley.officeId = theOffice.id;

    phyllis.bossId = michael.id;
    phyllis.officeId = theOffice.id;

    await Promise.all([
      michael.save(),
      dwight.save(),
      pam.save(),
      jim.save(),
      stanley.save(),
      phyllis.save(),
    ]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  db,
  Models: {
    Office,
    Employee,
  },
  syncAndSeed,
};
