
const questions = {
    "What is the name of Walter White's wife?": "Skyler White",
    "What is the 'street name' for the high-quality blue methamphetamine produced by Walter White?": "Blue Sky",
    "Who is the lawyer representing Walter White and Jesse Pinkman?": "Saul Goodman",
    "Who is the drug kingpin known by the alias 'Heisenberg'?": "Walter White",
    "What is the name of the nursing home where Hector Salamanca resides?": "Casa Tranquila",
    "In which chemical company do Walter White and his partners attempt to steal methylamine in Season 5?": "Mesa Verde",
    "What is the name of Jesse Pinkman's girlfriend (first name) who tragically dies of an overdose?": "Jane",
    "What industrial chemical does Walter White use to make methamphetamine?": "Methylamine",
    "What is the name of Walter White's former business partner, who later becomes a major rival?": "Gustavo Fring",
    "What is the name of Walter White's brother-in-law who works as a DEA agent?": "Hank Schrader",
    "What is the alias used by Jesse Pinkman when he starts cooking methamphetamine?": "Cap'n Cook",
    "What is the name of the car wash owned by Walter White that serves as a front for his drug money laundering?": "A1A Car Wash",
    "What is the name of the fictional fast-food restaurant chain where Gus Fring operates his methamphetamine distribution network?": "Los Pollos Hermanos",
    "What is the chemist who received a scholarship from Gus Fring and who is secretly an associate of his?": "Gale Boetticher",
    "What is the real surname of Saul Goodman?": "mcgill",
    "Who is the kid named finger?" : "mike ehrmantraut"
  
};



const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer");
const keys = Object.keys(questions);
const livesElement = document.getElementById("lives");
const video = document.querySelector("video");
const boom = new Audio("static/other stuff/boom.mp3");
const heartbeat = new Audio("static/other stuff/heartbeat.mp3");
const container = document.getElementById("body");
const button = document.getElementById("submit");
let askedQuestions = [];

let lives = 5;

window.onload = function() {
    randomiseQuestion();
}

answerInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});


function randomiseQuestion() {
    // Filter out questions that have already been asked
    const availableQuestions = keys.filter(question => !askedQuestions.includes(question));
    
    // If all questions have been asked, stop the game
    if (availableQuestions.length === 0) {
        button.disabled = true; // Disable the submit button
        sussyCelebrate();
        return; // Exit the function
    }
    
    // Select a random question from the available questions
    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    
    // Add the selected question to the askedQuestions array
    askedQuestions.push(randomQuestion);
    
    // Display the selected question
    questionElement.textContent = randomQuestion;
    answerInput.value = "";
}


function checkAnswer() {
    const question = questionElement.textContent;
    const answer = questions[question].toLowerCase();
    const answerInputValue = answerInput.value.toLowerCase();
    
    if (answerInputValue === answer) {
        randomiseQuestion();
    } else {
        hideQuestionElements();
        boom.currentTime = 0;
        boom.play();
        lives -= 1;
        livesElement.innerHTML = "Lives left: " + lives;

        if (lives === 0) {
          hankDied();    
        } else {
            if (lives == 1){
             playHeartBeat(); 
            }
            button.disabled = true;
            video.play();
            setTimeout(() => {
                video.pause();
                randomiseQuestion();
                button.disabled = false;
                showQuestionElements();
            }, 6000);
        }
        
    }

    
}

function hideQuestionElements() {
    questionElement.style.display= "none";
    answerInput.style.display = "none";
    button.style.display = "none";
}

function showQuestionElements() {
    questionElement.style.display = "block"; // Assuming the default display is "block"
    answerInput.style.display = "block";
    button.style.display = "block";
}

function hankDied(){
    button.disabled = true;
    video.play();
    video.addEventListener("ended", () => {
        container.style.display = "none";
    });
    questionElement.innerText = "YOU KILLED HANK!";
    questionElement.style.display = "block";
    stopHeartBeatLoop();
    
}


// Function to play the audio loop
function playHeartBeat() {
    heartbeat.play();
    heartbeat.addEventListener('ended', function() {
        // When the audio ends, play it again to create a loop
        heartbeat.play();
    });
}

// Function to stop the audio loop
function stopHeartBeatLoop() {
    heartbeat.pause();
    heartbeat.currentTime = 0; // Reset audio to the beginning
}



function sussyCelebrate() {
    hideQuestionElements(); // Hide the question elements
    stopHeartBeatLoop();  
    video.style.display = "none"; // Hide the current video
    
    
    questionElement.style.display = "block";
    questionElement.textContent = "YAY, HANK SURVIVED!";
    // Create a new video element
    const sussyVideo = document.createElement("video");
    sussyVideo.src = "static/other stuff/sussy.mp4"; // Replace "path/to/sussy.mp4" with the actual path to your video
    sussyVideo.autoplay = true; // Autoplay the video
    sussyVideo.controls = false; // Disable video controls
    sussyVideo.style.width = "100%"; // Set video width to 100% of parent element
    sussyVideo.style.height = "auto"; // Maintain aspect ratio

    // Prevent seeking and pausing
    sussyVideo.addEventListener('play', function() {
        sussyVideo.currentTime = 0; // Reset video to start
        sussyVideo.play();
    });

    // Replace the current video with the new sussyVideo
    container.appendChild(sussyVideo);
}

