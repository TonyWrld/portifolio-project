const backendUrl = 'https://portifolio-project-66d5.onrender.com/api/profile';

const apiStatusText = document.getElementById('statusText');
const bioEl = document.getElementById('bio');
const skillsList = document.getElementById('skillsList');
const educationList = document.getElementById('educationList');
const projectsList = document.getElementById('projectsList');
const contactInfo = document.getElementById('contactInfo');
const socialLinks = document.getElementById('socialLinks');
const contactForm = document.getElementById('contactForm');
const contactFormStatus = document.getElementById('contactFormStatus');
const statProjects = document.getElementById('statProjects');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.getElementById('primaryNav');
const navLinks = document.querySelectorAll('.nav-links a');

const fallbackProfile = {
  name: 'Mostone Method Ndaula',
  bio: 'Data science student at East African Statistical Training Center (EASTC), building practical systems and data-driven solutions for business and community impact.',
  skills: [
    { name: 'Python', level: 92 },
    { name: 'Data Analysis', level: 88 },
    { name: 'Machine Learning', level: 82 },
    { name: 'SQL', level: 85 },
    { name: 'JavaScript', level: 78 },
    { name: 'Web Development', level: 80 },
  ],
  education: {
    course: 'Bachelor Degree in Data Science',
    institution: 'East African Statistical Training Center (EASTC)',
    description: 'Focused on applied statistical modeling, data engineering, and practical system development.',
    timeline: [
      '2023 - Graduated Advanced Level at Azania Secondary School',
      '2024 - Started Data Science degree at EASTC',
      '2025 - Built Car Dealership, Hospital, and Agricultural systems',
    ],
  },
  projects: [
    {
      name: 'Car Dealership System',
      description: 'Inventory, customer, and sales management system for vehicle business operations.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Node.js'],
    },
    {
      name: 'Hospital Management System',
      description: 'Patient, appointment, and records dashboard for improving hospital workflows.',
      technologies: ['Python', 'Django', 'SQL'],
    },
    {
      name: 'Agricultural Management System',
      description: 'Farm operations portal for crop tracking, resource planning, and reporting.',
      technologies: ['Python', 'Pandas', 'Visualization'],
    },
  ],
  contact: {
    email: 'mostonndaula5@gmail.com',
    phone: '0685574016',
    github: 'github.com/mostonndaula',
  },
};

let currentContactEmail = fallbackProfile.contact.email;

function normalizeProfile(profile) {
  const education = Array.isArray(profile.education)
    ? {
        ...fallbackProfile.education,
        timeline: profile.education,
      }
    : {
        ...fallbackProfile.education,
        ...profile.education,
        timeline: profile.education?.timeline || fallbackProfile.education.timeline,
      };

  const skills = (profile.skills || fallbackProfile.skills).map((skill, index) => {
    if (typeof skill === 'string') {
      return { name: skill, level: fallbackProfile.skills[index]?.level || 80 };
    }
    return skill;
  });

  const projects = (profile.projects || fallbackProfile.projects).map((project) => ({
    name: project.name || project.title,
    description: project.description,
    technologies: project.technologies || String(project.tech || '').split(',').map((tech) => tech.trim()).filter(Boolean),
  }));

  return {
    ...fallbackProfile,
    ...profile,
    education,
    skills,
    projects,
    contact: {
      ...fallbackProfile.contact,
      ...profile.contact,
    },
  };
}

function normalizePhone(phone) {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return `+255${digits.slice(1)}`;
  }
  return digits.startsWith('255') ? `+${digits}` : phone;
}

function createSkillElement(skill) {
  return `
    <article class="skill-pill">
      <div class="skill-top">
        <span class="skill-title">${skill.name}</span>
        <span class="skill-level">${skill.level}%</span>
      </div>
      <div class="skill-bar" aria-label="${skill.name} skill level ${skill.level}%">
        <span style="width: ${skill.level}%"></span>
      </div>
    </article>
  `;
}

function createProjectCard(project, index) {
  return `
    <article class="project-card">
      <p class="eyebrow">Project ${String(index + 1).padStart(2, '0')}</p>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="project-meta">
        ${project.technologies.map((tech) => `<span>${tech}</span>`).join('')}
      </div>
    </article>
  `;
}

function createSocialLinks(contact) {
  if (!contact.github) {
    return '';
  }

  return `
    <a class="social-link" href="https://${contact.github}" target="_blank" rel="noreferrer">GitHub</a>
  `;
}

function renderProfile(data) {
  data = normalizeProfile(data);
  const projectCount = data.projects?.length || 0;
  currentContactEmail = data.contact.email;
  bioEl.textContent = data.bio;

  if (statProjects) {
    statProjects.textContent = `${projectCount}+`;
  }

  skillsList.innerHTML = data.skills.map((skill) => createSkillElement(skill)).join('');
  educationList.innerHTML = `
    <li><strong>${data.education.course}</strong></li>
    <li>${data.education.institution}</li>
    <li>${data.education.description}</li>
    ${data.education.timeline.map((item) => `<li>${item}</li>`).join('')}
  `;
  projectsList.innerHTML = data.projects.map((project, index) => createProjectCard(project, index)).join('');

  const phoneHref = normalizePhone(data.contact.phone);
  contactInfo.innerHTML = `
    <div class="contact-item">
      <strong>Email</strong>
      <a href="mailto:${data.contact.email}">${data.contact.email}</a>
    </div>
    <div class="contact-item">
      <strong>Phone</strong>
      <a href="tel:${phoneHref}">${data.contact.phone}</a>
    </div>
  `;
  socialLinks.innerHTML = createSocialLinks(data.contact);
}

function handleContactFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const name = formData.get('name').toString().trim();
  const email = formData.get('email').toString().trim();
  const message = formData.get('message').toString().trim();

  if (!name || !email || !message) {
    contactFormStatus.textContent = 'Please complete all fields before sending.';
    return;
  }

  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:${currentContactEmail}?subject=${subject}&body=${body}`;
  contactFormStatus.textContent = 'Opening your email client...';
  event.target.reset();
}

function showStatus(message, success = true) {
  apiStatusText.textContent = message;
  apiStatusText.style.color = success ? '#a8ffdb' : '#ffd0a8';
}

function revealOnScroll() {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}

function setupMenu() {
  menuToggle?.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    document.body.classList.toggle('nav-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      document.body.classList.remove('nav-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });
}

function highlightActiveSection() {
  const sections = ['about', 'skills', 'projects', 'education', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

function loadProfile() {
  fetch(backendUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Backend did not respond');
      }
      return response.json();
    })
    .then((profile) => {
      renderProfile(profile);
      showStatus('Live backend connected. Portfolio data loaded successfully.');
    })
    .catch(() => {
      renderProfile(fallbackProfile);
      showStatus('Showing local portfolio data. Connect the backend URL when your Render API is live.', false);
    });
}

contactForm?.addEventListener('submit', handleContactFormSubmit);
setupMenu();
highlightActiveSection();
loadProfile();
revealOnScroll();
