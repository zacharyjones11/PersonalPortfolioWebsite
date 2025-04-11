/* script.js */

// ----------------------------
// Dark/Light Mode Toggle Logic
// ----------------------------
function toggleDarkMode() {
  const body = document.body;
  // Conditional branching: check if light-mode is active
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
  } else {
    body.classList.add('light-mode');
  }
}

// ----------------------------
// DOM Content Loaded: Setup Listeners and Populate Content
// ----------------------------
document.addEventListener('DOMContentLoaded', function() {
  // Add event listener for dark mode toggle (present on both pages)
  const darkModeButton = document.getElementById('darkModeToggle');
  if (darkModeButton) {
    darkModeButton.addEventListener('click', toggleDarkMode);
  }

  // Populate resume sections if on resume.html
  if (document.getElementById('resumeSection')) {
    populateResume();
  }
  // Populate projects section if on resume.html
  if (document.getElementById('projectsSection')) {
    populateProjects();
  }
});

// ----------------------------
// Resume Data and Population Function
// ----------------------------

/* Resume Data and Population Function – Updated with Your Resume Details */
const resumeData = {
  education: [
    {
      institution: "Lee Williams High School",
      degree: "High School Diploma"
      // Optionally add a year property, e.g. year: "2018"
    },
    {
      institution: "Brigham Young University of Idaho",
      degree: "Cloud Computing Major",
      details: "HTML, CSS, JavaScript, AWS, Firebase, Business Management"
      // Optionally add a year property if needed
    }
  ],
  work: [
    {
      company: "Brigham Young University of Idaho",
      role: "IT Technician",
      duration: "April 2024 – Present",
      description:
        "Successfully resolved a variety of technical issues for faculty and administrators on-campus, including operating system, software, application, and hardware problems. Provided comprehensive assistance to students at the help desk, addressed software-related concerns with efficiency and professionalism, took on a team leader role mentoring beginner technicians with complex tickets, and efficiently managed a ticket queue to optimize workflow."
    },
    {
      company: "Kingman Bulldog Disposal",
      role: "Security Camera Installer",
      duration: "Dec 2023",
      description:
        "Installed new security cameras in multiple locations at the facility and set up the software for each camera so that users can view recorded footage anytime."
    },
    {
      company: "KRMC Del E. Webb Wellness Center",
      role: "Lifeguard",
      duration: "July 2020 – Sept 2021",
      description:
        "BLS/Lifeguard certified; acted as a solo lifeguard on duty, monitored swimmers, performed basic cleaning and mopping of the pool area, maintained pool cleanliness, and checked chemical levels."
    },
    {
      company: "City of Kingman",
      role: "Lifeguard",
      duration: "June-Aug 2020 and June-Aug 2021",
      description:
        "Served in rotating lifeguard positions, monitored swimmers, and performed basic cleaning duties."
    },
    {
      company: "KRMC",
      role: "Volunteer Help Desk Technician",
      duration: "July-Nov 2019",
      description:
        "Volunteered in the IS department as part of the Help Desk team for over 65 hours."
    },
    {
      company: "Small Business Management (Student Consultant)",
      role: "Student Consultant",
      duration: "March-April 2025",
      description:
        "As a member of the student team for Funds4Education in Rexburg, ID, performed process analysis to discover ways to increase the course's visibility via social media, Instagram, and affiliate marketing."
    }
  ],
  leadership: [
    "Eagle Scout, BSA – November 2016: Earned merit badges in First Aid, Survival, and Water Safety; completed over 30 hours of community service; and volunteered at Cub Scout Camp leading young scouts.",
    "Missionary for The Church of Jesus Christ of Latter-day Saints – Oct 2021 to Oct 2023: Served as a leader overseeing 15-25 missionaries."
  ],
  references: [
    "Dr. Adam Dawson, KRMC ER, 928-757-2101",
    "Scott Theis, Theiss@byui.edu, 208-496-7123"
  ]
};

