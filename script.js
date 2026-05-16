const body = document.body;
const revealItems = document.querySelectorAll(".reveal");
const parallaxItems = document.querySelectorAll(".parallax");
const cursorGlow = document.querySelector(".cursor-glow");

body.classList.add("animations-ready");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.22,
    rootMargin: "0px 0px -10% 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

let ticking = false;

function updateMotion() {
  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.speed || 0);
    const scene = item.closest(".scene");
    const sceneTop = scene ? scene.getBoundingClientRect().top : 0;
    const offset = Math.max(-180, Math.min(180, -sceneTop * speed));
    item.style.transform = `translate3d(0, ${offset}px, 0)`;
  });

  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(updateMotion);
      ticking = true;
    }
  },
  { passive: true }
);

window.addEventListener(
  "pointermove",
  (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  },
  { passive: true }
);

updateMotion();
