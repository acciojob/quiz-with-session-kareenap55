document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
        { question: "What is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Jupiter" },
        { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Austen", "Dickens"], answer: "Shakespeare" },
        { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C" }
    ];

    const questionsContainer = document.getElementById("questions");
    const submitButton = document.getElementById("submit");
    const scoreDisplay = document.getElementById("score");

    // Load saved score from localStorage
    if (localStorage.getItem("score")) {
        scoreDisplay.textContent = `Your score is ${localStorage.getItem("score")} out of 5.`;
    }

    // Load saved progress from sessionStorage
    const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

    // Generate quiz questions
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.innerHTML = `<p>${q.question}</p>`;

        q.options.forEach(option => {
            const label = document.createElement("label");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `question${index}`;
            radio.value = option;
            if (savedProgress[`question${index}`] === option) {
                radio.checked = true;
            }
            radio.addEventListener("change", () => {
                savedProgress[`question${index}`] = option;
                sessionStorage.setItem("progress", JSON.stringify(savedProgress));
            });
            label.appendChild(radio);
            label.appendChild(document.createTextNode(option));
            questionDiv.appendChild(label);
        });
        questionsContainer.appendChild(questionDiv);
    });

    // Submit quiz and calculate score
    submitButton.addEventListener("click", () => {
        let score = 0;
        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name='question${index}']:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                score++;
            }
        });
        scoreDisplay.textContent = `Your score is ${score} out of 5.`;
        localStorage.setItem("score", score);
    });
});