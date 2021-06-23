let playerScore = 0;
let computerScore = 0;

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function computerPlay() {
    let choices = ['rock', 'paper', 'scissors'];
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    return choices[getRandomInt(0, 3)];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) {
        console.log("You both chose " + playerSelection + ".");
        return "Draw!"
    } else if (
        (playerSelection == "rock" && computerSelection == "scissors") ||
        (playerSelection == "paper" && computerSelection == "rock") ||
        (playerSelection == "scissors" && computerSelection == "paper")
    ) {
        playerScore++;
        console.log(capitalize(playerSelection) + " beats " + computerSelection + ".");
        return "You win!";
    } else {
        computerScore++;
        console.log(capitalize(computerSelection) + " beats " + playerSelection + ".");
        return "You lose!";
    }
};

function game() {
    i = 0;
    while (i < 5) {
        const playerSelection = prompt("What do you choose?").toLocaleLowerCase();
        const computerSelection = computerPlay();
        console.log(playRound(playerSelection, computerSelection));
        console.log("Player: " + playerScore);
        console.log("Computer: " + computerScore, "\n", "\n");
        i++;
    }

    if (playerScore > computerScore) {
        console.log("You won the game!");
    } else if (playerScore < computerScore) {
        console.log("You lost the game!");
    } else console.log("It's a draw!");

    return "GAME OVER";
}

game();