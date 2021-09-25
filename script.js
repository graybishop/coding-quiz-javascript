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
2. questions and answered and scores are added or subtracted from the timer
3. game is over, ask for initials for to ask for high score

1. high score page with list of high scorers
2. button that lets you clear high scores
*/

let questionList = [];
let questionCounter = 0;

class Question {
    constructor(question = ``, answers = [], correctAnswer = 0) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.identifier = Math.random();

        questionList.push(this);
    }
}


const question1 = new Question(`what is the answer to this question`, [`a. this`, `b. not sure`, `c. might be this one`, `ted lasso`], 3);
const question2 = new Question(`what is question 2 going to be?`, [`could be this`, `not sure`, `maybe this one?`, `not ted lasso`], 2);
const question3 = new Question(`what is question 3 going to be?`, [`could be this`, `not sure`, `maybe this one?`, `not ted lasso`], 2);
const question4 = new Question(`what is question 4 going to be?`, [`could be this`, `not sure`, `maybe this one?`, `not ted lasso`], 2);



const homepageDiv = document.querySelector('.homepage');
const questionDiv = document.querySelector('.question-section');
const doneDiv = document.querySelector('.quiz-done');
const answersDiv = document.querySelector('.question-section div');
const questionHeading = document.querySelector('.question-section h1');
const resultEl = document.querySelector('#result');
const scoreTimerEl = document.querySelector('#score');
const finalScoreEl = document.querySelector('.quiz-done h2');
const initialsSubmitBtn = document.querySelector('.quiz-done .button');

const homeState = 'homepage';
const quizState = 'quiz';
const doneState = 'done';

const startButton = document.querySelector('.start-button');

const resultDelay = 500;

let pageState = homeState;
let intervalID;
let scoreList = [];

let score = {
    currentValue: 0,
    startingBonus: 50,
    decrementUnit: 1,
    decrementInterval: 1000
};

const finalScoreUpdate = (score) => {
    let fancyScoreEl = document.createElement('span');
    fancyScoreEl.textContent = ` ${score}`;
    finalScoreEl.appendChild(fancyScoreEl);
};

//Keeps track of changing between home screen, question screen, and finish screen.
const togglePageState = (newState) => {
    pageState = newState;
    if (pageState == homeState) {
        homepageDiv.style.display = 'flex';
        questionDiv.style.display = 'none';
        doneDiv.style.display = 'none';
    } else if (pageState == quizState) {
        homepageDiv.style.display = 'none';
        questionDiv.style.display = 'flex';
        doneDiv.style.display = 'none';
    } else {
        homepageDiv.style.display = 'none';
        questionDiv.style.display = 'none';
        doneDiv.style.display = 'flex';

        finalScoreUpdate(score.currentValue);
    }
};


//updates the text in the header that tracts the score. 
const scoreUpdate = () => {
    if (score.currentValue < 0) {
        score.currentValue = 0;
    }
    scoreTimerEl.textContent = `Time/Score: ${score.currentValue}`;
};

// Starts next question, fills in question information on page. Hides result from previous question
let answered = false;

const nextQuestion = (question) => {
    answered = false;
    questionHeading.textContent = question.question;
    questionHeading.dataset.id = question.identifier;
    resultEl.style.display = 'none';

    for (let index = 0; index < question.answers.length; index++) {

        const answer = question.answers[index];
        let answerButton = document.createElement('button');
        answerButton.textContent = answer;
        answerButton.className = `button question-button`;
        answerButton.type = 'button';
        answerButton.dataset.key = index;
        answersDiv.appendChild(answerButton);
    }
};

