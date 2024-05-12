// Elements Initialization
const boardBtns = document.getElementsByClassName("container");
const pointsElmt = document.getElementById("Points");
const resetElmt = document.getElementById("resetBtn");
const remarkElmt = document.getElementById("Remark");
const deciderElmt = document.getElementById("Decider");
const msgElmt = document.getElementById("msg");
const timeElmt = document.getElementById("timeCard");
const containerElmt = document.getElementsByClassName("container");
const imageElmt = document.getElementsByClassName("Images");
const pointerElmt = document.getElementById("Points");
const gameModeElmt = document.getElementsByClassName("gameMode")[0];
// End

// Game-Related Vars
let currentGameMode = 0; // 0 = 1 Player , 1 = 2 Players ; 
let currentWindow = 0; // 0 = Choose Mode , 1 = Game() ;
let playerTurn = true;
let isRunning = true;
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [2, 4, 6], [0, 4, 8]
];
let userWon = false;
let compWon = false;
let userPoints = 0;
let computerPoints = 0;
const themesQuantity = 6;
let pointsTemp = pointerElmt.innerHTML;
let Temp = boardBtns[0].innerHTML;
let prevNum = 0;
let index = 0;
// End

// Time Fetch Logic
function Time() {
    const date = new Date();
    const Hour = String(date.getHours()).padStart(2, '0');
    const Minutes = String(date.getMinutes()).padStart(2, '0');
    const Seconds = String(date.getSeconds()).padStart(2, '0');
    timeElmt.textContent = `${Hour}:${Minutes}:${Seconds}`;
}

// End

// Interval for Time Refresh
setInterval(Time, 1000);
// End

// Main Game Logic
gameType();
function gameType() {
    pointerElmt.textContent = "Choose Mode!";
    for (let i = 0; i < 2; i++) {
        gameModeElmt.children[i].addEventListener("click", () => {
            currentWindow = 1;
            currentGameMode = i;
            Game(i + 1);
        });
    }
}


// 1. Players Turn
function Game(gameMode) {
    pointerElmt.innerHTML = pointsTemp;
    gameModeElmt.style.display = "none";
    containerElmt[0].style.display = "grid";
    if (gameMode == 1) {
        resetElmt.addEventListener("click", () => {
            resetGame();
        });
        for (let i = 0; i < boardBtns[0].children.length; i++) {
            boardBtns[0].children[i].addEventListener("click", () => {
                if (playerTurn) {
                    if (boardBtns[0].children[i].textContent != '') {
                        alert("Already Taken");
                    } else {
                        boardBtns[0].children[i].textContent = 'X';
                        playerTurn = false;
                        setTimeout(() => {
                            computerTurn();
                        }, 600);
                    }
                }

            });
        }
    }
    else {
        resetElmt.addEventListener("click", () => {
            resetGame();
        });
        for (let i = 0; i < boardBtns[0].children.length; i++) {
            boardBtns[0].children[i].addEventListener("click", () => {
                if (playerTurn) {
                    if (boardBtns[0].children[i].textContent != '') {
                        alert("Already Taken");
                    } else {
                        boardBtns[0].children[i].textContent = 'X';
                        playerTurn = false;
                        checkWinner();
                    }
                }
                else {
                    if (boardBtns[0].children[i].textContent != '') {
                        alert("Already Taken");
                    } else {
                        boardBtns[0].children[i].textContent = 'O';
                        playerTurn = true;
                        checkWinner();
                    }
                }
                let Index = 0;
                for (let j = 0; j < 8; j++) {
                    if (boardBtns[0].children[j].textContent != '') {
                        Index++;
                    }
                }
                if (Index == 8) {
                    checkWinner();
                    checkDraw();
                }
            });
        }

    }
    return true;
}
// End

// 2. Computers Turn
function computerTurn() {
    let computerMove = Math.floor(Math.random() * 8);
    if (boardBtns[0].children[computerMove].textContent != '') {
        computerMove = Math.floor(Math.random() * 8);
        let Index = 0;
        for (let j = 0; j < 8; j++) {
            if (boardBtns[0].children[j].textContent != '') {
                Index++;
            }
        }
        if (Index == 8) {
            checkWinner();
            checkDraw();
        }
        else {
            computerTurn();
        }
    }
    else {
        boardBtns[0].children[computerMove].textContent = 'O';
        playerTurn = true;
        checkWinner();
    }
}
// End

