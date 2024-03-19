document.getElementById("new-deck").addEventListener("click", function () {
  const url = "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/";
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data));
});
