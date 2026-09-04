/* portfolio.js — theme toggle, mobile nav, and content rendering */

/* ----------------------------------------------------------------
   Theme: the initial choice (system preference, or a remembered
   explicit pick) is applied by a small blocking script in <head>
   before first paint, so there's no flash. This file just keeps the
   toggle button and future clicks in sync with that.
   ---------------------------------------------------------------- */
function safeGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}
function safeSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    /* private browsing, storage disabled, etc. — theme just won't persist */
  }
}

function applyTheme(light) {
  document.documentElement.classList.toggle("light-mode", light);
  const btn = document.getElementById("darkModeToggle");
  if (btn) {
    btn.setAttribute("aria-pressed", String(light));
    btn.textContent = light ? "🌙 Dark mode" : "☀️ Light mode";
  }
}

function toggleTheme() {
  const isLight = !document.documentElement.classList.contains("light-mode");
  applyTheme(isLight);
  safeSet("theme", isLight ? "light" : "dark");
}

document.addEventListener("DOMContentLoaded", function () {
  // The pre-paint script in <head> already applied the class; just sync the button label.
  applyTheme(document.documentElement.classList.contains("light-mode"));

  const darkModeButton = document.getElementById("darkModeToggle");
  if (darkModeButton) {
    darkModeButton.addEventListener("click", toggleTheme);
  }

  // Obfuscated contact email — assembled at runtime to slow down scrapers.
  const emailEl = document.getElementById("contactEmail");
  if (emailEl) {
    const user = ["z", "a", "c", "h", "a", "r", "y", "b", "j", "o", "n", "e", "s", "1", "2", "3"].join("");
    const domain = ["g", "m", "a", "i", "l", ".", "c", "o", "m"].join("");
    const address = user + "@" + domain;
    emailEl.href = "mailto:" + address;
    emailEl.textContent = address;
  }

  if (document.getElementById("skillsSection")) {
    populateSkills();
  }
  if (document.getElementById("resumeSection")) {
    populateResume();
  }
  if (document.getElementById("projectsSection")) {
    populateProjects();
    initLightbox();
  }
});

/* ----------------------------------------------------------------
   Skills
   ---------------------------------------------------------------- */
const skillsData = [
  {
    category: "Languages & Web",
    items: ["HTML", "CSS", "JavaScript"]
  },
  {
    category: "Mobile Development",
    items: ["Swift", "SwiftUI", "SwiftData", "Flutter", "Dart"]
  },
  {
    category: "Cloud & Infrastructure",
    items: ["AWS", "Firebase", "Proxmox VE", "Linux"]
  },
  {
    category: "IT & Support",
    items: ["Windows & macOS troubleshooting", "Help desk ticketing", "Hardware diagnostics", "Networking basics"]
  }
];

function populateSkills() {
  const grid = document.getElementById("skillsSection");
  skillsData.forEach((group) => {
    const card = document.createElement("div");
    card.className = "skill-card";

    const h3 = document.createElement("h3");
    h3.textContent = group.category;
    card.appendChild(h3);

    const row = document.createElement("div");
    row.className = "chip-row";
    group.items.forEach((item) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = item;
      row.appendChild(chip);
    });
    card.appendChild(row);

    grid.appendChild(card);
  });
}

/* ----------------------------------------------------------------
   Resume data
   ---------------------------------------------------------------- */
