const sfx = new Audio('SFX_PRESS_AB.wav');
const sfxHit = new Audio('SFX_INTRO_CRASH.wav');
cpuHealth = 5;
playerHealth = 5;
let running = true;

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

function game() {
    let cpuHealthBar = document.getElementById("cpu-healthbar-fill");
    let playerHealthBar = document.getElementById("player-healthbar-fill");
    let currentHealth = document.getElementById("current-health");

	const playRound = function (playerSelection, computerSelection) {
		if (playerSelection == computerSelection) {
			return "You both chose " + playerSelection + ".\n\nDraw!";
		} else if (
			(playerSelection == "rock" && computerSelection == "scissors") ||
			(playerSelection == "paper" && computerSelection == "rock") ||
			(playerSelection == "scissors" && computerSelection == "paper")
		) {
            sfxHit.play();
			cpuHealth--;
            cpuHealthBar.style.width = 266 / 5 * cpuHealth + "px";
			return (capitalize(playerSelection) + " beats " + computerSelection + ".\n\nYou win!");
		} else {
            sfxHit.play();
			playerHealth--;
            playerHealthBar.style.width = (266 / 5) * playerHealth + "px";
            currentHealth.innerHTML = playerHealth;
			return (capitalize(computerSelection) + " beats " + playerSelection + ".\n\nYou lose!");
		}
	};

    const checkScore = function () {
        if (cpuHealth == 0) {
            return "COMPUTA crashed!";
        } else if (playerHealth == 0) {
            return "PLAYER fainted!";
        }
    };
    return {playRound, checkScore };
}

const options = document.querySelectorAll(".arrow");
options[0].classList.add("active");

const showScore = function () {
    dialog.innerHTML = "\nPlayer HP: " + playerHealth + "\nComputer HP: " + cpuHealth;
}

let index = 0;

const checkKey = function (e) {
    e = e || window.event;

    if (running == true) {
        if (e.keyCode == "38" && index > 0) {
            sfx.currentTime = 0;
            sfx.play();
            options[index].classList.remove("active");
            index--;
            options[index].classList.add("active");
        } else if (e.keyCode == "40" && index < options.length - 1) {
            sfx.currentTime = 0;
            sfx.play();
            options[index].classList.remove("active");
            index++;
            options[index].classList.add("active");
        }

        if (e.keyCode == "39") {
            running = false;
            sfx.currentTime = 0;
            sfx.play();
            const choices = document.querySelectorAll(".choice");
            const dialog = document.getElementById("dialog");
            const playerSelection = choices[index].id;
            const computerSelection = computerPlay();

            dialog.innerHTML = game().playRound(playerSelection, computerSelection);
            choices.forEach((choice) => { choice.classList.add("hidden"); });
            dialog.classList.remove("hidden");

            setTimeout(() => showScore(), 1750);

            if (game().checkScore()) {
                dialog.innerHTML = game().checkScore();
                choices.forEach((choice) => { choice.classList.add("hidden"); });
                dialog.classList.remove("hidden");
            } else {
                setTimeout(() => { choices.forEach((choice) => { choice.classList.remove("hidden"); });
                    dialog.classList.add("hidden");
                    running = true;
                }, 3500);
            }
        }
    }
}

game();

document.onkeydown = checkKey;