function populateResume() {
  // EDUCATION Section
  const educationDiv = document.getElementById("education");
  if (resumeData.education && resumeData.education.length > 0) {
    resumeData.education.forEach((edu) => {
      let eduText = edu.institution;
      if (edu.degree) eduText += " — " + edu.degree;
      if (edu.year) eduText += " (" + edu.year + ")";
      if (edu.details) eduText += " - " + edu.details;
      const eduItem = document.createElement("p");
      eduItem.textContent = eduText;
      educationDiv.appendChild(eduItem);
    });
  } else {
    educationDiv.innerHTML += "<p>No education info available.</p>";
  }

  // WORK EXPERIENCE Section
  const workDiv = document.getElementById("work");
  if (resumeData.work && resumeData.work.length > 0) {
    resumeData.work.forEach((job) => {
      const headerItem = document.createElement("p");
      headerItem.textContent =
        job.company + " — " + job.role + " (" + job.duration + ")";
      workDiv.appendChild(headerItem);
      if (job.description) {
        const jobDesc = document.createElement("p");
        jobDesc.textContent = job.description;
        workDiv.appendChild(jobDesc);
      }
    });
  } else {
    workDiv.innerHTML += "<p>No work experience info available.</p>";
  }

  // LEADERSHIP Section
  const leadershipDiv = document.getElementById("leadership");
  if (resumeData.leadership && resumeData.leadership.length > 0) {
    const leadershipList = document.createElement("ul");
    leadershipList.className = "center-list";
    resumeData.leadership.forEach((leadershipSentence) => {
      var sentence = leadershipSentence; // variable for each sentence
      const li = document.createElement("li");
      li.textContent = sentence;
      leadershipList.appendChild(li);
    });
    leadershipDiv.appendChild(leadershipList);
  } else {
    leadershipDiv.innerHTML += "<p>No leadership info available.</p>";
  }

  // REFERENCES Section
  const referencesDiv = document.getElementById("references");
  if (resumeData.references && resumeData.references.length > 0) {
    const referencesList = document.createElement("ul");
    referencesList.className = "center-list";
    resumeData.references.forEach((referenceSentence) => {
      var sentence = referenceSentence; // variable for each sentence
      const li = document.createElement("li");
      li.textContent = sentence;
      referencesList.appendChild(li);
    });
    referencesDiv.appendChild(referencesList);
  } else {
    referencesDiv.innerHTML += "<p>No references info available.</p>";
  }
}


// ----------------------------
// Projects Data and Population Function
// ----------------------------

// Array of project objects demonstrating usage of objects and array methods
// Define the project data (only one project in this case)
const projectsData = [
  {
    title: "Firebase Database Project",
    screenshots: [
      "webapp-firebase.png",
      "products-firebase.png",
      "suppliers-firebase.png",
      "users-firebase.png",
      "login-firebase.png"
    ],
    description:
      "The screenshots above showcase the creation of my custom database using Firebase. I developed a web application that connects with my Firebase database, enabling the dynamic display of products and their quantities. Each modification—such as adding or removing items—automatically updates the database in real time, ensuring accurate synchronization between the front-end interface and the back-end system. Additionally, user login activity is logged and reflected within the database, as shown in the final screenshot. This project demonstrates my ability to design and implement a functional database-driven application, complete with real-time data updates and user activity tracking."
  }
];

// Populate the Projects section at the end of the second page.
function populateProjects() {
  const projectsSection = document.getElementById("projectsSection");
  
  // Loop over the projects (only one in this case)
  projectsData.forEach(project => {
    // Create a container for the project
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";
    
    // Create and append the project title
    const title = document.createElement("h3");
    title.textContent = project.title;
    projectDiv.appendChild(title);
    
    // Create and append the screenshots container (in order)
    if (project.screenshots && project.screenshots.length > 0) {
      const screenshotsContainer = document.createElement("div");
      screenshotsContainer.className = "screenshots";
      project.screenshots.forEach(imageSrc => {
        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = project.title + " screenshot";
        screenshotsContainer.appendChild(img);
      });
      projectDiv.appendChild(screenshotsContainer);
    }
    
    // Create and append the project description
    if (project.description) {
      const desc = document.createElement("p");
      desc.textContent = project.description;
      projectDiv.appendChild(desc);
    }
    
    // Append the project block to the projects section
    projectsSection.appendChild(projectDiv);
  });

  
  // Demonstrate usage of reduce: count total characters in project titles.
  const totalChars = projectsData.reduce((sum, project) => sum + project.title.length, 0);
  const charsInfo = document.createElement('p');
  charsInfo.textContent = `Total characters in project title: ${totalChars}`;
  projectsSection.appendChild(charsInfo);
}
