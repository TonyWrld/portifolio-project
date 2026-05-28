const backendUrl = 'https://portifolio-project-66d5.onrender.com/api/profile';
const apiStatusText = document.getElementById('statusText');
const bioEl = document.getElementById('bio');
const skillsList = document.getElementById('skillsList');
const educationList = document.getElementById('educationList');
const projectsList = document.getElementById('projectsList');
const contactInfo = document.getElementById('contactInfo');

const fallbackProfile = {
  bio: 'Data science student at EAST AFRICAN STATISTICAL TRAINING CENTER (EASTC), building practical systems and data-driven solutions.',
  skills: ['Python', 'Data Analysis', 'Machine Learning', 'SQL', 'JavaScript', 'Web Development'],
  education: [
    'Bachelor Degree in Data Science, EASTC',
    'Projects: Car Dealership System, Super Chef Delivery, Hospital System, Agricultural Management System',
  ],
  projects: [
    {
      title: 'Car Dealership System',
      description: 'A management application for tracking inventory, customers, and sales for a dealership.',
      tech: 'JavaScript, HTML, CSS, Node.js',
    },
    {
      title: 'Super Chef Delivery',
      description: 'A food delivery application for managing orders, drivers, and Ordering private chefs.',
      tech: 'React, Node.js, MongoDB',
    },
    {
      title: 'Hospital System',
      description: 'A hospital management system to handle patient records, appointments, and workflows.',
      tech: 'Python, Django, SQL',
    },
    {
      title: 'Agricultural Management System',
      description: 'A system for farm and crop tracking to improve agricultural operations.',
      tech: 'Python, Pandas, Data Visualization',
    },
  ],
  contact: {
    email: 'mostonndaula5@gmail.com',
    phone: '0685574016',
    linkedin: '',
    github: '',
  },
};

function renderProfile(data) {
  bioEl.textContent = data.bio;

  skillsList.innerHTML = data.skills
    .map((skill) => `<div class="skill-pill">${skill}</div>`)
    .join('');

  educationList.innerHTML = `
  <li>${data.education.course}</li>
  <li>${data.education.institution}</li>
  <li>${data.education.description}</li>
`;

  projectsList.innerHTML = data.projects
    .map(
      (project) => `
      <article class="project-card">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
      <div class="project-meta">
         ${project.technologies.join(', ')}
      </div> 
    `
    )
    .join('');

  const contactItems = [
    { label: 'Email', value: data.contact.email },
    { label: 'Phone', value: data.contact.phone },
  ];

  contactInfo.innerHTML = contactItems
    .map(
      (item) => `
      <div class="contact-card-item"><strong>${item.label}</strong><span>${item.value}</span></div>`
    )
    .join('');
}

function showStatus(message, success = true) {
  apiStatusText.textContent = message;
  apiStatusText.style.color = success ? '#a5f3fc' : '#fca5a5';
}

fetch("https://portifolio-project-66d5.onrender.com/api/profile")
  .then((response) => {
    if (!response.ok) {
      throw new Error('Backend did not respond');
    }
    return response.json();
  })
  .then((profile) => {
    renderProfile(profile);
    showStatus('Loaded profile data from backend API.');
  })
  .catch(() => {
    renderProfile(fallbackProfile);
    showStatus('Using local portfolio data. Replace the backend URL to connect to your Render API.', false);
  });
