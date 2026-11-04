
const countdown = document.getElementById("countdown");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");

// Create the starting time
let time = 10;
let timer;
let isPaused = false;

// Create a function to update the countdown timer
function updateCountdown() {
    countdown.textContent = time;
}

// Listen for a click on the Start button
startButton.addEventListener("click", () => {

    timer = setInterval(() => {
        time--;
        updateCountdown();

        if (time <= 0) {
            clearInterval(timer);
        }

    }, 1000);

    setTimeout(() => {
        clearInterval(timer);
        countdown.textContent = "Time's up!";
    }, 10000);

});

// Listen for a click on the Pause button
pauseButton.addEventListener("click", () => {
    if (isPaused === false) {
        clearInterval(timer);
        isPaused = true;
        pauseButton.textContent = "Resume";
    } else {
        timer = setInterval(() => {
            time--;
            updateCountdown();

            if (time <= 0) {
                clearInterval(timer);
                countdown.textContent = "Time's up!";
            }
        }, 1000);

        isPaused = false;
        pauseButton.textContent = "Pause";
    }
});

// Display the starting time
updateCountdown();
