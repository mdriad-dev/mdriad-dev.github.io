const phrases = ["useful software", "backend APIs", "data solutions", "automation tools"];
const typedText = document.getElementById("typedText");
let phraseIndex = 0, charIndex = 0, deleting = false;
function typeLoop() {
  if (!typedText || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const phrase = phrases[phraseIndex];
  charIndex += deleting ? -1 : 1;
  typedText.textContent = phrase.slice(0, charIndex);
  let delay = deleting ? 45 : 78;
  if (!deleting && charIndex === phrase.length) { deleting = true; delay = 1400; }
  else if (deleting && charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 350; }
  setTimeout(typeLoop, delay);
}
setTimeout(typeLoop, 500);

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const heroArt = document.querySelector(".hero-art");
if (motionAllowed && heroArt) {
  heroArt.addEventListener("pointermove", event => {
    const rect = heroArt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroArt.style.setProperty("--tilt-y", `${-7 + x * 8}deg`);
    heroArt.style.setProperty("--tilt-x", `${2 - y * 6}deg`);
    document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
  });
  heroArt.addEventListener("pointerleave", () => {
    heroArt.style.setProperty("--tilt-y", "-7deg");
    heroArt.style.setProperty("--tilt-x", "2deg");
  });
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min((i % 4) * 70, 210)}ms`;
  revealObserver.observe(el);
});
document.getElementById("year").textContent = new Date().getFullYear();

const featured = new Set([
  "CampusOneWeb", "CampusOneAndroid", "blood-system",
  "coaching-management-system"
]);
const repoGrid = document.getElementById("repoGrid");
const repoNote = document.getElementById("repoNote");
function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function repoCard(repo) {
  const language = repo.language || "Project";
  const description = repo.description || "A project and learning experiment from my GitHub profile.";
  return `<a class="repo-card" href="${escapeHTML(repo.html_url)}" target="_blank" rel="noreferrer">
    <div class="repo-card-top"><span class="repo-icon">⌘</span><h4>${escapeHTML(repo.name)}</h4><span class="external-link">↗</span></div>
    <p>${escapeHTML(description.length > 110 ? description.slice(0, 107) + "…" : description)}</p>
    <div class="repo-card-foot"><span><i class="language-dot"></i>${escapeHTML(language)}</span><span>⑂ ${Number(repo.forks_count || 0)}</span><span>★ ${Number(repo.stargazers_count || 0)}</span></div>
  </a>`;
}
async function loadRepositories() {
  try {
    const response = await fetch("https://api.github.com/users/mdriad-dev/repos?sort=updated&per_page=100");
    if (!response.ok) throw new Error("GitHub API response was not available");
    const repos = await response.json();
    const visible = repos
      .filter(repo => !repo.fork && !repo.archived)
      .sort((a, b) => {
        const aFeatured = featured.has(a.name) ? 1 : 0;
        const bFeatured = featured.has(b.name) ? 1 : 0;
        return bFeatured - aFeatured || new Date(b.updated_at) - new Date(a.updated_at);
      })
      .slice(0, 6);
    if (!visible.length) throw new Error("No public repositories found");
    repoGrid.innerHTML = visible.map(repoCard).join("");
    repoNote.textContent = `Showing ${visible.length} public repositories from github.com/mdriad-dev. Updated automatically when the page loads.`;
  } catch (error) {
    repoGrid.innerHTML = `<div class="repo-loading">Could not load the live feed right now. <a class="text-link" href="https://github.com/mdriad-dev?tab=repositories" target="_blank" rel="noreferrer">Browse all repositories ↗</a></div>`;
    repoNote.textContent = "The featured projects above remain available. The live repository feed requires an internet connection and the public GitHub API.";
  }
}
loadRepositories();
