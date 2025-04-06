// Example Questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: 0
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 1
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Dickens", "Hemingway", "Tolkien"],
    answer: 0
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "80°C", "100°C", "110°C"],
    answer: 2
  }
];

const questionsContainer = document.getElementById("questions");
const scoreDisplay = document.getElementById("score");

// Load Progress from sessionStorage
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render Questions
questions.forEach((q, index) => {
  const questionDiv = document.createElement("div");
  questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

  q.options.forEach((option, optIndex) => {
    const inputId = `q${index}_opt${optIndex}`;
    const isChecked = savedProgress[index] == optIndex ? "checked" : "";
    questionDiv.innerHTML += `
      <label>
        <input type="radio" name="q${index}" value="${optIndex}" ${isChecked}>
        ${option}
      </label><br>
    `;
  });

  questionsContainer.appendChild(questionDiv);
});

// Track changes and save progress to sessionStorage
document.querySelectorAll("input[type='radio']").forEach(input => {
  input.addEventListener("change", (e) => {
    const name = e.target.name; // q0, q1, ...
    const qIndex = parseInt(name.slice(1));
    savedProgress[qIndex] = parseInt(e.target.value);
    sessionStorage.setItem("progress", JSON.stringify(savedProgress));
  });
});

// Submit button logic
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    const selected = savedProgress[index];
    if (selected !== undefined && selected === q.answer) {
      score++;
    }
  });

  const scoreText = `Your score is ${score} out of ${questions.length}.`;
  scoreDisplay.textContent = scoreText;

  // Store score in localStorage
  localStorage.setItem("score", score);
});

// Show previous score if exists
window.addEventListener("load", () => {
  const previousScore = localStorage.getItem("score");
  if (previousScore !== null) {
    scoreDisplay.textContent = `Your score is ${previousScore} out of ${questions.length}.`;
  }
});