// 3. Deciding the Winner
function checkWinner() {
    for (let combo of winningCombos) {
        if (
            boardBtns[0].children[combo[0]].textContent !== '' &&
            boardBtns[0].children[combo[0]].textContent === boardBtns[0].children[combo[1]].textContent &&
            boardBtns[0].children[combo[0]].textContent === boardBtns[0].children[combo[2]].textContent
        ) {
            if (currentGameMode == 0) {
                if (boardBtns[0].children[combo[2]].textContent === 'X') {
                    userWon = true;
                    userPoints++;
                    msgElmt.style.display = "grid";
                    remarkElmt.textContent = "Damn, You're Good!";
                    deciderElmt.textContent = "You Won!";
                    isRunning = false;
                    draw = false;
                } else if (boardBtns[0].children[combo[2]].textContent === 'O') {
                    compWon = true;
                    computerPoints++;
                    msgElmt.style.display = "grid";
                    remarkElmt.textContent = "You Suck at this!";
                    deciderElmt.textContent = "You Lost!";
                    isRunning = false;
                }
            }
            else {
                if (boardBtns[0].children[combo[2]].textContent === 'X') {
                    userWon = true;
                    userPoints++;
                    msgElmt.style.display = "grid";
                    remarkElmt.textContent = "";
                    deciderElmt.textContent = "Player1 Won!";
                    isRunning = false;
                    draw = false;
                } else if (boardBtns[0].children[combo[2]].textContent === 'O') {
                    compWon = true;
                    computerPoints++;
                    msgElmt.style.display = "grid";
                    remarkElmt.textContent = "";
                    deciderElmt.textContent = "Player2 Won!";
                    isRunning = false;
                }
            }

        }
    }
    if (currentGameMode == 0) {
        pointsElmt.children[0].textContent = `User Points: ${userPoints}`;
        pointsElmt.children[1].textContent = `Computer Points: ${computerPoints}`;
    }
    else {
        pointsElmt.children[0].textContent = `Player1 Points: ${userPoints}`;
        pointsElmt.children[1].textContent = `Player2 Points: ${computerPoints}`;
    }

}
// End

// 4. Checking Draw
function checkDraw() {
    if (userWon == false && compWon == false) {
        msgElmt.style.display = "grid";
        remarkElmt.textContent = "Try Harder!";
        deciderElmt.textContent = "Draw!";
        isRunning = false;
    }
}
// End

// 5. Restart the Game
function resetGame() {
    for (let i = 0; i < boardBtns[0].children.length; i++) {
        boardBtns[0].children[i].textContent = '';
    }
    playerTurn = true;
    isRunning = true;
    compWon = false;
    userWon = false;
    msgElmt.style.display = "none";
}
// End

// Extra: Themes for Better UI Experience

// Extra : 1. Showing Themes
function Themes() {
    if (currentWindow == 1) {
        containerElmt[0].style.display = "none";
    }
    else {
        gameModeElmt.style.display = 'none';
    }
    imageElmt[0].style.display = "flex";
    pointsElmt.textContent = "Pick Your Favourite Theme!";
    for (let i = 2; i < 8; i++) {
        imageElmt[0].children[i].addEventListener("click", (event) => {
            document.body.style.backgroundImage = `url("../Assets/Backgrounds/${event.originalTarget.alt}")`;
        });
    }
}

// Extra: 2. Back Out Button
function revertTheme() {
    setTimeout(() => {
        if (currentWindow == 1) {
            containerElmt[0].style.display = "grid";
            pointsElmt.innerHTML = pointsTemp;
        }
        else {
            pointerElmt.textContent = "Choose Mode!";
            gameModeElmt.style.display = "flex";
        }
        imageElmt[0].style.display = "none";
    }, 200)

}

// Extra: 3. For Applying Random Theme 
function randomTheme() {
    let randNum = Math.floor(Math.random() * 6) + 1;

    while (randNum == prevNum) {
        randNum = Math.floor(Math.random() * 6) + 1;
    }
    if (randNum == 6) {
        document.body.style.backgroundImage = 'url("./Assets/Backgrounds/6.png")';
    }
    else {
        document.body.style.backgroundImage = `url("../Assets/Backgrounds/${randNum}.svg")`;
    }
    prevNum = randNum;
}
// End