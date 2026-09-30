let difficulty = "easy";
let totalRounds = 5;

let currentRound = 1;

let playerScore = 0;
let computerScore = 0;
let drawScore = 0;

let roundHistory = [];

let lastGame = null;


// -----------------------------
// START GAME
// -----------------------------

function startGame() {

    difficulty = document.getElementById("difficulty").value;

    totalRounds = parseInt(
        document.getElementById("rounds").value
    );

    currentRound = 1;

    playerScore = 0;
    computerScore = 0;
    drawScore = 0;

    roundHistory = [];

    document.getElementById("setup").classList.add("hidden");

    document.getElementById("game").classList.remove("hidden");

    document.getElementById("finalResult").classList.add("hidden");

    document.getElementById("currentDifficulty").textContent =
        capitalize(difficulty);

    document.getElementById("currentRound").textContent =
        currentRound;

    document.getElementById("totalRounds").textContent =
        totalRounds;

    updateScore();

    document.getElementById("roundResult").textContent =
        "Choose Rock, Paper or Scissors";

    document.getElementById("playerChoice").textContent = "-";

    document.getElementById("computerChoice").textContent = "-";
}


// -----------------------------
// PLAY ROUND
// -----------------------------

function playRound(playerChoice) {

    if (currentRound > totalRounds) {
        return;
    }

    let computerChoice = getComputerChoice();

    let result = getWinner(playerChoice, computerChoice);


    // Display choices

    document.getElementById("playerChoice").textContent =
        capitalize(playerChoice);

    document.getElementById("computerChoice").textContent =
        capitalize(computerChoice);


    // Update score

    if (result === "player") {

        playerScore++;

        document.getElementById("roundResult").textContent =
            "🎉 You won this round!";

    }

    else if (result === "computer") {

        computerScore++;

        document.getElementById("roundResult").textContent =
            "💻 Computer won this round!";

    }

    else {

        drawScore++;

        document.getElementById("roundResult").textContent =
            "🤝 This round is a draw!";

    }


    // Save round history

    roundHistory.push({
        round: currentRound,
        player: playerChoice,
        computer: computerChoice,
        result: result
    });


    updateScore();


    // Check whether game is over

    if (currentRound >= totalRounds) {

        setTimeout(function () {
            endGame();
        }, 800);

    } else {

        currentRound++;

        document.getElementById("currentRound").textContent =
            currentRound;
    }
}


// -----------------------------
// COMPUTER CHOICE
// -----------------------------

function getComputerChoice() {

    let choices = ["rock", "paper", "scissors"];


    // EASY
    // Completely random

    if (difficulty === "easy") {

        return randomChoice(choices);
    }


    // MEDIUM
    // Computer has a small chance
    // of countering the player's previous move

    if (difficulty === "medium") {

        if (roundHistory.length > 0 && Math.random() < 0.5) {

            let previousPlayer =
                roundHistory[roundHistory.length - 1].player;

            return counterMove(previousPlayer);
        }

        return randomChoice(choices);
    }


    // HARD
    // Computer uses the player's previous move

    if (difficulty === "hard") {

        if (roundHistory.length > 0) {

            let previousPlayer =
                roundHistory[roundHistory.length - 1].player;

            return counterMove(previousPlayer);
        }

        return randomChoice(choices);
    }

}


// -----------------------------
// RANDOM CHOICE
// -----------------------------

function randomChoice(array) {

    let randomIndex =
        Math.floor(Math.random() * array.length);

    return array[randomIndex];
}


// -----------------------------
// COUNTER MOVE
// -----------------------------

function counterMove(move) {

    if (move === "rock") {
        return "paper";
    }

    if (move === "paper") {
        return "scissors";
    }

    if (move === "scissors") {
        return "rock";
    }
}


// -----------------------------
// FIND WINNER
// -----------------------------

function getWinner(player, computer) {

    if (player === computer) {
        return "draw";
    }


    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {

        return "player";
    }


    return "computer";
}


// -----------------------------
// UPDATE SCORE
// -----------------------------

function updateScore() {

    document.getElementById("playerScore").textContent =
        playerScore;

    document.getElementById("computerScore").textContent =
        computerScore;

    document.getElementById("drawScore").textContent =
        drawScore;
}


// -----------------------------
// END GAME
// -----------------------------

