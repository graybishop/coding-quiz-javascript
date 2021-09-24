// let testElement = document.createElement('div');
// testElement.innerHTML = `this is a test element`;
// document.body.appendChild(testElement);

/* 
Define class for questions

build homepage that asks if you want to start 
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers

GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score

1. homepage with button to start quiz

1. questions pop up, and timer starts in the corner starts at 75 and counts down. 
2. questions and answered and scores are added or substracted from the timer
3. game is over, ask for initals for to ask for high score

1. highscore page with list of highscorers
2. button that lets you clear high scores
*/

let questionList = [];
let questionCounter = 0;

class Question {
    constructor(question = ``, answer1 = ``, answer2 = ``, answer3 = ``, answer4 = ``, correctAnswer = 0) {
        this.question = question;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
        this.answers = [answer1, answer2, answer3, answer4];
        this.correctAnswer = correctAnswer;
        this.identifier = Math.random();

        questionList.push(this);
    }
}

const question1 = new Question(`what is the answer to this question`, `a. this`, `b. not sure`, `c. might be this one`, `ted lasso`, 3);
const question2 = new Question(`what is question 2 going to be?`, `could be this`, `not sure`, `maybe this one?`, `not ted lasso`, 2);
const question3 = new Question(`what is question 3 going to be?`, `could be this`, `not sure`, `maybe this one?`, `not ted lasso`, 2);
const question4 = new Question(`what is question 4 going to be?`, `could be this`, `not sure`, `maybe this one?`, `not ted lasso`, 2);



const homepageDiv = document.querySelector('.homepage');
const questionDiv = document.querySelector('.question-section');
const doneDiv = document.querySelector('.quiz-done');
const answersDiv = document.querySelector('.question-section ol');
const questionHeading = document.querySelector('.question-section h1');
const resultEl = document.querySelector('#result');
const scoreEl =document.querySelector('#score');

const homeState = 'homepage';
const quizState = 'quiz';
const doneState = 'done';

const startButton = document.querySelector('.start-button');

let pageState = homeState;

let score = {
    currentValue:0,
    startingBonus:50,
    decrementUnit: 1,
    decrementInterval: 1000
}



//Keeps track of changing between homescreen, question screen, and finish screen.
const togglePageState = (newState) => {
    pageState = newState;
    if (pageState == homeState) {
        homepageDiv.style.display = 'block';
        questionDiv.style.display = 'none';
        doneDiv.style.display = 'none';
    } else if (pageState == quizState) {
        homepageDiv.style.display = 'none';
        questionDiv.style.display = 'block';
        doneDiv.style.display = 'none';
    } else {
        homepageDiv.style.display = 'none';
        questionDiv.style.display = 'none';
        doneDiv.style.display = 'block';
    }
};

// Start Quiz
const quizStart = () => {
    togglePageState(quizState);
    score.currentValue += score.startingBonus
    scoreEl.textContent =`Time/Score: ${score.currentValue}`
    nextQuestion(questionList[0]);
    setInterval(scoreCountDown, score.decrementInterval);
};

const scoreCountDown = () => {
    if(score.currentValue > 0){
    score.currentValue -= score.decrementUnit
    scoreEl.textContent =`Time/Score: ${score.currentValue}`
    } else {
        score.currentValue = 0
    }
    scoreEl.textContent =`Time/Score: ${score.currentValue}`
}

// Starts next question, fills in question information on page. Hides result.
let answered = false;

const nextQuestion = (question) => {
    
    answered = false;
    questionHeading.textContent = question.question;
    questionHeading.dataset.id = question.identifier;
    resultEl.style.display = 'none';
    
    
    for (let index = 0; index < question.answers.length; index++) {
        const element = question.answers[index];
        answersDiv.children[index].textContent = element;
        answersDiv.children[index].dataset.key = index;
    }
};

//function that takes click event input to determine if the answer is correct. 
const answerSelected = (event) => {
    console.log(event.target);
    let choice = event.target.dataset.key;
    
    if (answered == false) {
        
        
        if (choice == questionList[questionCounter].correctAnswer) {
            resultEl.textContent = `That's right!`;
        } else {
            resultEl.textContent = `Fail`;
        }
        
        resultEl.style.display = 'block';
        
        
        setTimeout(() => {
            questionCounter++;
            if (questionCounter < questionList.length) {
                nextQuestion(questionList[questionCounter]);
            } else {
                togglePageState(doneState);
            }
        }, 2000);
        
    }

    answered = true;
};

startButton.addEventListener('click', quizStart);
answersDiv.addEventListener('click', answerSelected);

const initialization = () => {
    togglePageState(homeState);
};

initialization();