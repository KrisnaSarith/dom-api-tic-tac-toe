let start = "<img class ='image' src=";
let end = "></img>";
let X = `${start}https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg${end}`;
let O = `${start}https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg${end}`;

const XO = [X,O];

const rows = [[0,1,2], [3,4,5], [6,7,8]];
const cols = [[0,3,6], [1,4,7], [2,5,8]];
const dias = [[0,4,8], [2,4,6]];
const combos = [...rows, ...cols, ...dias];

let boardArray = new Array(9);
let xArray = [];
let oArray = [];

let bothArrays = [xArray, oArray]

let haveWinner = false;
let tieGame = false;
let header = document.getElementById("game-status");

let newGameButton = document.getElementById("new-game");
let giveUpButton = document.getElementById("give-up");
//console.log("newGameButton is " + newGameButton.id);

function isWinner (bothArrays, player){
    for( let i = 0; i < combos.length ; i++){
        if(bothArrays[player].includes(combos[i][0])&&bothArrays[player].includes(combos[i][1])&&bothArrays[player].includes(combos[i][2])){
            haveWinner = true;
            newGameButton.removeAttribute("disabled");
            giveUpButton.setAttribute("disabled", "");
            header.innerText = "Winner: "+ (player===0 ? "X" : "O");
            // alert("Winner!");
            return true;
        }
    }
    return false;
}
let play;
function resetGame () {
  play = 0;
  player = 0;
  boardArray = new Array(9).fill(undefined);
  bothArrays[0] = [];
  bothArrays[1] = [];
  haveWinner = false;
  tieGame = false;
  header.innerText = "";
  newGameButton.setAttribute("disabled", "");
  giveUpButton.removeAttribute("disabled");
  for (let i = 0; i < boardArray.length; i++) {
      document.getElementById(`square-${i}`).innerHTML = "";
  }
}

let player = 0;
let stoppedGame;

window.addEventListener("DOMContentLoaded", event =>{
    let square;
//    play = 0;
//    stoppedGame = JSON.parse(localStorage.getItem("stoppedGame"));
    play = JSON.parse(localStorage.getItem("play"));
    if(play !== null){
        bothArrays = JSON.parse(localStorage.getItem("bothArrays"));
        boardArray = JSON.parse(localStorage.getItem("boardArray"));
        haveWinner = JSON.parse(localStorage.getItem("haveWinner"));
        tieGame = JSON.parse(localStorage.getItem("tieGame"));

        player = play%2;

        //newGameButton
        //giveUpButton
        // header
        for (let i = 0 ; i < 8 ; i ++){
            let square = document.getElementById(`square-${i}`);
            for (let player = 0 ; player < 2 ; player++){
                    for (let j = 0 ; j < bothArrays[0].length; j ++){
                        square.innerHTML = XO[player];
                    }
            }
        }
    }
    //Have to put to local storage from here to 125

    document.getElementById("tic-tac-toe-board").addEventListener("click", event =>{
        // console.log(`This is the target ${event.target.id}`);
        // player = play%2;
    if(!haveWinner){
    //   console.log("Do we have a winner? " + haveWinner)

      let squareId = Number(event.target.id.slice(-1));
    //   console.log("squareID = " + squareId);
    //   console.log(boardArray[0]);
    //   console.log(boardArray);
      if (boardArray[squareId] === undefined && event.target.id!=="") {
        bothArrays[player].push(squareId);
        bothArrays[player].sort();
        boardArray[squareId] = true;
        // console.log("squareID = " + squareId);
        square = document.getElementById(`square-${squareId}`);
        // console.log(square);
        square.innerHTML = XO[player];
        // console.log(bothArrays);
        isWinner(bothArrays, player);
        play++;
        player= play%2;
        if(play===9&&!haveWinner){
            tieGame = true;
            header.innerText = "Winner: none!";
            newGameButton.removeAttribute("disabled");
            giveUpButton.setAttribute("disabled","");
        }
      } else{
            // console.log("illegal move");
            alert('Illegal move, try again.');
      }
      if (haveWinner|| tieGame){
          newGameButton.removeAttribute("disabled");
      }
    }
    });

    localStorage.setItem("bothArrays", bothArrays);
    localStorage.setItem("boardArray", boardArray);
    localStorage.setItem("haveWinner", haveWinner);
    localStorage.setItem("tieGame", tieGame);
    localStorage.setItem("play", play);

    newGameButton.addEventListener("click", () => {
        resetGame();
    })
    giveUpButton.addEventListener("click", () => {
    //   console.log(player);
    console.log(`Play: ${play}  Player: ${player}`);
      header.innerText = "Winner: "+ (player===0 ? "O" : "X");
      newGameButton.removeAttribute("disabled");
      giveUpButton.setAttribute("disabled", "");
      haveWinner = true;
    //   if (player === 0) {
    //       isWinner(bothArrays, 1);
    //   } else {
    //       isWinner(bothArrays, 0);
    //   }
    })
});
