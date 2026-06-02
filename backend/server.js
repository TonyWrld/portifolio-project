const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const profile = {
  name: "Mostone Method Ndaula",
  bio: "Data science student at East African Statistical Training Center (EASTC), building practical systems and data-driven solutions for business and community impact.",
  skills: [
    { name: "Python", level: 92 },
    { name: "Data Analysis", level: 88 },
    { name: "Machine Learning", level: 82 },
    { name: "SQL", level: 85 },
    { name: "JavaScript", level: 78 },
    { name: "Web Development", level: 80 },
  ],
  education: {
    course: "Bachelor Degree in Data Science",
    institution: "East African Statistical Training Center (EASTC)",
    description: "Focused on applied statistical modeling, data engineering, and practical system development.",
    timeline: [
      "2023 - Graduated Advanced Level at Azania Secondary School",
      "2024 - Started Data Science degree at EASTC",
      "2025 - Built Car Dealership, Hospital, and Agricultural systems",
    ],
  },
  projects: [
    {
      name: "Car Dealership System",
      description: "Inventory, customer, and sales management system for vehicle business operations.",
      technologies: ["JavaScript", "HTML", "CSS", "Node.js"],
    },
    {
      name: "Hospital Management System",
      description: "Patient, appointment, and records dashboard for improving hospital workflows.",
      technologies: ["Python", "Django", "SQL"],
    },
    {
      name: "Agricultural Management System",
      description: "Farm operations portal for crop tracking, resource planning, and reporting.",
      technologies: ["Python", "Pandas", "Visualization"],
    },
  ],
  contact: {
    email: "mostonndaula5@gmail.com",
    phone: "0685574016",
    github: "github.com/mostonndaula",
  },
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