const resumeData = {
  education: [
    {
      institution: "Brigham Young University–Idaho",
      degree: "B.S., Cloud Computing (in progress)",
      details: "Coursework: HTML, CSS, JavaScript, AWS, Firebase, Business Management"
    },
    {
      institution: "Lee Williams High School",
      degree: "High School Diploma"
    }
  ],
  work: [
    {
      company: "Brigham Young University–Idaho",
      role: "IT Technician",
      duration: "Apr 2024 – Present",
      description:
        "Troubleshoot OS, software, and hardware issues for faculty and staff, and support students at the walk-in help desk. Mentor newer technicians on complex tickets and manage a shared ticket queue to keep resolution times down."
    },
    {
      company: "Funds4Education (Student Consultant)",
      role: "Student Consultant",
      duration: "Mar – Apr 2025",
      description:
        "Analyzed a small nonprofit's marketing process as part of a student consulting team and proposed ways to grow visibility through social media and affiliate partnerships."
    },
    {
      company: "Kingman Bulldog Disposal",
      role: "Security Camera Installer",
      duration: "Dec 2023",
      description:
        "Installed and configured security cameras across multiple facility locations, including the software used to view recorded footage remotely."
    },
    {
      company: "KRMC Del E. Webb Wellness Center",
      role: "Lifeguard",
      duration: "Jul 2020 – Sep 2021",
      description:
        "BLS and lifeguard certified; worked solo shifts monitoring swimmers, maintaining pool cleanliness, and checking chemical levels."
    },
    {
      company: "City of Kingman",
      role: "Lifeguard",
      duration: "Jun–Aug 2020, Jun–Aug 2021",
      description:
        "Rotated through seasonal lifeguard positions monitoring swimmers and maintaining facilities."
    },
    {
      company: "KRMC",
      role: "Volunteer Help Desk Technician",
      duration: "Jul – Nov 2019",
      description: "Logged 65+ hours on the IS department's help desk team."
    }
  ],
  leadership: [
    {
      title: "Eagle Scout, Boy Scouts of America",
      duration: "Nov 2016",
      description:
        "Earned merit badges in First Aid, Survival, and Water Safety; logged 30+ hours of community service; led younger scouts at Cub Scout Camp."
    },
    {
      title: "Missionary, The Church of Jesus Christ of Latter-day Saints",
      duration: "Oct 2021 – Oct 2023",
      description: "Served in a supervisory role leading and mentoring 15–25 fellow missionaries."
    }
  ]
};

function populateResume() {
  const educationDiv = document.getElementById("education");
  resumeData.education.forEach((edu) => {
    const entry = document.createElement("div");
    entry.className = "resume-entry";

    const head = document.createElement("div");
    head.className = "resume-entry-head";
    const h3 = document.createElement("h3");
    h3.textContent = edu.institution;
    head.appendChild(h3);
    const role = document.createElement("span");
    role.className = "resume-role";
    role.textContent = edu.degree;
    head.appendChild(role);
    entry.appendChild(head);

    if (edu.details) {
      const details = document.createElement("p");
      details.className = "resume-details";
      details.textContent = edu.details;
      entry.appendChild(details);
    }
    educationDiv.appendChild(entry);
  });

  const workDiv = document.getElementById("work");
  resumeData.work.forEach((job) => {
    const entry = document.createElement("div");
    entry.className = "resume-entry";

    const head = document.createElement("div");
    head.className = "resume-entry-head";
    const h3 = document.createElement("h3");
    h3.textContent = job.company + " — " + job.role;
    head.appendChild(h3);
    const duration = document.createElement("span");
    duration.className = "resume-duration";
    duration.textContent = job.duration;
    head.appendChild(duration);
    entry.appendChild(head);

    const desc = document.createElement("p");
    desc.className = "resume-desc";
    desc.textContent = job.description;
    entry.appendChild(desc);

    workDiv.appendChild(entry);
  });

  const leadershipDiv = document.getElementById("leadership");
  resumeData.leadership.forEach((item) => {
    const entry = document.createElement("div");
    entry.className = "resume-entry";

    const head = document.createElement("div");
    head.className = "resume-entry-head";
    const h3 = document.createElement("h3");
    h3.textContent = item.title;
    head.appendChild(h3);
    const duration = document.createElement("span");
    duration.className = "resume-duration";
    duration.textContent = item.duration;
    head.appendChild(duration);
    entry.appendChild(head);

    const desc = document.createElement("p");
    desc.className = "resume-desc";
    desc.textContent = item.description;
    entry.appendChild(desc);

    leadershipDiv.appendChild(entry);
  });
}

/* ----------------------------------------------------------------
   Projects
   ---------------------------------------------------------------- */
