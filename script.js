class Question {
    constructor(question = ``, answer1 = ``, answer2 = ``, answer3 = ``, answer4 = ``, correctAnswer = 0) {
        this.question = question;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
        this.answers = [answer1, answer2, answer3, answer4];
        this.correctAnswer = 0;

    }
}

const question1 = new Question(`what is the answer to this question`, `a. this`, `b. not sure`, `c. might be this one`, `ted lasso`);
console.log(question1.answers);


let testElement = document.createElement('div');
testElement.innerHTML = `this is a test element`;
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

const homepageDiv = document.querySelector('.homepage');
const questionDiv = document.querySelector('.question-section');
const doneDiv = document.querySelector('.quiz-done');
const answersDiv = document.querySelector('.question-section ol');
const questionHeading = document.querySelector('.question-section h1');
console.log(answersDiv);
const homeState = 'homepage';
const quizState = 'quiz';
const doneState = 'done';
let pageState = homeState;

const startButton = document.querySelector('.start-button');

const initialization = () => {
    togglePageState(homeState);

};

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

const quizStart = () => {
    togglePageState(quizState);
    nextQuestion(question1);
};

const nextQuestion = (question) => {
    console.log(question);

    questionHeading.textContent = question.question;

    for (let index = 0; index < question.answers.length; index++) {
        const element = question.answers[index];
        answersDiv.children[index].textContent = element;

    }
};

startButton.addEventListener('click', quizStart);



initialization();