function endGame() {

    document.getElementById("game").classList.add("hidden");

    document.getElementById("finalResult").classList.remove("hidden");


    document.getElementById("finalPlayerScore").textContent =
        playerScore;

    document.getElementById("finalComputerScore").textContent =
        computerScore;

    document.getElementById("finalDrawScore").textContent =
        drawScore;


    let winnerMessage = "";


    if (playerScore > computerScore) {

        winnerMessage =
            "🏆 Congratulations! You won the game!";

    }

    else if (computerScore > playerScore) {

        winnerMessage =
            "💻 Computer won the game!";

    }

    else {

        winnerMessage =
            "🤝 The game ended in a draw!";
    }


    document.getElementById("winnerMessage").textContent =
        winnerMessage;


    // Save last game for replay

    lastGame = {

        difficulty: difficulty,

        totalRounds: totalRounds,

        rounds: roundHistory

    };


    saveGameToHistory();
}


// -----------------------------
// SAVE GAME HISTORY
// -----------------------------

function saveGameToHistory() {

    let games =
        JSON.parse(localStorage.getItem("rpsHistory")) || [];


    let game = {

        date: new Date().toLocaleString(),

        difficulty: difficulty,

        rounds: totalRounds,

        playerScore: playerScore,

        computerScore: computerScore,

        drawScore: drawScore

    };


    games.unshift(game);


    // Keep only last 10 games

    if (games.length > 10) {

        games = games.slice(0, 10);
    }


    localStorage.setItem(
        "rpsHistory",
        JSON.stringify(games)
    );


    displayHistory();
}


// -----------------------------
// DISPLAY HISTORY
// -----------------------------

function displayHistory() {

    let games =
        JSON.parse(localStorage.getItem("rpsHistory")) || [];


    let historyDiv =
        document.getElementById("history");


    if (games.length === 0) {

        historyDiv.innerHTML =
            "<p>No games played yet.</p>";

        return;
    }


    historyDiv.innerHTML = "";


    games.forEach(function (game, index) {

        let result;


        if (game.playerScore > game.computerScore) {

            result = "You Won";

        }

        else if (game.computerScore > game.playerScore) {

            result = "Computer Won";

        }

        else {

            result = "Draw";
        }


        let item =
            document.createElement("div");

        item.className = "history-item";


        item.innerHTML = `
            <strong>Game ${games.length - index}</strong><br>
            Date: ${game.date}<br>
            Difficulty: ${capitalize(game.difficulty)}<br>
            Rounds: ${game.rounds}<br>
            Score: You ${game.playerScore} -
            Computer ${game.computerScore}<br>
            Result: ${result}
        `;


        historyDiv.appendChild(item);

    });
}


// -----------------------------
// REPLAY LAST GAME
// -----------------------------

function replayGame() {

    if (!lastGame) {

        alert("No previous game available.");

        return;
    }


    difficulty = lastGame.difficulty;

    totalRounds = lastGame.totalRounds;


    currentRound = 1;

    playerScore = 0;

    computerScore = 0;

    drawScore = 0;

    roundHistory = [];


    document.getElementById("finalResult")
        .classList.add("hidden");

    document.getElementById("game")
        .classList.remove("hidden");


    document.getElementById("currentDifficulty")
        .textContent = capitalize(difficulty);


    document.getElementById("totalRounds")
        .textContent = totalRounds;


    document.getElementById("currentRound")
        .textContent = currentRound;


    updateScore();


    document.getElementById("roundResult")
        .textContent = "Game restarted! Choose your move.";


    document.getElementById("playerChoice")
        .textContent = "-";


    document.getElementById("computerChoice")
        .textContent = "-";
}


// -----------------------------
// NEW GAME
// -----------------------------

function newGame() {

    document.getElementById("finalResult")
        .classList.add("hidden");


    document.getElementById("game")
        .classList.add("hidden");


    document.getElementById("setup")
        .classList.remove("hidden");
}


// -----------------------------
// CLEAR HISTORY
// -----------------------------

function clearHistory() {

    let confirmDelete =
        confirm("Are you sure you want to clear game history?");


    if (confirmDelete) {

        localStorage.removeItem("rpsHistory");

        displayHistory();
    }
}


// -----------------------------
// CAPITALIZE TEXT
// -----------------------------

function capitalize(text) {

    return text.charAt(0).toUpperCase() +
        text.slice(1);
}


// -----------------------------
// LOAD HISTORY WHEN PAGE OPENS
// -----------------------------

displayHistory();