// exam.js
const questions = [
  {
    question: "1. Con chó là động vật gì?",
    options: ["Thú", "Cá", "Chim", "Bò sát"],
    answer: 0
  },
  {
    question: "2. 2 + 2 bằng mấy?",
    options: ["3", "4", "5", "6"],
    answer: 1
  },
  {
    question: "3. Trái đất quay quanh cái gì?",
    options: ["Mặt trời", "Mặt trăng", "Sao Hỏa", "Sao Kim"],
    answer: 0
  }
];

let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let timer = 900; // 15 phút

function loadQuestion(index) {
  const q = questions[index];
  document.getElementById("question-title").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = userAnswers[index] === i ? "option selected" : "option";
    btn.onclick = () => {
      userAnswers[index] = i;
      loadQuestion(index);
      updateNav();
    };
    optionsDiv.appendChild(btn);
  });
}

function updateNav() {
  const nav = document.getElementById("question-nav");
  nav.innerHTML = "";
  questions.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.innerText = i + 1;
    btn.className = userAnswers[i] === null ? "nav-btn" : "nav-btn answered";
    btn.onclick = () => {
      currentQuestion = i;
      loadQuestion(i);
    };
    nav.appendChild(btn);
  });
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
    updateNav();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
    updateNav();
  }
}

function submitExam() {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });

  localStorage.setItem("score", score);
  localStorage.setItem("total", questions.length);
  window.location.href = "result.html";
}

function startTimer() {
  const t = document.getElementById("timer");
  const interval = setInterval(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    t.innerText = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    timer--;
    if (timer < 0) {
      clearInterval(interval);
      submitExam();
    }
  }, 1000);
}

window.onload = () => {
  loadQuestion(currentQuestion);
  updateNav();
  startTimer();
};
