function gameBoard() {
    let gameGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let isUserTurn = true;

    function setUserLocation(index) {
        if (index < 0 || index > 8) {
            alert("Wrong number");
        }

        if (!isUserTurn) return;
        if (isTaken(index)) return;

        let userLocation = index;
        gameGrid[userLocation] = 1;
        console.log(gameGrid);
        render(gameGrid)

        let result = judge();
        if (result !== 0) {
            renderResult(result)
            return;
        }

        setTimeout(computerMove, 500);
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
        } else {
            text = "Winner is " + result;
        }
        container.textContent = text;
    }

    return { setUserLocation, reset }
}




let newGame = gameBoard();

document.querySelector(".container").addEventListener("click", (event) => {
    if (event.target.matches("p")) {
        let inputIndex = event.target.getAttribute("data-cell");
        newGame.setUserLocation(inputIndex);
    }
})

document.querySelector("#newGame").addEventListener("click", (event) => {
    newGame.reset();
})