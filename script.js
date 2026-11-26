const header = document.querySelector(".site-header");
const themeToggle = document.querySelector("[data-theme-toggle]");
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
const scrollProgress = document.querySelector(".scroll-progress");
const copyEmailButton = document.querySelector(".copy-email");
const chatPanel = document.querySelector("#portfolio-chat");
const chatLauncher = document.querySelector(".chat-launcher");
const chatCloseButton = document.querySelector(".chat-close");
const chatForm = document.querySelector(".chat-form");
const chatInput = document.querySelector("#chat-input");
const chatMessages = document.querySelector(".chat-messages");
const chatSuggestions = document.querySelector(".chat-suggestions");
let chatOpener;

const savedTheme = localStorage.getItem("portfolio-theme");
const initialTheme = savedTheme === "dark" ? "dark" : "light";
document.documentElement.dataset.theme = initialTheme;

function updateThemeToggle(theme) {
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    `Switch to ${isDark ? "light" : "dark"} mode`
  );
  themeToggle.querySelector(".theme-icon").textContent = isDark ? "☼" : "☾";
  themeToggle.querySelector(".theme-label").textContent = isDark ? "Light" : "Dark";
}

updateThemeToggle(initialTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
  updateThemeToggle(nextTheme);
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
});

menuButton.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelector("#year").textContent = new Date().getFullYear();

function addChatMessage(text, sender, link) {
  const message = document.createElement("p");
  message.className = `chat-bubble ${sender}-bubble`;
  message.textContent = text;

  if (link) {
    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.textContent = link.label;
    anchor.className = "chat-inline-link";
    message.append(" ", anchor);
  }

  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getPortfolioAnswer(question) {
  const normalized = question.toLowerCase();
  const includesAny = (...terms) => terms.some((term) => normalized.includes(term));

  if (includesAny("trace", "phishing", "ioc", "eml", "email threat")) {
    return {
      text:
        "TRACE is a team-built phishing threat-intelligence dashboard. Atharva contributed to the frontend: client-side email parsing, IOC displays, Canvas visualizations, and Leaflet.js maps. The machine-learning and backend work was handled by the team.",
    };
  }

  if (
    includesAny(
      "data vista",
      "ideathon",
      "medical",
      "health",
      "chatbot",
      "diagnos",
      "doctor",
      "hospital",
      "symptom",
      "emergency"
    )
  ) {
    return {
      text:
        "Atharva’s team placed runner-up (2nd place) at the Data Vista Ideathon, organized by the CSE department. They built a health-guidance website with a custom-trained chatbot that asks follow-up questions about symptoms, suggests possible causes, and helps users find nearby doctors, hospitals, and emergency services. It was designed as guidance, not a confirmed medical diagnosis.",
    };
  }

  if (
    includesAny(
      "education",
      "study",
      "college",
      "degree",
      "university",
      "school",
      "third year",
      "3rd year",
      "vidyaniketan",
      "amrita"
    )
  ) {
    return {
      text:
        "Atharva is a 3rd-year Computer Science Engineering student at JSS Academy of Technical Education, Bengaluru, with an 8.95 CGPA. He completed classes 11–12 at Vidyaniketan PU Science College in Hubballi and schooling at Amrita Vidyalayam in Pune.",
    };
  }

  if (
    includesAny(
      "achievement",
      "award",
      "hackathon",
      "runner-up",
      "runner up",
      "sih",
      "antariksh",
      "cgpa",
      "gpa"
    )
  ) {
    return {
      text:
        "Atharva’s team was runner-up at the Data Vista Ideathon. He was selected by his college for the Smart India Hackathon, received a certificate for the Bharatiya Antariksh Hackathon, and has an 8.95 CGPA.",
    };
  }

  if (includesAny("skill", "technology", "technologies", "language", "stack", "tool")) {
    return {
      text:
        "The portfolio lists C, C++, JavaScript, HTML, CSS, DOM APIs, REST APIs, Canvas, Leaflet.js, Git, GitHub, VS Code, and Postman. Atharva’s strongest project experience is frontend development and data visualization.",
    };
  }

  if (includesAny("contact", "email", "reach", "hire", "resume", "résumé", "cv")) {
    return {
      text: "You can email Atharva at atharvajoshi20060708@gmail.com.",
      link: {
        href: "mailto:atharvajoshi20060708@gmail.com",
        label: "Email Atharva",
      },
    };
  }

  if (includesAny("about", "who", "atharva", "yourself")) {
    return {
      text:
        "Atharva Joshi is a 3rd-year Computer Science Engineering student in Bengaluru, interested in building clear frontend experiences for data-heavy and cybersecurity problems.",
    };
  }

  if (
    includesAny(
      "how are you",
      "how are u",
      "how r u",
      "how're you",
      "how is it going",
      "how's it going",
      "what's up"
    )
  ) {
    return {
      text:
        "I’m doing well, thanks for asking! I’m Atharva’s portfolio assistant. How are you?",
    };
  }

  if (includesAny("i'm good", "im good", "i am good", "doing good", "doing well", "pretty good")) {
    return {
      text:
        "Glad to hear it! Want to chat about one of Atharva’s projects, or is there anything else you’re curious about?",
    };
  }

  if (includesAny("thank", "thanks", "thx")) {
    return {
      text: "You’re welcome! Anything else you’d like to know?",
    };
  }

  if (includesAny("bye", "goodbye", "see you", "talk later")) {
    return {
      text: "See you! Thanks for stopping by, and have a great day.",
    };
  }

  if (/^(hi|hello|hey|heya|hiya|yo|good morning|good afternoon|good evening)\b/.test(normalized)) {
    return {
      text:
        "Hey! Nice to meet you. I’m Atharva’s portfolio assistant—how’s your day going?",
    };
  }

  if (includesAny("what can you do", "what can i ask", "help")) {
    return {
      text:
        "Happy to help! I can tell you about Atharva’s projects, studies, skills, hackathons, or how to get in touch. You can also just say hi.",
    };
  }

  return {
    text:
      "I’m not sure about that one, but I’m happy to chat! I know about Atharva’s projects, studies, skills, and hackathons. What are you curious about?",
  };
}

function sendChatQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;

  addChatMessage(cleanQuestion, "user");
  const answer = getPortfolioAnswer(cleanQuestion);
  addChatMessage(answer.text, "assistant", answer.link);
  if (chatInput) {
    chatInput.value = "";
    chatInput.focus();
  }
  chatSuggestions?.remove();
}

