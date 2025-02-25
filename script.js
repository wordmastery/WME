// DOM Elements
const vocabList = document.getElementById("vocab-list");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageInfo = document.getElementById("page-info");
const searchBar = document.getElementById("search-bar");
const toggleDarkMode = document.getElementById("dark-mode-toggle");

// Variables
let currentPage = 0;
const wordsPerPage = 5;
let vocabulary = [];
let speedState = 0; // 0 = normal, 1 = slow, 2 = slower

// Fetch Data from JSON
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    vocabulary = data.vocabulary;
    renderVocabulary();
  })
  .catch((error) => console.error("Error fetching data:", error));

// Render Vocabulary
function renderVocabulary() {
  const start = currentPage * wordsPerPage;
  const end = start + wordsPerPage;
  const wordsToShow = vocabulary.slice(start, end);

  vocabList.innerHTML = wordsToShow
    .map(
      (item) => `
      <div class="vocab-item">
        <span>${item.word}</span>
        <span style="font-size: 14px; color: #555;">(${item.hindiMeaning})</span>
        <button class="listen-btn" onclick="playAudio('${item.word}')">Listen</button>
      </div>
    `
    )
    .join("");

  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = end >= vocabulary.length;

  pageInfo.textContent = `Page ${currentPage + 1} of ${Math.ceil(
    vocabulary.length / wordsPerPage
  )}`;
}

// Play Audio with Speed Adjustment
function playAudio(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";

  // Set speed based on the state
  if (speedState === 0) {
    utterance.rate = 1.0;
    speedState = 1;
  } else if (speedState === 1) {
    utterance.rate = 0.25;
    speedState = 2;
  } else {
    utterance.rate = 0.5;
    speedState = 0;
  }

  window.speechSynthesis.speak(utterance);
}

// Pagination Logic
prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    renderVocabulary();
  }
});

nextBtn.addEventListener("click", () => {
  if ((currentPage + 1) * wordsPerPage < vocabulary.length) {
    currentPage++;
    renderVocabulary();
  }
});

// Search Vocabulary
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  const filteredVocabulary = vocabulary.filter((item) =>
    item.word.toLowerCase().includes(query)
  );
  renderFilteredVocabulary(filteredVocabulary);
});

function renderFilteredVocabulary(filteredVocabulary) {
  vocabList.innerHTML = filteredVocabulary
    .map(
      (item) => `
      <div class="vocab-item">
        <span>${item.word}</span>
        <span style="font-size: 14px; color: #555;">(${item.hindiMeaning})</span>
        <button class="listen-btn" onclick="playAudio('${item.word}')">Listen</button>
      </div>
    `
    )
    .join("");
}

// Dark Mode Toggle
toggleDarkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Initial Render
renderVocabulary();
