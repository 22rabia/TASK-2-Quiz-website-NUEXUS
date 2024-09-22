const questions = [
    {
        question: "Which of the following is a programming language?",
        options: ["HTML", "CSS", "Python", "SQL"],
        answer: 2
    },
    {
        question: "What does 'DOM' stand for in web development?",
        options: ["Document Object Model", "Data Object Manager", "Digital Operations Mode", "Document Oriented Module"],
        answer: 0
    },
    {
        question: "Which keyword is used to define a constant in JavaScript?",
        options: ["let", "var", "const", "define"],
        answer: 2
    },
    {
        question: "Which of the following is used to style a webpage?",
        options: ["JavaScript", "HTML", "CSS", "Python"],
        answer: 2
    },
    {
        question: "What is the correct syntax to output 'Hello, World!' in JavaScript?",
        options: ["print('Hello, World!')", "console.log('Hello, World!')", "echo 'Hello, World!'", "alertBox('Hello, World!')"],
        answer: 1
    },
    {
        question: "In which HTML element do we put the JavaScript code?",
        options: ["<js>", "<script>", "<javascript>", "<code>"],
        answer: 1
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Apple", "Google", "Netscape"],
        answer: 3
    },
    {
        question: "What is the index of the first element in an array?",
        options: ["1", "0", "None", "-1"],
        answer: 1
    },
    {
        question: "Which method is used to add an element at the end of an array in JavaScript?",
        options: ["push()", "pop()", "append()", "insert()"],
        answer: 0
    },
    {
        question: "How do you declare a function in JavaScript?",
        options: ["def functionName()", "function functionName()", "function: functionName()", "fn functionName()"],
        answer: 1
    }
];


let currentQuestionIndex = 0;
let score = 0;

const authForm = document.getElementById('auth-form');
const quizSection = document.getElementById('quiz-section');
const authSection = document.getElementById('auth-section');
const toggleAuthLink = document.getElementById('toggle-auth');
let isSignup = false;

toggleAuthLink.addEventListener('click', () => {
    isSignup = !isSignup;
    document.getElementById('auth-title').innerText = isSignup ? 'Signup' : 'Login';
    toggleAuthLink.innerHTML = isSignup ? 'Already have an account? <a href="#">Login</a>' : 'Don\'t have an account? <a href="#">Signup</a>';
});

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isSignup) {
        // Signup logic
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        alert('Signup successful! Please log in.');
        isSignup = false;
    } else {
        // Login logic
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');
        
        if (email === storedEmail && password === storedPassword) {
            alert('Login successful!');
            authSection.style.display = 'none';
            quizSection.style.display = 'block';
            loadQuestion();
        } else {
            alert('Invalid credentials!');
        }
    }
});


const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const submitAnswerButton = document.getElementById('submit-answer');
const nextQuestionButton = document.getElementById('next-question');
const progressBar = document.getElementById('progress-bar');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('li');
        optionElement.innerText = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(optionElement);
    });
    progressBar.style.width = ((currentQuestionIndex + 1) / questions.length) * 100 + '%';
}

let selectedOption = null;

function selectOption(index) {
    selectedOption = index;
    submitAnswerButton.disabled = false;
}

submitAnswerButton.addEventListener('click', () => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
        feedbackElement.innerText = 'Correct!';
        feedbackElement.style.color = 'green';
    } else {
        feedbackElement.innerText = 'Wrong!';
        feedbackElement.style.color = 'red';
    }
    submitAnswerButton.style.display = 'none';
    nextQuestionButton.style.display = 'block';
});

nextQuestionButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        submitAnswerButton.style.display = 'block';
        submitAnswerButton.disabled = true;
        nextQuestionButton.style.display = 'none';
        feedbackElement.innerText = '';
    } else {
        showResult();
    }
});

function showResult() {
    quizSection.style.display = 'none';
    const resultSection = document.getElementById('result-section');
    resultSection.style.display = 'block';
    document.getElementById('final-score').innerText = `You scored ${score} out of ${questions.length}`;
}

document.getElementById('restart-quiz').addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultSection.style.display = 'none';
    quizSection.style.display = 'block';
    loadQuestion();
});
