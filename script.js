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
        return "You both chose " + playerSelection + ".\nDraw!"
    } else if (
        (playerSelection == "rock" && computerSelection == "scissors") ||
        (playerSelection == "paper" && computerSelection == "rock") ||
        (playerSelection == "scissors" && computerSelection == "paper")
    ) {
        playerScore++;
        return capitalize(playerSelection) + " beats " + computerSelection + ".\nYou win!";
        // return "You win!";
    } else {
        computerScore++;
        return capitalize(computerSelection) + " beats " + playerSelection + ".\nYou lose!";
    }
};

function game() {
    i = 0;
    while (i < 5) {
        const playerSelection = prompt("What do you choose?").toLocaleLowerCase();
        const computerSelection = computerPlay();
        alert(playRound(playerSelection, computerSelection) + "\nPlayer: " + playerScore + "\nComputer: " + computerScore);
        if (playerSelection != computerSelection) {
            i++;
        }
    }

    if (playerScore > computerScore) {
        alert("You won the game!");
    } else if (playerScore < computerScore) {
        alert("You lost the game!");
    } else alert("It's a draw!");

    return "GAME OVER";
}

game();