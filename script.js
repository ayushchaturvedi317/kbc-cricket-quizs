const questions = [
    {
        q: "Who has scored the most runs in ODI cricket?",
        options: ["Sachin Tendulkar", "Virat Kohli", "Ricky Ponting", "Brian Lara"],
        answer: "Sachin Tendulkar"
    },
    {
        q: "Who has taken the most wickets in Test cricket?",
        options: ["Muttiah Muralitharan", "Shane Warne", "Anil Kumble", "James Anderson"],
        answer: "Muttiah Muralitharan"
    },
    {
        q: "Which team won the 2019 Cricket World Cup?",
        options: ["India", "England", "New Zealand", "Australia"],
        answer: "England"
    },
    {
        q: "Who is known as the 'Rawalpindi Express'?",
        options: ["Wasim Akram", "Waqar Younis", "Imran Khan", "Shoaib Akhtar"],
        answer: "Shoaib Akhtar"
    },
    {
        q: "Which player scored the first double century in ODI cricket?",
        options: ["Rohit Sharma", "Sachin Tendulkar", "Virender Sehwag", "Martin Guptill"],
        answer: "Sachin Tendulkar"
    }
];

let currentQuestion = 0;
let score = 0;
let lifelinesUsed = [];

function displayQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").innerText = q.q;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt);
        optionsDiv.appendChild(btn);
    });
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("next-btn").style.display = "none";
}

function checkAnswer(selected) {
    const q = questions[currentQuestion];
    if(selected === q.answer) {
        alert("Correct!");
        score++;
        document.getElementById("score").innerText = `Score: ${score}`;
    } else {
        alert(`Wrong! The correct answer was: ${q.answer}`);
        score = 0;
    }
    document.getElementById("next-btn").style.display = "block";
    document.getElementById("options").querySelectorAll("button").forEach(b => b.disabled = true);
}

function nextQuestion() {
    currentQuestion++;
    if(currentQuestion < questions.length) {
        displayQuestion();
    } else {
        alert(`Game Over! Final Score: ${score}`);
        currentQuestion = 0;
        score = 0;
        displayQuestion();
    }
}

function use5050() {
    if(lifelinesUsed.includes("50:50")) { alert("Already used!"); return; }
    lifelinesUsed.push("50:50");
    const q = questions[currentQuestion];
    let removed = [];
    while(removed.length < 2) {
        const opt = q.options[Math.floor(Math.random() * q.options.length)];
        if(opt !== q.answer && !removed.includes(opt)) removed.push(opt);
    }
    const buttons = document.getElementById("options").querySelectorAll("button");
    buttons.forEach(btn => {
        if(removed.includes(btn.innerText)) btn.style.display = "none";
    });
}

function askExpert() {
    if(lifelinesUsed.includes("Ask the Expert")) { alert("Already used!"); return; }
    lifelinesUsed.push("Ask the Expert");
    const q = questions[currentQuestion];
    alert(`Expert suggests: ${q.answer}`);
}

function audiencePoll() {
    if(lifelinesUsed.includes("Audience Poll")) { alert("Already used!"); return; }
    lifelinesUsed.push("Audience Poll");
    const q = questions[currentQuestion];
    alert(`Audience suggests: ${q.answer}`);
}

// Initialize
displayQuestion(); 
