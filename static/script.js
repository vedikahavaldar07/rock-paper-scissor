let playerScore = 0;
let computerScore = 0;
let round = 0;

let gameHistory = [];

let gameOver = false;


function playGame(playerChoice) {

    // Do not allow moves after the match is over
    if (gameOver) {
        return;
    }

    let choices = ["Rock", "Paper", "Scissors"];

    let computerChoice =
        choices[Math.floor(Math.random() * choices.length)];

    let result;

    // Check winner
    if (playerChoice === computerChoice) {

        result = "Draw";

    }
    else if (
        (playerChoice === "Rock" && computerChoice === "Scissors") ||
        (playerChoice === "Paper" && computerChoice === "Rock") ||
        (playerChoice === "Scissors" && computerChoice === "Paper")
    ) {

        result = "Player Wins";
        playerScore++;

    }
    else {

        result = "Computer Wins";
        computerScore++;
    }

    // Increase round
    round++;

    // Update score
    document.getElementById("playerScore").textContent = playerScore;
    document.getElementById("computerScore").textContent = computerScore;
    document.getElementById("round").textContent = round;

    // Show current round result
    document.getElementById("result").innerHTML =
        "You chose: " + playerChoice +
        "<br>Computer chose: " + computerChoice +
        "<br><br><strong>" + result + "</strong>";


    // Save history
    gameHistory.push({
        round: round,
        player: playerChoice,
        computer: computerChoice,
        result: result
    });


    // Display history
    let historyBody = document.getElementById("historyBody");

    historyBody.innerHTML = "";

    for (let game of gameHistory) {

        let row = `
            <tr>
                <td>${game.round}</td>
                <td>${game.player}</td>
                <td>${game.computer}</td>
                <td>${game.result}</td>
            </tr>
        `;

        historyBody.innerHTML += row;
    }


    // Check Best-of-5 winner
    if (playerScore === 3) {

        gameOver = true;

        document.getElementById("result").innerHTML +=
            "<br><br><strong>🏆 Player Wins the Match!</strong>" +
            "<br>Final Score: " + playerScore + " - " + computerScore;
    }


    else if (computerScore === 3) {

        gameOver = true;

        document.getElementById("result").innerHTML +=
            "<br><br><strong>💻 Computer Wins the Match!</strong>" +
            "<br>Final Score: " + playerScore + " - " + computerScore;
    }
}


function newGame() {

    playerScore = 0;
    computerScore = 0;
    round = 0;

    gameHistory = [];

    gameOver = false;

    document.getElementById("playerScore").textContent = 0;
    document.getElementById("computerScore").textContent = 0;
    document.getElementById("round").textContent = 0;

    document.getElementById("result").innerHTML =
        "Choose Rock, Paper or Scissors";

    document.getElementById("historyBody").innerHTML = "";
}
