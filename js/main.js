//New decks of cards are gotten at refresh

const freshDecksUrl =
  "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
let freshDecksDeckId = "";
fetch(freshDecksUrl)
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    console.log(data);
    freshDecksDeckId = data.deck_id;
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

document.querySelector("#drawCard").addEventListener("click", drawDeck);
document.querySelector("#reshuffle").addEventListener("click", reshuffle);

let p1 = 0;
let p2 = 0;

function drawDeck() {
  const url = `https://deckofcardsapi.com/api/deck/${freshDecksDeckId}/draw/?count=2`;
  let playerOne = "";
  let playerTwo = "";

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      // console.log(data);
      console.log(p1, p2);
      playerOne = data.cards[0];
      playerTwo = data.cards[1];
      document.querySelector("#remaining").innerHTML = data.remaining;
      document.querySelector("#playerOne").src = playerOne.image;
      document.querySelector("#playerTwo").src = playerTwo.image;
      document.querySelector("#p1").innerHTML = p1;
      document.querySelector("#p2").innerHTML = p2;

      function valueChecker(value) {
        if (value == "ACE") {
          return 11;
        } else if (value == "KING") {
          return 14;
        } else if (value == "QUEEN") {
          return 13;
        } else if (value == "JACK") {
          return 12;
        } else {
          return value;
        }
      }

      

      let playerOneValue = Number(valueChecker(data.cards[0].value));
      let playerTwoValue = Number(valueChecker(data.cards[1].value));

      if (playerOneValue > playerTwoValue) {
        p1 += 1;
        return (document.querySelector("#winner").innerHTML = "Computer +1");
      } else if (playerTwoValue > playerOneValue) {
        p2 += 1;
        return (document.querySelector("#winner").innerHTML = "You +1");
      } else {
        return (document.querySelector("#winner").innerHTML = "War");
      }

      

    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

const reshuffleUrl = `https://deckofcardsapi.com/api/deck/${freshDecksDeckId}/shuffle/`;
function reshuffle() {
  fetch(freshDecksUrl)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      freshDecksDeckId = data.deck_id;
      p1 = 0;
      p2 = 0;
      document.querySelector("#remaining").innerHTML = data.remaining;
      document.querySelector("#winner").innerHTML = " ";
      document.querySelector("#playerOne").src = null;
      document.querySelector("#playerTwo").src = null;
      document.querySelector("#p1").innerHTML = p1;
      document.querySelector("#p2").innerHTML = p2;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
