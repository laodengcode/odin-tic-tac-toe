function gameBoard() {
    let gameGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let isUserTurn = true;

    function setUserLocation(index) {
        if (index < 0 || index > 8) {
            alert("Wrong number");
        }

        if (!isUserTurn) return;
        let userLocation = index;
        gameGrid[userLocation] = 1;
        console.log(gameGrid);
        let result = judge();
        if (result !== 0) {
            let winner = result === null ? "Even" : result;
            console.log(winner);
            reset();
            return;
        }

        setTimeout(computerMove, 500);
    }

    function computerMove() {
        for (let i = 0; i < gameGrid.length; i++) {
            if (gameGrid.at(i) === 0) {
                gameGrid[i] = 2;
                break;
            }
        }

        console.log(gameGrid);

        let result = judge();
        if (result !== 0) {
            let winner = result === null ? "Even" : result;
            console.log(winner);
            reset();
        }

        isUserTurn = true;
    }

    function reset() {
        gameGrid.fill(0);
        isUserTurn = true;
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

        if (gameGrid.find(item => item === 0) === 0) {
            return 0;
        } else {
            return null;
        }
    }




    return { setUserLocation }
}

let newGame = gameBoard();

document.querySelector(".container").addEventListener("click", (event) => {
    if (event.target.matches("p")) {
        console.log(event.target.getAttribute("data-cell"));
    }
})