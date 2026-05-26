const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const profile = {
  name: "MOSTONE METHOD NDAULA",
  bio: "I am a data science student at EAST AFRICAN STATISTICAL TRAINING CENTER (EASTC), building practical systems and data-driven solutions.",
  skills: ["Python", "Data Analysis", "Machine Learning", "SQL", "JavaScript", "Web Development"],
  education: {
    course: "Bachelor Degree in Data Science",
    institution: "EAST AFRICAN STATISTICAL TRAINING CENTER (EASTC)",
    description: "Focused on applied statistical models, data engineering, and solution development for real-world business needs."
  },
  projects: [
    {
      name: "Car Dealership System",
      description: "A management platform for vehicle inventory, customer records, and sales workflows.",
      technologies: ["JavaScript", "HTML", "CSS", "Node.js"]
    },
    {
      name: "Hospital System",
      description: "A hospital management application for patient tracking, appointment scheduling, and record management.",
      technologies: ["Python", "Django", "SQL"]
    },
    {
      name: "Agricultural Management System",
      description: "A farm operations dashboard for crop, inventory, and resource management.",
      technologies: ["Python", "Pandas", "Data Visualization"]
    }
  ],
  contact: {
    email: "mostonndaula5@gmail.com",
    phone: "0685574016"
  }
};

app.get("/api/profile", (req, res) => {
  return res.json(profile);
});

app.get("/", (req, res) => {
  res.json({ message: "Mostone Method Ndaula portfolio backend is running." });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Portfolio backend API listening on port ${port}`);
});