const projectsData = [
  {
    title: "myPill-Pal",
    status: "live",
    statusLabel: "Live on the App Store",
    icon: "assets/img/pillpal-icon.png",
    description:
      "A medication tracker for iPhone and iPad. Scan a pill bottle label and VisionKit's on-device OCR pulls the name, dosage, and refill date straight into the form. Reminders run through UserNotifications, a dashboard shows what's due today, and a history log tracks doses and streaks over time — synced between iPhone and iPad, with full light and dark mode support.",
    tags: ["Swift", "SwiftUI", "SwiftData", "VisionKit", "UserNotifications"],
    links: [{ label: "View on the App Store", url: "https://apps.apple.com/us/app/mypill-pal/id6773116787" }],
    screenshots: [
      { src: "assets/img/pillpal-medications.png", alt: "myPill-Pal medication list on iPhone" },
      { src: "assets/img/pillpal-details.png", alt: "myPill-Pal medication detail screen on iPhone" },
      { src: "assets/img/pillpal-add.png", alt: "myPill-Pal add medication screen with label scanning" },
      { src: "assets/img/pillpal-ipad.png", alt: "myPill-Pal medication list on iPad" }
    ]
  },
  {
    title: "Brain Bloom",
    status: "progress",
    statusLabel: "In Progress",
    icon: "assets/img/brain-bloom.png",
    description:
      "A flashcard app that turns studying into keeping a plant alive. Every card you review earns water; pour it in and the plant grows toward flourishing, skip too many days and it wilts — with decay accelerating the closer an exam gets. The scoring, growth, and decay rules live in a standalone engine with unit tests, kept out of the UI so the balance can be tuned without touching a single screen.",
    tags: ["Flutter", "Dart", "Provider", "SQLite (sqflite)"],
    links: [],
    screenshots: []
  },
  {
    title: "Homelab Hypervisor",
    status: "progress",
    statusLabel: "In Progress",
    icon: null,
    description:
      "Turning a spare machine into a personal Proxmox VE server — a free, open-source hypervisor that runs full Linux and Windows VMs through KVM alongside lightweight LXC containers, all from one web console. Building it out as a home lab: a place to spin up isolated environments for testing, self-host backends for projects like Brain Bloom, and learn cluster storage and networking hands-on.",
    tags: ["Proxmox VE", "KVM", "LXC", "Linux", "Networking"],
    links: [],
    screenshots: []
  }
];

function populateProjects() {
  const section = document.getElementById("projectsSection");

  projectsData.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";

    const head = document.createElement("div");
    head.className = "project-head";

    const titleRow = document.createElement("div");
    titleRow.className = "project-title-row";
    if (project.icon) {
      const icon = document.createElement("img");
      icon.className = "project-icon";
      icon.src = project.icon;
      icon.alt = "";
      icon.loading = "lazy";
      titleRow.appendChild(icon);
    }
    const h3 = document.createElement("h3");
    h3.textContent = project.title;
    titleRow.appendChild(h3);
    head.appendChild(titleRow);

    const badge = document.createElement("span");
    badge.className = "status-badge " + (project.status === "live" ? "status-live" : "status-progress");
    badge.textContent = project.statusLabel;
    head.appendChild(badge);

    card.appendChild(head);

    const desc = document.createElement("p");
    desc.textContent = project.description;
    card.appendChild(desc);

    if (project.tags && project.tags.length) {
      const tagRow = document.createElement("div");
      tagRow.className = "tag-row";
      project.tags.forEach((tag) => {
        const chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = tag;
        tagRow.appendChild(chip);
      });
      card.appendChild(tagRow);
    }

    if (project.links && project.links.length) {
      const linkRow = document.createElement("div");
      linkRow.className = "project-links";
      project.links.forEach((link) => {
        const a = document.createElement("a");
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = link.label + " ↗";
        linkRow.appendChild(a);
      });
      card.appendChild(linkRow);
    }

    if (project.screenshots && project.screenshots.length) {
      const shots = document.createElement("div");
      shots.className = "screenshots";
      project.screenshots.forEach((shot) => {
        const img = document.createElement("img");
        img.src = shot.src;
        img.alt = shot.alt;
        img.loading = "lazy";
        img.tabIndex = 0;
        img.setAttribute("role", "button");
        img.setAttribute("aria-label", "View larger: " + shot.alt);
        shots.appendChild(img);
      });
      card.appendChild(shots);
    }

    section.appendChild(card);
  });
}

/* ----------------------------------------------------------------
   Screenshot lightbox
   ---------------------------------------------------------------- */
function initLightbox() {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.id = "lightbox";

  const closeBtn = document.createElement("button");
  closeBtn.className = "lightbox-close";
  closeBtn.setAttribute("aria-label", "Close image preview");
  closeBtn.textContent = "×";
  lightbox.appendChild(closeBtn);

  const img = document.createElement("img");
  img.alt = "";
  lightbox.appendChild(img);
  document.body.appendChild(lightbox);

  function open(src, alt) {
    img.src = src;
    img.alt = alt;
    lightbox.classList.add("open");
    closeBtn.focus();
  }
  function close() {
    lightbox.classList.remove("open");
  }

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".screenshots img")) {
      open(target.src, target.alt);
    } else if (target === lightbox || target === closeBtn) {
      close();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
    if (
      e.key === "Enter" &&
      document.activeElement &&
      document.activeElement.matches(".screenshots img")
    ) {
      open(document.activeElement.src, document.activeElement.alt);
    }
  });
}
