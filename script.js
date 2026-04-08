const contactModal = document.getElementById("contactModal");
const contactClose = document.getElementById("contactClose");
const openContactBtn = document.getElementById("openContact");

if (openContactBtn) {
  openContactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openContactModal();
  });
}

function openContactModal() {
  if (!contactModal) return;
  contactModal.classList.add("active");
  document.body.classList.add("modal-open");
}

function closeContactModal() {
  if (!contactModal) return;
  contactModal.classList.remove("active");
  document.body.classList.remove("modal-open");
}

if (contactClose) {
  contactClose.addEventListener("click", closeContactModal);
}

if (contactModal) {
  contactModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("contact-modal-overlay")) {
      closeContactModal();
    }
  });
}

function handleHeader() {
  const header = document.querySelector(".header");
  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

function toggleShowByViewport(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementBottom = el.getBoundingClientRect().bottom;

    const visibleStart = 100;
    const visibleEnd = windowHeight - 60;

    if (elementTop < visibleEnd && elementBottom > visibleStart) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }
  });
}

function handleReveal() {
  toggleShowByViewport(".reveal");
  toggleShowByViewport(".reveal-left");
  toggleShowByViewport(".reveal-line");
  toggleShowByViewport(".reveal-up");
  toggleShowByViewport(".reveal-left-to-right");
  toggleShowByViewport(".reveal-card");
}

function handleScrollEffects() {
  handleHeader();
  handleReveal();
}

window.addEventListener("scroll", handleScrollEffects);
window.addEventListener("load", handleScrollEffects);
window.addEventListener("resize", handleScrollEffects);

const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalPageIndicator = document.getElementById("modalPageIndicator");

const modalKicker = document.getElementById("modalKicker");
const modalTitle = document.getElementById("modalTitle");
const modalYear = document.getElementById("modalYear");
const modalType = document.getElementById("modalType");
const modalRole = document.getElementById("modalRole");
const modalTools = document.getElementById("modalTools");
const modalDescription = document.getElementById("modalDescription");

const prevImageBtn = document.getElementById("prevImage");
const nextImageBtn = document.getElementById("nextImage");
const projectTriggers = document.querySelectorAll("[data-project]");

const projectData = {
  happypaws: {
    kicker: "Featured Project",
    title: "HappyPaws Website",
    year: "2025",
    type: "Pet Adoption & E-commerce",
    role: "Web Designer / Developer",
    tools: "PHP, MySQL, HTML, CSS, JavaScript",
    description:
      "HappyPaws is a pet adoption and shopping platform that integrates Pet Guides, Adoption, Community, and Shop. It connects to a backend database to enable features such as registration, login, adding to a shopping cart, and adding favorite pets. The project aims to create a warm, convenient, and user-friendly experience for pet lovers.",
    images: [
      "images/project-main.jpg",
      "images/pw1.jpg",
      "images/pw2.jpg",
      "images/pw3.jpg",
      "images/pw4.jpg",
      "images/pw5.jpg",
      "images/pw7.jpg",
      "images/pw6.jpg",
      "images/pw8.jpg",
      "images/pw9.jpg",
      "images/pw10.jpg",
      "images/pw11.jpg",
      "images/pw13.jpg"
    ]
  },

  wolf: {
    kicker: "Board Game Project",
    title: "The Wolf Is Coming",
    year: "2024",
    type: "Strategy Board Game Design",
    role: "Game Designer / Visual Designer",
    tools: "Game Design, Visual Design, Rule System",
    description:
      "The Wolf Is Coming is a farm management strategy board game centered on resource allocation, defense, and survival gameplay. The project involved concept development, rule system design, visual direction, and gameplay balancing to create an engaging tabletop experience.",
    images: [
      "images/project1.jpg",
      "images/wolf1.jpg",
      "images/wolf2.jpg",
      "images/wolf3.jpg",
      "images/wolf4.jpg",
      "images/wolf5.jpg"
    ]
  },

  fishguard: {
    kicker: "AI System Project",
    title: "FishGuard Star",
    year: "2025",
    type: "AI-Powered Aquaculture Monitoring System",
    role: "Product Designer / Front-End Developer",
    tools: "Figma, Front-End, AI Concept, UI Design",
    description:
      "FishGuard Star is an intelligent aquaculture monitoring system designed to improve fish farming management through AI-supported detection and visualized monitoring. The project explores how data, interface design, and system thinking can support a smarter aquatic farming workflow.",
    images: [
      "images/fish1.jpg",
      "images/fish2.jpg",
      "images/fish3.jpg",
      "images/fish4.jpg",
      "images/fish5.jpg",
      "images/fish6.jpg",
      "images/fish7.jpg"
    ]
  }
};

let currentProjectKey = null;
let currentImageIndex = 0;

function applyImageOrientation() {
  if (!modalImage) return;

  modalImage.classList.remove("portrait", "landscape");

  const ratio = modalImage.naturalWidth / modalImage.naturalHeight;

  if (ratio < 0.9) {
    modalImage.classList.add("portrait");
  } else {
    modalImage.classList.add("landscape");
  }
}

function updatePageIndicator(totalImages) {
  if (!modalPageIndicator) return;
  modalPageIndicator.textContent = `${currentImageIndex + 1} / ${totalImages}`;
}

function updateModalImage(images) {
  if (!modalImage || !images || !images.length) return;

  modalImage.classList.add("fade-out");

  setTimeout(() => {
    modalImage.onload = () => {
      applyImageOrientation();
      modalImage.classList.remove("fade-out");
    };

    modalImage.src = images[currentImageIndex];
    updatePageIndicator(images.length);
  }, 180);
}

function updateModalContent(projectKey) {
  const data = projectData[projectKey];
  if (!data) return;

  modalKicker.textContent = data.kicker;
  modalTitle.textContent = data.title;
  modalYear.textContent = data.year;
  modalType.textContent = data.type;
  modalRole.textContent = data.role;
  modalTools.textContent = data.tools;
  modalDescription.textContent = data.description;

  updateModalImage(data.images);
}

function openModal(projectKey) {
  currentProjectKey = projectKey;
  currentImageIndex = 0;

  updateModalContent(projectKey);

  if (modal) {
    modal.classList.add("active");
    document.body.classList.add("modal-open");
  }
}

function closeModal() {
  if (modal) {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }
}

function changeImage(direction) {
  const data = projectData[currentProjectKey];
  if (!data || !data.images.length) return;

  currentImageIndex =
    (currentImageIndex + direction + data.images.length) % data.images.length;

  updateModalImage(data.images);
}

projectTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    const key = trigger.dataset.project;
    openModal(key);
  });
});

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (prevImageBtn) {
  prevImageBtn.addEventListener("click", () => {
    changeImage(-1);
  });
}

if (nextImageBtn) {
  nextImageBtn.addEventListener("click", () => {
    changeImage(1);
  });
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

window.addEventListener("keydown", (e) => {
  const isProjectModalOpen = modal && modal.classList.contains("active");
  const isContactModalOpen = contactModal && contactModal.classList.contains("active");

  if (e.key === "Escape") {
    if (isProjectModalOpen) closeModal();
    if (isContactModalOpen) closeContactModal();
  }

  if (!isProjectModalOpen) return;

  if (e.key === "ArrowLeft") changeImage(-1);
  if (e.key === "ArrowRight") changeImage(1);
});