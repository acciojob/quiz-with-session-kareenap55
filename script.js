// Qui 
const questions = [
   {
     question: "What is the capital of France?",
 @@ -30,27 +27,83 @@ const questions = [
   },
 ];
 
 // Display the quiz questions and choices
 // Retrieve saved answers from session storage or initialize an empty array
 let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];
 
 // Function to render the questions and previously selected answers
 function renderQuestions() {
   const questionsElement = document.getElementById("questions");
   questionsElement.innerHTML = ""; // Clear existing content
 
   for (let i = 0; i < questions.length; i++) {
     const question = questions[i];
     const questionElement = document.createElement("div");
 	  const questionElement = document.createElement("div");
     
     const questionText = document.createTextNode(question.question);
     questionElement.appendChild(questionText);
 
     for (let j = 0; j < question.choices.length; j++) {
       const choice = question.choices[j];
       const choiceElement = document.createElement("input");
       choiceElement.setAttribute("type", "radio");
       choiceElement.setAttribute("name", `question-${i}`);
       choiceElement.setAttribute("value", choice);
 
       // Check if this choice is selected
       if (userAnswers[i] === choice) {
         choiceElement.setAttribute("checked", true);
       }
 
       // Event listener to save user selection to session storage
       choiceElement.addEventListener("change", () => {
         userAnswers[i] = choice;
         sessionStorage.setItem("progress", JSON.stringify(userAnswers));
       });
 
       const choiceText = document.createTextNode(choice);
       questionElement.appendChild(choiceElement);
       questionElement.appendChild(choiceText);
     }
 
     questionsElement.appendChild(questionElement);
   }
 }
 renderQuestions();
 // Function to calculate the user's score
 function calculateScore() {
   let score = 0;
   for (let i = 0; i < questions.length; i++) {
     if (userAnswers[i] === questions[i].answer) {
       score++;
     }
   }
   return score;
 }
 
 // Function to handle the quiz submission
 function handleSubmit() {
   const score = calculateScore();
   const scoreElement = document.getElementById("score");
 
   // Display score
   scoreElement.textContent = `Your score is ${score} out of 5.`;
 
   // Save score to localStorage
   localStorage.setItem("score", score);
 }
 
 // Check if a score is already stored in localStorage
 function checkPreviousScore() {
   const storedScore = localStorage.getItem("score");
   if (storedScore) {
     const scoreElement = document.getElementById("score");
     scoreElement.textContent = `Your previous score was ${storedScore} out of 5.`;
   }
 }
 // Event listener for submit button
 document.getElementById("submit").addEventListener("click", handleSubmit);
 
 // Render the questions when the page loads
 window.onload = function () {
   renderQuestions();
   checkPreviousScore();
 };