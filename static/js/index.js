
const questions = {
    "What is the name of Walter White's wife?": "Skyler White",
    "What is the 'street name' for the high-quality blue methamphetamine produced by Walter White?": "Blue Sky",
    "Who is the lawyer representing Walter White and Jesse Pinkman?": "Saul Goodman",
    "Who is the drug kingpin known by the alias 'Heisenberg'?": "Walter White",
    "What is the name of the nursing home where Hector Salamanca resides?": "Casa Tranquila",
    "In which chemical company do Walter White and his partners attempt to steal methylamine in Season 5?": "Mesa Verde",
    "What is the name of Jesse Pinkman's girlfriend (first name) who tragically dies of an overdose?": "Jane",
    "What industrial chemical does Walter White use to make methamphetamine?": "Methylamine",
    "What is the name of Walter White's former business partner, who later becomes a major rival?": "Gustavo 'Gus' Fring",
    "What is the nickname of the DEA agent who pursues Walter White?": "Hank",
    "What is the name of Walter White's brother-in-law who works as a DEA agent?": "Hank Schrader",
    "What is the alias used by Jesse Pinkman when he starts cooking methamphetamine?": "Cap'n Cook",
    "What is the name of the car wash owned by Walter White that serves as a front for his drug money laundering?": "A1A Car Wash",
    "What is the name of the fictional fast-food restaurant chain where Gus Fring operates his methamphetamine distribution network?": "Los Pollos Hermanos",
    "What is the name of the fast-food restaurant manager who is secretly an associate of Gus Fring?": "Gale Boetticher"
};


const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer");
const keys = Object.keys(questions);
const livesElement = document.getElementById("lives");
const video = document.querySelector("video");
const boom = new Audio("static/other stuff/boom.mp3");
const container = document.getElementById("body");
const button = document.getElementById("submit");
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
            button.disabled = true;
            video.play();
            video.addEventListener("ended", () => {
                container.style.display = "none";
            });
        } else {
            button.disabled = true;
            video.play();
            setTimeout(() => {
                video.pause();
                randomiseQuestion();
                button.disabled = false;
            }, 6000);
        }
    }
}

