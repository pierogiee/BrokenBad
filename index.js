const questions = {
    "What is the name of Walter White's alias in the meth business?": "Heisenberg",
    "Who is Walter White's DEA agent brother-in-law?": "Hank Schrader",
    "What is the name of the fast-food chicken restaurant that served as a front for Gus Fring's drug operation?": "Los Pollos Hermanos"
};

const questionElement = document.getElementById("question");
const keys = Object.keys(questions);
const livesElement = document.getElementById("lives");
const form = document.getElementById("quiz");
let lives = 5;

const boom = new Audio("boom.mp3");

window.onload = function() {
    randomiseQuestion();
}

function randomiseQuestion(status) {
    const randomQuestion = keys[Math.floor(Math.random() * keys.length)];
    questionElement.textContent = randomQuestion;
    document.getElementById("answer").value = "";

    if(status == "incorrect") {
        boom.currentTime = 0;
        boom.play();
        lives -= 1;
        livesElement.innerHTML = "Lives left: " + lives;
    }

    if(lives == 0) {
        alert("Run.")
    }
}

function checkAnswer() {
    const question = questionElement.textContent;
    const answerInput = document.getElementById("answer").value;
    const answer = questions[question];

    if(answerInput == answer) {
        randomiseQuestion("correct");
    } else {
        randomiseQuestion("incorrect");
    }
}
