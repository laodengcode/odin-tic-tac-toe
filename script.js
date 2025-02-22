function Player(name) {
    let isTurn = false;

    function toggleTurn() {
        isTurn = !isTurn;
    }

    function shouldPlay() {
        return isTurn;
    }

    function displayName() {
        return name;
    }

    function changeName(newName) {
        name = newName;
    }

    return { toggleTurn, shouldPlay, displayName, changeName };
}


function GameBoard(playerA, playerB, isSingleMode) {
    let gameGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    playerA.toggleTurn();

    function setUserLocation(index) {
        if (index < 0 || index > 8) {
            alert("Wrong number");
        }

        if (isTaken(index)) return;

        if (playerA.shouldPlay()) {
            gameGrid[index] = 1;
        } else if (playerB.shouldPlay()) {
            if (!isSingleMode) {
                gameGrid[index] = 2;
            }
        } else {
            alert("Internal error");
            return;
        }

        playerA.toggleTurn();
        playerB.toggleTurn();
        console.log(gameGrid);
        render(gameGrid)

        let result = judge();
        if (result !== 0) {
            renderResult(result)
            return;
        }

        if (isSingleMode) {
            setTimeout(computerMove, 500);
        }
    }

    function isTaken(index) {
        return gameGrid.at(index) !== 0;
    }

    function computerMove() {
        for (let i = 0; i < gameGrid.length; i++) {
            if (gameGrid.at(i) === 0) {
                gameGrid[i] = 2;
                break;
            }
        }

        playerA.toggleTurn();
        playerB.toggleTurn();
        console.log(gameGrid);
        render(gameGrid)

        let result = judge();
        if (result !== 0) {
            renderResult(result);
        }
    }

    function reset() {
        gameGrid.fill(0);
        isUserTurn = true;
        render(gameGrid)
        renderResult(0);

        if (!a.shouldPlay()) { a.toggleTurn() }
        if (b.shouldPlay()) { b.toggleTurn() }
    }

    function judge() {
        for (let i = 0; i < 3; i++) {
            if (gameGrid[i] === gameGrid[i + 3] && gameGrid[i + 3] === gameGrid[i + 6] && gameGrid[i] !== 0) {
                return gameGrid[i];
            }
        }

        for (let i = 0; i < 7; i += 3) {
            if (gameGrid[i] === gameGrid[i + 1] && gameGrid[i + 1] === gameGrid[i + 2] && gameGrid[i] !== 0) {
                return gameGrid[i];
            }
        }

        if (((gameGrid[0] === gameGrid[4] && gameGrid[4] === gameGrid[8]) || (gameGrid[2] === gameGrid[4] && gameGrid[4] === gameGrid[6])) && gameGrid[4] !== 0) {
            return gameGrid[4];
        }

        if (gameGrid.includes(0)) {
            return 0;
        } else {
            return null;
        }
    }

    function render() {
        let elements = document.querySelectorAll("p");

        elements.forEach((i) => {
            let value = gameGrid.at(parseInt(i.getAttribute("data-cell")))
            if (value === 1) {
                i.textContent = "X";
            } else if (value === 2) {
                i.textContent = "O";
            } else {
                i.textContent = "";
            }
        })
    }

    function renderResult(result) {
        let container = document.querySelector("h2");
        let text = "";
        if (result === null) {
            text = "Even!";
        } else if (result === 0) {
            text = "";
        } else {
            text = "Winner is " + (result === 1 ? playerA.displayName() : playerB.displayName());
        }
        container.textContent = text;
    }

    function activateSingleMode() {
        isSingleMode = true;
    }

    function activateDoubleMode() {
        isSingleMode = false;
    }

    return { setUserLocation, reset, activateSingleMode, activateDoubleMode }
}



let a = Player("Player1");
let b = Player("Player2");

let newGame = GameBoard(a, b, true);

document.querySelector(".container").addEventListener("click", (event) => {
    if (event.target.matches("p")) {
        let inputIndex = event.target.getAttribute("data-cell");
        newGame.setUserLocation(inputIndex);
    }
})

document.querySelector("#newGame").addEventListener("click", (event) => {
    newGame.reset();
})

document.querySelector("#single").addEventListener("change", (event) => {
    if (event.target.checked) {
        newGame.activateSingleMode();
    }
});

document.querySelector("#double").addEventListener("change", (event) => {
    if (event.target.checked) {
        newGame.activateDoubleMode();
    }
})

document.querySelector("#player1").addEventListener("change", (event) => {
    a.changeName(event.target.value);
})

document.querySelector("#player2").addEventListener("change", (event) => {
    b.changeName(event.target.value);
})