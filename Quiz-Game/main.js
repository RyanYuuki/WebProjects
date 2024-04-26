const QuestionsElmt = document.getElementById("Questions");
const OptionsElmt = document.getElementById("Options");
const PointsElmt = document.getElementById("Points");
const ChildElmts = document.querySelectorAll("#Options");

var turn = false;
const Questions = [
  "Q1. What is ***",
  "Q2. Why is **",
  "Q3. Which is ***",
  "Q4. How do i ***",
];
const Answers = ["A", "B", "C", "D"];
const Options = [
  ["A.*", "B.**", "C.***", "D.****"],
  ["A.****", "B.***", "C.**", "D.*"],
  ["A.*", "B.**", "C.***", "D.**"],
  ["A.*", "B.**", "C.***", "D.***"],
];
let Counter = 0;
let QuestionsIndex = 0;
function Game() {
  OptionsElmt.innerHTML = "";
  QuestionsElmt.textContent = Questions[QuestionsIndex];
  for (let i = 0; i < Questions.length; i++) {
    const OptionButton = document.createElement("button");
    OptionButton.className = `Option${QuestionsIndex + 1}`;
    OptionButton.textContent = Options[QuestionsIndex][i];
    OptionButton.addEventListener("click", (event) => {
      if (OptionButton.textContent[0] == Answers[QuestionsIndex]) {
        OptionButton.style.backgroundColor = "#8AFF8A";
        Counter += 10;
        PointsElmt.textContent = `Points -> ${Counter}`;
        turn = true;
      } else {
        OptionButton.style.backgroundColor = "red";
      }
      for (let j = 0; j < 4; j++) {
        if(OptionsElmt.children[j].outerText[0] != Answers[QuestionsIndex])
        {
          OptionsElmt.children[j].style.backgroundColor = "red";
        }
        else {
          OptionsElmt.children[j].style.backgroundColor = "#8AFF8A";
        }
      }

      setTimeout(() => {
        if (QuestionsIndex == Questions.length - 1) {
          QuestionsIndex = 0;
          alert(`Game Over! Your score is:${Counter}`);
        } else {
          QuestionsIndex++;
          Game();
        }
      }, 1000);
    });
    OptionsElmt.appendChild(OptionButton);
  }
}
Game();