// Quiz Data
const quizData = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correct: 2 },
    { question: "What is 5 * 6?", options: ["30", "25", "20", "15"], correct: 0 },
    { question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], correct: 2 },
    { question: "What is 10 / 2?", options: ["3", "4", "5", "6"], correct: 2 }
];

const questionsContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

// Load last stored score
if (localStorage.getItem("score")) {
    scoreDisplay.textContent = `Last Score: ${localStorage.getItem("score")} out of 5`;
}

// Load session storage progress
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Generate quiz questions
quizData.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<p>${q.question}</p>`;

    q.options.forEach((option, optIndex) => {
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `q${index}`;
        input.value = optIndex;
        input.checked = progress[index] == optIndex; // Restore selection

        input.addEventListener("change", () => {
            progress[index] = optIndex;
            sessionStorage.setItem("progress", JSON.stringify(progress));
        });

        questionDiv.appendChild(input);
        questionDiv.appendChild(document.createTextNode(option));
        questionDiv.appendChild(document.createElement("br"));
    });

    questionsContainer.appendChild(questionDiv);
});

// Submit button event
submitButton.addEventListener("click", () => {
    let score = 0;

    quizData.forEach((q, index) => {
        if (progress[index] == q.correct) {
            score++;
        }
    });

    scoreDisplay.textContent = `Your score is ${score} out of 5`;
    localStorage.setItem("score", score);
    sessionStorage.removeItem("progress"); // Clear progress on submit
});

