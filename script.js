// DOM Elements
const vocabList = document.getElementById("vocab-list");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageInfo = document.getElementById("page-info");

// Variables
let currentPage = 0;
const wordsPerPage = 5;
let vocabulary = [];
const wordSpeedState = {}; // Tracks speed for each word

// Load currentPage from localStorage if available
if (localStorage.getItem("currentPage")) {
  currentPage = parseInt(localStorage.getItem("currentPage"));
}

// Fetch Data from JSON
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    vocabulary = data.vocabulary;
    renderVocabulary();
  })
  .catch((error) => console.error("Error fetching data:", error));

// Render Vocabulary
function renderVocabulary(filteredList = null) {
  const list = filteredList || vocabulary;
  const start = currentPage * wordsPerPage;
  const end = start + wordsPerPage;
  const wordsToShow = list.slice(start, end);

  vocabList.innerHTML = wordsToShow
    .map(
      (item) => `
      <div class="vocab-item">
        <span>${item.word} (${item.hindiMeaning})</span>
        <button class="listen-btn" onclick="playAudio('${item.word}')">Listen</button>
      </div>
    `
    )
    .join("");

  // Update pagination buttons
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = end >= list.length;

  // Update page info
  pageInfo.textContent = `Page ${currentPage + 1} of ${Math.ceil(list.length / wordsPerPage)}`;

  // Save current page to localStorage
  localStorage.setItem("currentPage", currentPage);

  // Scroll to the top of the list for better UX
  scrollToTop();
}

// Scroll to the Top of Vocabulary List
function scrollToTop() {
  vocabList.scrollTop = 0;
}

// Play Audio with Speed Adjustment
function playAudio(word) {
  // Initialize speed state for the word if not already done
  if (!wordSpeedState[word]) {
    wordSpeedState[word] = 0;
  }

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";

  // Set speed based on the current word's state
  if (wordSpeedState[word] === 0) {
    utterance.rate = 1.0; // Normal speed
    wordSpeedState[word] = 1;
  } else if (wordSpeedState[word] === 1) {
    utterance.rate = 0.25; // Slow speed
    wordSpeedState[word] = 2;
  } else {
    utterance.rate = 0.5; // Slower speed
    wordSpeedState[word] = 0; // Reset state
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

// Search Word
function searchWord(query) {
  const filteredWords = vocabulary.filter((item) =>
    item.word.toLowerCase().includes(query.toLowerCase())
  );
  currentPage = 0; // Reset to first page for search
  renderVocabulary(filteredWords);
}

// Initial Render
renderVocabulary();
