let storyData = null;
let currentPage = 0;
let translationVisible = false;

async function loadStory() {
  const response = await fetch("story.json");
  storyData = await response.json();
  document.getElementById("story-title").textContent = storyData.title;
  showPage(0);
}

function showPage(index) {
  const page = storyData.pages[index];
  currentPage = index;

  document.getElementById("page-title").textContent = page.title || "";
  document.getElementById("page-image").src = page.image;
  document.getElementById("page-text").textContent = page.text;
  document.getElementById("page-translation").textContent = page.translation;

  document.getElementById("prev-btn").disabled = index === 0;
  document.getElementById("next-btn").disabled = index === storyData.pages.length - 1;

  // Hide translation when changing pages
  translationVisible = false;
  document.getElementById("page-translation").style.display = "none";
  document.getElementById("toggle-translation").textContent = "Show Translation"  
}

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentPage > 0) showPage(currentPage - 1);
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentPage < storyData.pages.length - 1) showPage(currentPage + 1);
});

document.getElementById("toggle-translation").addEventListener("click", () => {
  translationVisible = !translationVisible;
  document.getElementById("page-translation").style.display = translationVisible ? "block" : "none";
  document.getElementById("toggle-translation").textContent = translationVisible ? "Hide Translation" : "Show Translation";
});

loadStory();
