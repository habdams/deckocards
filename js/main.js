//New decks of cards are gotten at refresh

const freshDecksUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
let freshDecksDeckId =''
fetch(freshDecksUrl)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    freshDecksDeckId = data.deck_id
  })
  .catch(err => {
      console.log(`error ${err}`)
});


document.querySelector('#drawCard').addEventListener('click', drawDeck)
document.querySelector('#reshuffle').addEventListener('click', reshuffle)


function drawDeck(){
  const url = `https://deckofcardsapi.com/api/deck/${freshDecksDeckId}/draw/?count=2`
  let playerOne = ''
  let playerTwo = ''
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        playerOne= data.cards[0];
        playerTwo = data.cards[1];
        document.querySelector('#remaining').innerHTML= data.remaining;
        document.querySelector('#playerOne').src= playerOne.image;
        document.querySelector('#playerTwo').src= playerTwo.image;

        function valueChecker(value){
          if(value=='ACE'){
            return 11
          }else if(value == 'KING'){
            return 14
          }else if(value == 'QUEEN'){
            return 13
          }else if(value == 'JACK'){
            return 12
          }else{
            return value
          }
        }

        let playerOneValue =Number(valueChecker(data.cards[0].value))
        let playerTwoValue =Number(valueChecker(data.cards[1].value))

        

        if(playerOneValue>playerTwoValue){
          return document.querySelector('#winner').innerHTML="Player One Won"
        }
        else if(playerTwoValue>playerOneValue){
          return document.querySelector('#winner').innerHTML="Player Two Won"
        }else{
          return document.querySelector('#winner').innerHTML="War"
        }


      

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

const reshuffleUrl = `https://deckofcardsapi.com/api/deck/${freshDecksDeckId}/shuffle/`
function reshuffle(){
  fetch(freshDecksUrl)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    freshDecksDeckId = data.deck_id
  })
  .catch(err => {
      console.log(`error ${err}`)
});
}