document.querySelectorAll("[data-open-chat]").forEach((button) => {
  button.addEventListener("click", () => {
    chatOpener = button;
    chatPanel?.classList.add("open");
    chatPanel?.setAttribute("aria-hidden", "false");
    chatLauncher?.setAttribute("aria-expanded", "true");
    document.querySelector(".chat-invitation")?.classList.add("dismissed");
    chatInput?.focus();
  });
});

chatCloseButton?.addEventListener("click", () => {
  chatPanel?.classList.remove("open");
  chatPanel?.setAttribute("aria-hidden", "true");
  chatLauncher?.setAttribute("aria-expanded", "false");
  chatOpener?.focus();
});

document.querySelector(".chat-invitation-dismiss")?.addEventListener("click", () => {
  document.querySelector(".chat-invitation")?.classList.add("dismissed");
});

chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (chatInput) sendChatQuestion(chatInput.value);
});

chatSuggestions?.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => {
    sendChatQuestion(button.dataset.question);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && chatPanel.classList.contains("open")) {
    chatCloseButton.click();
  }
  if (event.key === "Escape" && certModal?.classList.contains("open")) {
    closeCertModal();
  }
});

const certModal = document.querySelector("#cert-modal");
const certModalClose = document.querySelector("[data-close-cert-modal]");
const certModalImage = certModal?.querySelector(".cert-modal-image");
const certModalPdf = certModal?.querySelector(".cert-modal-pdf");
let certModalOpener;

function openCertModal(opener) {
  if (!certModal) return;
  certModalOpener = opener;
  const src = opener?.dataset.certSrc;
  const alt = opener?.dataset.certAlt || "Certificate";
  const isPdf = opener?.dataset.certType === "pdf";

  if (isPdf && certModalPdf && src) {
    if (certModalImage) certModalImage.hidden = true;
    certModalPdf.hidden = false;
    certModalPdf.src = `${src}#toolbar=0&navpanes=0`;
    certModalPdf.title = alt;
  } else if (certModalImage) {
    if (certModalPdf) {
      certModalPdf.hidden = true;
      certModalPdf.src = "";
    }
    certModalImage.hidden = false;
    if (src) certModalImage.src = src;
    certModalImage.alt = alt;
  }

  certModal.classList.add("open");
  certModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  certModalClose?.focus();
}

function closeCertModal() {
  if (!certModal) return;
  certModal.classList.remove("open");
  certModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  certModalOpener?.focus();
}

document.querySelectorAll("[data-open-cert-modal]").forEach((button) => {
  button.addEventListener("click", () => openCertModal(button));
});

certModalClose?.addEventListener("click", closeCertModal);

certModal?.addEventListener("click", (event) => {
  if (event.target === certModal) {
    closeCertModal();
  }
});

copyEmailButton?.addEventListener("click", async () => {
  const email = copyEmailButton.dataset.email;
  const label = copyEmailButton.querySelector("span");

  try {
    await navigator.clipboard.writeText(email);
  } catch {
    const temporaryInput = document.createElement("textarea");
    temporaryInput.value = email;
    document.body.appendChild(temporaryInput);
    temporaryInput.select();
    document.execCommand("copy");
    temporaryInput.remove();
  }

  label.textContent = "Email copied";
  window.setTimeout(() => {
    label.textContent = "Copy email";
  }, 1800);
});