//function that takes click event input to determine if the answer is correct. Also determines if the the next page is a question or the end page.
const answerSelected = (event) => {
    let choice = event.target.dataset.key;

    if (answered == false) {

        if (choice == questionList[questionCounter].correctAnswer) {
            resultEl.textContent = `That's right!`;
            resultEl.style.color = 'green';
            score.currentValue += 20;
        } else {
            resultEl.textContent = `Not quite!`;
            resultEl.style.color = 'red';
            score.currentValue -= 20;
        }
        scoreUpdate();
        resultEl.style.display = 'block';

        questionCounter++;
        if (questionCounter == questionList.length) {
            clearInterval(intervalID);
        }

        setTimeout(() => {
            clearDivChildren(answersDiv);

            if (isEndOfQuiz()) {
                togglePageState(doneState);
            } else {
                nextQuestion(questionList[questionCounter]);
            }
        }, resultDelay);

    }

    answered = true;
};

const isEndOfQuiz = () => {
    if (questionCounter < questionList.length) {
        return false;
    } else {
        return true;
    }
};

// clears given element of all children
const clearDivChildren = (divEl) => {
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
};

// runs on page load. Sets the page to the homepage.
const initialization = () => {

    let storedScoreList = JSON.parse(localStorage.getItem('scoreList'));
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }

    //only runs if on index.html.
    if (finalScoreEl) {
        finalScoreEl.textContent = `Your final score was:`;
        score.currentValue = 0;
        scoreSubmitted = false;
        questionCounter = 0;
        togglePageState(homeState);
    }
};

// initializes the quiz. starts the scoring system. 
const quizStart = () => {
    togglePageState(quizState);
    score.currentValue += score.startingBonus;
    scoreTimerEl.textContent = `Time/Score: ${score.currentValue}`;
    nextQuestion(questionList[0]);
    intervalID = setInterval(() => {
        score.currentValue -= score.decrementUnit;
        scoreUpdate();
    }, score.decrementInterval);
};

let scoreSubmitted = false;

//when the user clicks the submit button, it writes the score to the scoreList array and saves it to memory. 
const saveScore = (event) => {
    event.preventDefault();
    let initialsValue = document.querySelector('#initials').value;

    if (scoreSubmitted == false && initialsValue != '') {
        scoreSubmitted = true;

        let newScore = {
            initials: initialsValue,
            score: score.currentValue
        };


        scoreList.push(newScore);
        finalScoreEl.textContent = `Score Submitted!`;
        scoreList = scoreList.sort((a, b) => {
            return b.score - a.score;
        });
        localStorage.setItem('scoreList', JSON.stringify(scoreList));
        setTimeout(initialization, 2000);

    } else {
        finalScoreEl.textContent = `No initials given. To restart the quiz, enter your initials and press 'Submit.'`
    }

};

initialization();

//runs on high-scores.html page load. Clears list, populates it with scores. if there are no scores it shows a no scores message. 
const highScoreInit = () => {
    let scoreOlEl = document.querySelector('.scores-section ol');
    clearDivChildren(scoreOlEl);

    //adds a new list item for each score in storage. 
    scoreList.forEach(element => {
        let newLi = document.createElement('li');
        newLi.textContent = `${element.initials} - `;

        let newSpan = document.createElement('span');
        newSpan.className = `score-span`;
        newSpan.textContent = element.score;

        newLi.append(newSpan);
        scoreOlEl.append(newLi);
    });

    //if there are no list items changes the p text. 
    if (!scoreOlEl.firstChild) {
        document.querySelector('.scores-section p').textContent = `No scores, yet! Find your high scores listed below. Click the button to reset the list.`;
    }

};

// Event bindings for start button, and answer button. only runs if on index.html.
if (startButton) {
    //binds start button
    startButton.addEventListener('click', quizStart);
    //binds the whole button container for answers.
    answersDiv.addEventListener('click', answerSelected);
    //binds high score submit button.
    initialsSubmitBtn.addEventListener('click', saveScore);
} else {
    //if the user is not on the homepage, bind the reset scores button, then set up the logic to clear it. 
    document.querySelector('.reset-scores').addEventListener('click', () => {
        localStorage.clear();
        //clears list li elements
        clearDivChildren(document.querySelector('.scores-section ol'));
        document.querySelector('.scores-section p').textContent = `You've cleared the list!`;
    });
}


