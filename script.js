const Gameboard = (() => {
    let board = Array(9).fill(0);

    const getBoard = () => [...board];
    const resetBoard = () => board.fill(0);
    const setMove = (index, marker) => {
        if (board[index] === 0) {
            board[index] = marker;
            return true;
        }
        return false;
    };
    const isFull = () => board.every(cell => cell !== 0);
    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const [a, b, c] of winningCombinations) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return isFull() ? null : 0;
    };
    return { getBoard, resetBoard, setMove, checkWinner };
})();

const Player = (name, marker) => {
    return { name, marker };
};

const GameController = (() => {
    let player1 = Player("Player 1", 1);
    let player2 = Player("Player 2", 2);
    let currentPlayer = player1;
    let isSingleMode = true;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const handleMove = (index) => {
        if (Gameboard.setMove(index, currentPlayer.marker)) {
            DisplayController.render();
            const winner = Gameboard.checkWinner();
            if (winner !== 0) {
                DisplayController.displayResult(winner, player1.name, player2.name);
                return;
            }
            switchPlayer();
            if (isSingleMode && currentPlayer === player2) {
                setTimeout(computerMove, 100);
            }
        }
    };

    const computerMove = () => {
        for (let i = 0; i < 9; i++) {
            if (Gameboard.setMove(i, player2.marker)) {
                DisplayController.render();
                const winner = Gameboard.checkWinner();
                if (winner !== 0) {
                    DisplayController.displayResult(winner, player1.name, player2.name);
                    return;
                }
                switchPlayer();
                break;
            }
        }
    };

    const startNewGame = () => {
        Gameboard.resetBoard();
        currentPlayer = player1;
        DisplayController.render();
        DisplayController.displayResult(0, player1.name, player2.name);
    };

    const setGameMode = (singleMode) => {
        isSingleMode = singleMode;
    };

    const setPlayerNames = (name1, name2) => {
        player1.name = name1 || "Player 1";
        player2.name = name2 || "Player 2";
    };

    return { handleMove, startNewGame, setGameMode, setPlayerNames };
})();

const DisplayController = (() => {
    const cells = document.querySelectorAll("[data-cell]");
    const resultDisplay = document.querySelector("h2");

    cells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            GameController.handleMove(e.target.dataset.cell);
        });
    });

    document.querySelector("#newGame").addEventListener("click", () => {
        GameController.startNewGame();
    });

    document.querySelector("#single").addEventListener("change", () => {
        GameController.setGameMode(true);
    });

    document.querySelector("#double").addEventListener("change", () => {
        GameController.setGameMode(false);
    });

    document.querySelector("#player1").addEventListener("change", (e) => {
        GameController.setPlayerNames(e.target.value, document.querySelector("#player2").value);
    });

    document.querySelector("#player2").addEventListener("change", (e) => {
        GameController.setPlayerNames(document.querySelector("#player1").value, e.target.value);
    });

    const render = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index] === 1 ? "X" : board[index] === 2 ? "O" : "";
        });
    };

    const displayResult = (result, name1, name2) => {
        if (result === null) {
            resultDisplay.textContent = "It's a draw!";
        } else if (result === 0) {
            resultDisplay.textContent = "";
        } else {
            resultDisplay.textContent = `Winner is ${result === 1 ? name1 : name2}!`;
        }
    };

    return { render, displayResult };
})();

GameController.startNewGame();
