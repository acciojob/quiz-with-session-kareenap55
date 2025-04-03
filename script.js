// Qui
@@ -47,12 +47,12 @@ function renderQuestions() {
       choiceElement.setAttribute("name", `question-${i}`);
       choiceElement.setAttribute("value", choice);
       if (userAnswers[i] === choice) {
         choiceElement.checked = true;
         choiceElement.setAttribute("checked", "true");
       }
       choiceElement.addEventListener("change", () => {
 		  saveAnswer(i, choice);
 		  choiceElement.checked = true;
 	  });
         saveAnswer(i, choice);
         choiceElement.setAttribute("checked", "true");
       });
 
       const label = document.createElement("label");
       label.appendChild(choiceElement);