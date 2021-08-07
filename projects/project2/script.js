let magicNumber = -1;
let remainingGuesses = -1;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function setupNewGame() {
  magicNumber = getRandomIntInclusive(1, 100);
  remainingGuesses = 5;
  showRemainingGuesses(remainingGuesses);
  hideAllMessages();  
}

// Handles when the user makes a new guess.
function handleGuess() {
  let input;
  
  if (remainingGuesses === -1){
    setupNewGame();
  }

  if (remainingGuesses <= 5 && remainingGuesses != 0){
    input = getGuessInput();
  } else {
    return;
  }

  if (input == 0)  {
    disableButton(true);
    setGuessInput("");
    alert("Invalid input. The input cannot be empty or have a 0 value .Please re-enter!");
    return;
  }  else if (input < 0 || input > 100) {
    disableButton(true);
    setGuessInput("");
    alert("Invalid input. The input must be between 1 and 100 inclusive. Please re-enter!");
    return;
  }

  if (input == magicNumber) {
    showMessage("win-message");
    remainingGuesses = 0;
    return;
  } else if (input < magicNumber) {
    showMessage("higher-message");
  } else {
    showMessage("lower-message");
  }

  remainingGuesses--;
  showRemainingGuesses(remainingGuesses);

  if (remainingGuesses == 0) {
    showRemainingGuesses(remainingGuesses);
    showMessage("lose-message");
  }
}



function handlePlayAgain() {
  setupNewGame();
  setGuessInput("");
}

function disableButton(value) {
  document.getElementById("guess-button").disabled = value;
}

function getGuessInput() {
  let guessString = document.getElementById("guess-input").value;
  let guessNumber = Number(guessString);
  return guessNumber;
}

function setGuessInput(value) {
  document.getElementById("guess-input").value = value;
}

function hideAllMessages() {
  let messages = document.querySelectorAll("#message-container > *");
  for (let i = 0; i < messages.length; i++) {
    messages[i].classList.add("hidden");
  }
}

function showMessage(id) {
  hideAllMessages();
  let message = document.getElementById(id);
  if (message != null) {
    message.classList.remove("hidden");
  } else {
    console.log(`${id} does not exist.`);
  }
}

function showRemainingGuesses(value) {
  document.getElementById("remining-guesses").innerHTML = value;
}