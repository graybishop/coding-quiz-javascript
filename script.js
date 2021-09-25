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

//questions
const question1 = new Question(`How are JavaScript single line comments started?`, [`/*`, `<!--`, `//`], 2);
const question2 = new Question(`Which term(s) were introduced as a preferred replacement to 'var' in ECMA2015?`, [`'let' and 'const'`, `'break' and 'continue'`, `while`, `switch`], 0);
const question3 = new Question(`Which of the following is a JavaScript Event type?`, [`load`, `mouseover`, `keydown`, `all of the above`], 3);
const question4 = new Question(`What is the structure of an arrow function expression for binding the function 'add'?`, [`const add = {a,b} => (a + b)`, `const add = (a,b) => {a + b}`, `function add => (a,b) = {a + b}`, `add(a,b) = {a + b}`], 1);
const question5 = new Question(`What value does the following code return? console.log("5" + 1)`, [`// '5 + 1'`, `// 6`, `// NaN`, `// "51"`], 3);
const question6 = new Question(`What value does the following code return? console.log("4" - 2)`, [`// NaN`, `// null`, `// 2`, `// "42"`], 2);
const question7add = new Question(`What JavaScript feature is responsible for the previous two answers?`, [`Type coercion`, `Type conversion`, `Compiler confusion`, `Compiler collusion`], 0);

//elements on homepage
const homepageDiv = document.querySelector('.homepage');
const startButton = document.querySelector('.start-button');
const scoreTimerEl = document.querySelector('#score');

//elements on question pages.
const questionDiv = document.querySelector('.question-section');
const answersDiv = document.querySelector('.question-section div');
const questionHeading = document.querySelector('.question-section h1');

//elements on final page.
const resultEl = document.querySelector('#result');
const finalScoreEl = document.querySelector('.quiz-done p');
const doneDiv = document.querySelector('.quiz-done');
const initialsSubmitBtn = document.querySelector('.quiz-done .button');

// configures time result is shown. 
const resultDelay = 1000;
let intervalID;


//object for tracking score 
let score = {
    currentValue: 0,
    startingBonus: 1000,
    decrementUnit: 1,
    decrementInterval: 100
};

//adds score to final page. 
const finalScoreUpdate = (score) => {
    let fancyScoreEl = document.createElement('span');
    fancyScoreEl.textContent = ` ${score}`;
    finalScoreEl.appendChild(fancyScoreEl);
};

//Keeps track of changing between home screen, question screen, and finish screen.
const homeState = 'homepage';
const quizState = 'quiz';
const doneState = 'done';
let pageState = homeState;

const togglePageState = (newState) => {
    pageState = newState;
    if (pageState == homeState) {
        homepageDiv.style.display = 'flex';
        questionDiv.style.display = 'none';
        doneDiv.style.display = 'none';
        scoreTimerEl.style.opacity = 0;
    } else if (pageState == quizState) {
        homepageDiv.style.display = 'none';
        questionDiv.style.display = 'flex';
        doneDiv.style.display = 'none';
        scoreTimerEl.style.opacity = 1;
    } else {
        homepageDiv.style.display = 'none';
        questionDiv.style.display = 'none';
        doneDiv.style.display = 'flex';
        scoreTimerEl.style.opacity = 0;
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
    answersDiv.style.background = 'none';

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

//function that takes click event input to determine if the answer is correct. if isEndOfQuiz then it toggles the page state to the score page.
const answerSelected = (event) => {

    //checks to make sure one of the answers were clicked. 
    if (event.target.type == 'button') {

        //store the key value from the dataset of the element
        let choice = event.target.dataset.key;

        //this can only run if the question has not be answered before. 
        if (answered == false) {

            //compares the key value to the answer value of the question and styles the page appropriately. 
            if (choice == questionList[questionCounter].correctAnswer) {
                resultEl.textContent = `That's right!`;
                resultEl.style.color = 'var(--green-blue-crayola)';
                answersDiv.style.background = 'var(--green-blue-crayola)';
                score.currentValue += 300;
            } else {
                resultEl.textContent = `Not quite!`;
                resultEl.style.color = 'var(--red-pigment)';
                answersDiv.style.background = 'var(--red-pigment)';
                score.currentValue -= 200;
            }

            scoreUpdate();

            //un-hides the result element from the page. 
            resultEl.style.display = 'block';

            //if that
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

    }
};

//checks how many questions are left. returns true if there are no more questions. 
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
let scoreList = [];
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


//when the user clicks the submit button, it writes the score to the scoreList array and saves it to memory. 
let scoreSubmitted = false;
const saveScore = (event) => {
    event.preventDefault();
    let initialsValue = document.querySelector('#initials').value;

    //only runs if there has not been a score submitted and the initials text box is not empty.
    if (scoreSubmitted == false && initialsValue != '') {
        scoreSubmitted = true;

        let newScore = {
            initials: initialsValue,
            score: score.currentValue
        };

        scoreList.push(newScore);
        finalScoreEl.textContent = `Score Submitted!`;
        //sorts list of scores before adding it to local storage. 
        scoreList = scoreList.sort((a, b) => {
            return b.score - a.score;
        });
        localStorage.setItem('scoreList', JSON.stringify(scoreList));
        setTimeout(initialization, 2000);

    } else {
        finalScoreEl.textContent = `No initials given. To restart the quiz, enter your initials and press 'Submit.'`;
    }

};

//call initialization on script load. 
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


