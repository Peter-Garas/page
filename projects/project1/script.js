let temp = [];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function answerQuestion() {
  let response = document.getElementById("question").value;
  if (response.length == 0)
  {
    alert("Please enter a question in the input box");
    return;
  }
  const answers = [" It is Certain.", "As I see it, yes.", "Reply hazy, try again.", "Don't count on it.", "Yes definitely."];

  let num;
  if (temp.length === 0) {
    for (let i = 0; i < answers.length; i++) {
      temp.push(answers[i]);
    }
    num = getRandomIntInclusive(0, temp.length - 1);
  } else {
    while (temp[num] == undefined) {
      num = getRandomIntInclusive(0, answers.length - 1);
    }
  }
  makeAnswerAppear(temp[num]);
  temp.splice(num, 1);
}

function makeAnswerAppear(answerText) {
  document.getElementById("eight").classList.add("hidden");
  document.getElementById("answer-text").innerText = answerText;
  document.getElementById("answer-text").classList.add("hidden");
  document.getElementById("triangle").classList.add("hidden");
  setTimeout(() => {
    document.getElementById("answer-text").classList.remove("hidden");
    document.getElementById("triangle").classList.remove("hidden");
  }, 1);
}

