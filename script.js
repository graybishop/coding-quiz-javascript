class Question {
    constructor(question = ``, answer1 = ``, answer2 = ``, answer3 = ``, answer4 = ``) {
        this.question = question;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
        this.answers = [answer1, answer2, answer3, answer4];
    }
}

const question = new Question(`what is the answer to this question`, `a. this`, `b. not sure`, `c. might be this one`, `ted lasso`);


let testElement =document.createElement('div');
testElement.innerHTML = `this is a test element`
document.body.appendChild(testElement);

let questionDiv = document.createElement('div');

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
2. questions pop up, and timer starts in the corner starts at 75 and counts down. 
3. questions and answered and scores are added or substracted from the timer
4. game is over, ask for initals for to ask for high score

1. highscore page with list of highscorers
2. button that lets you clear high scores
*/