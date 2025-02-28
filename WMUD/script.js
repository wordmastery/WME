// Variables
let currentPage = 0;
const wordsPerPage = 5;
let vocabulary = [];
let currentQuestion = 0;

// Fetch Words Data
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    vocabulary = data.vocabulary;
    loadVocabulary();
    loadQuestion();
  });

// Load Vocabulary
function loadVocabulary() {
  const vocabList = document.getElementById("vocab-list");
  const start = currentPage * wordsPerPage;
  const end = start + wordsPerPage;
  const wordsToShow = vocabulary.slice(start, end);

  vocabList.innerHTML = wordsToShow
    .map(
      (word) => `
      <div class="vocab-item">
        <span>${word.word} - ${word.meaning}</span>
        <button class="listen-btn" onclick="speakWord('${word.word}')">Listen</button>
      </div>
    `
    )
    .join("");

  // Update pagination
  document.getElementById("page-info").textContent = `Page ${
    currentPage + 1
  } of ${Math.ceil(vocabulary.length / wordsPerPage)}`;
}

// Speak Word with Different Speeds
let speed = 1;

function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = speed;
  speed = speed === 1 ? 0.8 : speed === 0.8 ? 0.6 : 1; // Toggle speeds
  speechSynthesis.speak(utterance);
}

// Pagination Controls
document.getElementById("prev-btn").onclick = () => {
  if (currentPage > 0) {
    currentPage--;
    loadVocabulary();
  }
};

document.getElementById("next-btn").onclick = () => {
  if ((currentPage + 1) * wordsPerPage < vocabulary.length) {
    currentPage++;
    loadVocabulary();
  }
};

// Load Word Practice Questions
function loadQuestion() {
  const question = vocabulary[currentQuestion];
  document.getElementById("question").textContent = `What is the meaning of: ${question.word}?`;

  const options = document.getElementById("options");
  options.innerHTML = "";
  question.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      document.getElementById("result").textContent =
        option === question.meaning ? "Correct!" : "Incorrect!";
    };
    options.appendChild(btn);
  });
}

// Next Question
document.getElementById("next-question").onclick = () => {
  currentQuestion = (currentQuestion + 1) % vocabulary.length;
  loadQuestion();
};