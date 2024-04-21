
const questions = {
    "What is the name of Walter White's wife?": "Skyler White",
    "What is the street name for the high-quality blue methamphetamine produced by Walter White?": "Blue Sky",
    "What is the name of the lawyer who represents Walter White and Jesse Pinkman?": "Saul Goodman",
    "What is the name of the drug kingpin who goes by the alias 'Heisenberg'?": "Walter White",
    "What is the name of the nursing home where Hector Salamanca resides?": "Casa Tranquila",
    "What is the name of the bank where Walter White and his partners attempt to steal methylamine in Season 5?": "Mesa Verde",
    "What is the name of Jesse Pinkman's girlfriend(first name) who tragically dies of an overdose?": "Jane",
    "What is the name of the industrial chemical used by Walter White to make methamphetamine?": "Methylamine"
};


const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer");
const keys = Object.keys(questions);
const livesElement = document.getElementById("lives");
const form = document.getElementById("quiz");
const video = document.querySelector("video");
const boom = new Audio("boom.mp3");
let lives = 5;

window.onload = function() {
    randomiseQuestion();
}

function randomiseQuestion() {
    const randomQuestion = keys[Math.floor(Math.random() * keys.length)];
    questionElement.textContent = randomQuestion;
    answerInput.value = "";
}

function checkAnswer() {
    const question = questionElement.textContent;
    const answer = questions[question];
    const answerInputValue = answerInput.value;

    if (answerInputValue === answer) {
        randomiseQuestion();
    } else {
        boom.currentTime = 0;
        boom.play();
        lives -= 1;
        livesElement.innerHTML = "Lives left: " + lives;

        if (lives === 0) {
            video.play();
            video.addEventListener("ended", () => {
                video.style.display = "none";
                form.style.display = "none";
                alert("Run.");
            });
        } else {
            video.play();
            setTimeout(() => {
                video.pause();
                randomiseQuestion();
            }, 6000);
        }
    }
}

