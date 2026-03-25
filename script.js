const year = document.getElementById("year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");

function closeMenu() {
  if (!menuBtn || !menu) return;
  menuBtn.setAttribute("aria-expanded", "false");
  menu.classList.remove("open");
}

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    const opened = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!opened));
    menu.classList.toggle("open", !opened);
  });

  menu.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.tagName.toLowerCase() === "a") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (!menu.contains(target) && !menuBtn.contains(target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCopy = document.getElementById("lightboxCopy");
const closeBtn = document.querySelector(".lightbox .close");

function closeLightbox() {
  if (lightbox instanceof HTMLDialogElement && lightbox.open) {
    lightbox.close();
  }
}

if (closeBtn instanceof HTMLElement) {
  closeBtn.addEventListener("click", closeLightbox);
}

if (lightbox instanceof HTMLDialogElement) {
  lightbox.addEventListener("click", (event) => {
    const rect = lightbox.getBoundingClientRect();
    const inDialog =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!inDialog) closeLightbox();
  });
}

for (const shot of document.querySelectorAll(".shot")) {
  shot.addEventListener("click", () => {
    if (!(lightbox instanceof HTMLDialogElement)) return;

    const img = shot.querySelector("img");
    if (!(img instanceof HTMLImageElement)) return;

    if (lightboxImg instanceof HTMLImageElement) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    }

    if (lightboxTitle) {
      lightboxTitle.textContent = shot.getAttribute("data-title") || "Creation";
    }

    if (lightboxCopy) {
      lightboxCopy.textContent = shot.getAttribute("data-copy") || "";
    }

    lightbox.showModal();
  });
}

const contactForm = document.getElementById("contactForm");
if (contactForm instanceof HTMLFormElement) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const type = String(data.get("type") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = `Demande de devis - ${type || "Calligraphie"}`;
    const body = [
      `Nom: ${name}`,
      `Email: ${email}`,
      `Type: ${type}`,
      "",
      "Message:",
      message,
      "",
      "Envoye depuis le site SOUM ART DECOR"
    ].join("\n");

    window.location.href = `mailto:soumailabalima12@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15 }
);

for (const block of document.querySelectorAll(".reveal")) {
  observer.observe(block);
}
