const focusLine = document.querySelector("#focus-line");
const focusItems = [
  "Backend Development",
  "Cloud Deployment",
  "CI/CD Pipelines",
  "Project Portfolio"
];

let focusIndex = 0;

if (focusLine) {
  window.setInterval(() => {
    focusIndex = (focusIndex + 1) % focusItems.length;
    focusLine.textContent = focusItems[focusIndex];
  }, 2600);
}

document.querySelectorAll(".project-card").forEach((card) => {
  const video = card.querySelector("video");

  if (!video) {
    return;
  }

  card.addEventListener("mouseenter", () => {
    video.play().catch(() => {});
  });

  card.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});
