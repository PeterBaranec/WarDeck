let deckId;
const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-cards");
const header = document.getElementById("header");
const remainingCards = document.getElementById("remaining-cards");
const computerScoreEl = document.getElementById("computer-score");
const playerScoreEl = document.getElementById("player-score");
let computerScore = 0;
let playerScore = 0;

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      remainingCards.textContent = `Remaining cards: ${data.remaining}`;
      drawCardBtn.disabled = false;
      header.textContent = "Game of War";
      computerScoreEl.textContent = "Computer score: 0";
      playerScoreEl.textContent = "My score: 0";
      deckId = data.deck_id;
    });
}

newDeckBtn.addEventListener("click", handleClick);

drawCardBtn.addEventListener("click", function () {
  deckId
    ? fetch(
        `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
      )
        .then((res) => res.json())
        .then((data) => {
          remainingCards.textContent = `Remaining cards: ${data.remaining}`;
          displayCardsUI(data.cards);
          const winnerText = determineWinner(data.cards[0], data.cards[1]);
          header.textContent = winnerText;

          if (data.remaining === 0) {
            drawCardBtn.disabled = true;
            if (computerScore > playerScore) {
              // display "The computer won the game!"
              header.textContent = "The computer won the game!";
            } else if (playerScore > computerScore) {
              // display "You won the game!"
              header.textContent = "You won the game!";
            } else {
              // display "It's a tie game!"
              header.textContent = "It's a tie game!";
            }
          }
        })
    : console.log("Please draw a new Deck");
});

function displayCardsUI(cards) {
  const cardsEl = document.getElementById("cards-el");
  cardsEl.innerHTML = "";

  cards.forEach((card) => {
    const cardsHtml = `
    <div class="card-slot">
        <img src="${card.image}" class="card">
    </div>
        `;
    cardsEl.insertAdjacentHTML("beforeend", cardsHtml);
  });
}

function determineWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1Val = valueOptions.indexOf(card1.value);
  console.log(card1Val);
  const card2Val = valueOptions.indexOf(card2.value);
  console.log(card2Val);

  if (card1Val > card2Val) {
    computerScore++;
    computerScoreEl.textContent = `Computer Score: ${computerScore}`;
    return "Computer wins!";
  } else if (card1Val < card2Val) {
    playerScore++;
    playerScoreEl.textContent = `Player Score: ${playerScore}`;
    return "You win!";
  } else {
    return "War!";
  }
}
