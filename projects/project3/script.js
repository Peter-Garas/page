let clickAudio = new Audio('audio/click.wav');
let matchAudio = new Audio('audio/match.wav');
let winAudio = new Audio('audio/win.wav');
let lastCardFlipped = null;
let counters = {};

let cardObjects = 
  createCards(document.getElementById("card-container"), shuffleCardImageClasses());

if (cardObjects != null) {
  for (let i = 0; i < cardObjects.length; i++) {
    flipCardWhenClicked(cardObjects[i]);
  }
}

function appendNewCard(parentElement) {
  let cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerHTML = `<div class="card-down"></div>
  <div class="card-up"></div>`;
  parentElement.append(cardElement);
  return cardElement;
}

function shuffleCardImageClasses() {
    let cards = ["image-1", "image-1", "image-2", "image-2",      
                 "image-3", "image-3", "image-4", "image-4",
                 "image-5", "image-5", "image-6", "image-6"];
   
   let result = _.shuffle(cards);
  return result;
}

function createCards(parentElement, shuffledImageClasses) {
  let storeCards = [];
  for (let i = 0; i < 12; i++) {
    let card = appendNewCard(parentElement);
    card.classList.add(shuffledImageClasses[i]);
    let cardObj = {
      index: i,
      element: card,
      imageClass: shuffledImageClasses[i]
    };
    storeCards.push(cardObj);
  }
  return storeCards;
}

function doCardsMatch(cardObject1, cardObject2) {
  if (cardObject1.imageClass == cardObject2.imageClass) {
    return true;
  } else {
    return false;
  }
}

function incrementCounter(counterName, parentElement) {
  if (!counters.hasOwnProperty(counterName)) {
    counters[counterName] = 0;
  }
  counters[counterName]++;
  parentElement.innerHTML = counters[counterName];
}

function flipCardWhenClicked(cardObject) {
  cardObject.element.onclick = function() {
    if (cardObject.element.classList.contains("flipped")) {
      return;
    }
    clickAudio.play();
    cardObject.element.classList.add("flipped");
    setTimeout(function() {
      onCardFlipped(cardObject);
    }, 500);
  };
}

function onCardFlipped(newlyFlippedCard) {
  incrementCounter("flip", document.getElementById("flip-count"));
  if (lastCardFlipped == null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  } else if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  } else {
    incrementCounter("match", document.getElementById("match-count"))
    newlyFlippedCard.element.classList.add("flash");
    lastCardFlipped.element.classList.add("flash");
  }
  if(counters.match == 6)
  {
    winAudio.play();
  } else {
    matchAudio.play();
  }
  lastCardFlipped = null;
}

