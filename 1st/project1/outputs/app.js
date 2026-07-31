const body = document.body;
const themeToggle = document.querySelector("#themeToggle");
const backToTop = document.querySelector("#backToTop");
const searchInput = document.querySelector("#siteSearch");
const searchableCards = [...document.querySelectorAll("[data-search]")];
const navLinks = [...document.querySelectorAll(".nav-link")];

const savedTheme = localStorage.getItem("cloudHubTheme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  localStorage.setItem("cloudHubTheme", body.classList.contains("dark-mode") ? "dark" : "light");
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Form ready. Connect this to your backend or form service before deployment.");
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll("section, .learning-card, .project-grid article, .blog-list article").forEach((item) => {
  item.classList.add("fade-in");
  revealObserver.observe(item);
});

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const target = Number(entry.target.dataset.count);
    const duration = 900;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      entry.target.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.7 });

document.querySelectorAll("[data-count]").forEach((counter) => counterObserver.observe(counter));

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 600);

  const sections = [...document.querySelectorAll("main section, header")];
  let current = sections[0];
  sections.forEach((section) => {
    if (section.offsetTop - 120 <= window.scrollY) {
      current = section;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  searchableCards.forEach((card) => {
    const text = `${card.dataset.search} ${card.textContent}`.toLowerCase();
    card.style.display = text.includes(query) ? "" : "none";
  });
});
