// const toggle = document.querySelector(".toggle")
// const toggleText = document.querySelector(".player-ai-start")
// buttons 
const newGameButton = document.getElementById("new-game-button")
const restartButton = document.getElementById("restart-button")
const easyGameButton = document.getElementById("easy-button")
const hardGameButton = document.getElementById("hard-button")
const vsPlayerGameButton = document.getElementById("vs-player-button")
const resultText = document.getElementById("result-text")

//modal 
const modal = document.getElementById("modal")
const modalResult = document.getElementById("modal-result")

//players
let playerOne = true
let count = 0 
let crossArray = []
let zeroArray = []

//grid

let gameBoard = []
let gameActive = false
let threeInRow = false
let gridSquare = ""
let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]


let gameGrid = document.querySelectorAll(".grid")
let crossDiv = ""
let zeroDiv = ""

function renderGame() {
    gameGrid.forEach(function (event) {
        if (gameActive === true && count != 9) {
            event.addEventListener("click", () => {
                let gridSquare = event.id
                    if (playerOne === true && threeInRow === false && gameActive === true) {    
                        let crossDiv = document.getElementById(gridSquare)        
                            if (crossDiv.innerHTML === "") {
                                let selectedCell = crossDiv.dataset.number
                                let crossNumber = Number(selectedCell)
                                crossArray.push(crossNumber) 
                                gameBoard.push(crossNumber)
                                crossDiv.innerHTML = "X"
                                playerOne = false
                                count += 1
                                checkWinnerCross()
                                renderGame() 
                            }
                            else { 
                                return
                            } 
                    }       else {
                        let zeroDiv = document.getElementById(gridSquare)
                            if (zeroDiv.innerHTML === "" && threeInRow === false && gameActive === true){
                                let selectedCell = zeroDiv.dataset.number
                                let zeroNumber = Number(selectedCell)
                                zeroArray.push(zeroNumber)
                                gameBoard.push(zeroNumber)
                                zeroDiv.innerHTML = "O"
                                playerOne = true
                                count += 1
                                checkWinnerCross()
                                renderGame() 
                                }
                                 else { 
                                    return
                                }
                    }
            })
        } 
    })

}



function pushToCrossArrayArray () {
    crossArray.push(crossNumber)
}

function pushToZeroArrayArray () {
    zeroArray.push(zeroNumber)
}

function checkWinnerCross() {
    for (let i = 0; i < winConditions.length; i++) {
        for (let j = 0; j < winConditions[i].length; j++) {
            if (crossArray.includes(winConditions[i][0]) && crossArray.includes(winConditions[i][1]) && crossArray.includes(winConditions[i][2]) && crossArray.length >= 3) {
                resultText.innerHTML = "Player One Wins!"
                gameOver()
                break
            } else if (!crossArray.includes(winConditions[i][0]) && crossArray.includes(winConditions[i][1]) && crossArray.includes(winConditions[i][2]) && crossArray.length >= 3) {
                break;
            } else if (zeroArray.includes(winConditions[i][0]) && zeroArray.includes(winConditions[i][1]) && zeroArray.includes(winConditions[i][2]) && zeroArray.length >= 3) {
                resultText.innerHTML = "Player Two Wins!"
                gameOver()
            } else if (!zeroArray.includes(winConditions[i][0]) && zeroArray.includes(winConditions[i][1]) && zeroArray.includes(winConditions[i][2]) && zeroArray.length >= 3) {
                break;
            } else if (count === 9){
                resultText.innerHTML = "Its A Draw!!"
                gameOver()
            }
        }
}
}
    

document.getElementById("game-form").addEventListener("submit", function (event) {
    event.preventDefault()
    modal.close()
    gameActive = true
    renderGame()
    restartGame()
  })

function gameOver() {
    gameActive = false
    threeInRow = true
    renderGame()
}

function restartGame() {
    gameGrid.forEach(function (event) {
        event.innerHTML = ""
    })
    crossArray = []
    zeroArray = []
    gameBoard = []
    threeInRow = false
    gameActive = true
    resultText.innerHTML = ""
    playerOne = true
    count = 0
}

// modal

newGameButton.addEventListener("click", () => {
    modal.showModal()
})

restartButton.addEventListener("click", () => {
    restartGame()
})
