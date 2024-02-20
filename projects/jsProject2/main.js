

// Clock Setup 
// let currentApiTime = null;

// function runTime() {
//     let theTime;

//     theTime = new Date();
//     let hr = theTime.getHours();
//     let mn = theTime.getMinutes();
//     let sc = theTime.getSeconds();
//     let ampm = hr >= 12 ? 'PM' : 'AM';

//     // Convert to 12-hour format
//     hr = hr % 12;
//     hr = hr ? hr : 12; // the hour '0' should be '12'

//     // Add leading zero to single digit minutes and seconds
//     mn = mn < 10 ? "0" + mn : mn;
//     sc = sc < 10 ? "0" + sc : sc;

//     // Update the HTML elements
//     document.getElementById('hour').textContent = hr;
//     document.getElementById('minute').textContent = mn;
//     document.getElementById('second').textContent = sc;
//     document.getElementById('ampm').textContent = ampm;
// }

let clockInterval;

function clockFunc(offsetHours) {
    // Clear existing clock interval
    if (clockInterval) {
        clearInterval(clockInterval);
    }

    clockInterval = setInterval(() => {
        // Get the current UTC time
        let utcTime = new Date();
        // Apply the timezone offset
        utcTime.setHours(utcTime.getHours() + offsetHours);

        // Format hours, minutes, seconds
        let hr = utcTime.getHours();
        let mn = utcTime.getMinutes();
        let sc = utcTime.getSeconds();
        let ampm = hr >= 12 ? 'PM' : 'AM';

        // Convert to 12-hour format
        hr = hr % 12;
        hr = hr ? hr : 12; // the hour '0' should be '12'

        // Update the HTML elements
        document.getElementById('hour').textContent = hr < 10 ? "0" + hr : hr;
        document.getElementById('minute').textContent = mn < 10 ? "0" + mn : mn;
        document.getElementById('second').textContent = sc < 10 ? "0" + sc : sc;
        document.getElementById('ampm').textContent = ampm;
    }, 1000);
}

// Initialize the clock with local time (offset = 0)
clockFunc(0);

// ... rest of your code ...


// setInterval(runTime, 1000); // Keep running the clock with local time


// Switch between Clock Features
document.querySelector(".stopwatch-btn").addEventListener("click", function () {
    // Hide all other wrappers
    document.querySelectorAll(".main-container > div").forEach(function (div) {
        div.style.display = 'none';
    });
    // Show stopwatch wrapper
    document.querySelector(".stopwatch").style.display = 'block';
    // Update type text
    document.querySelector(".type").innerHTML = "Stopwatch";
});

// For the timer-btn, you'll need to implement similar logic. 
// Assuming you have a similar structure, it would look something like this:

document.querySelector(".timer-btn").addEventListener("click", function () {
    // Hide all other wrappers
    document.querySelectorAll(".main-container > div").forEach(function (div) {
        div.style.display = 'none';
    });
    // Show timer wrapper (assuming there's an element with a class .timer)
    document.querySelector(".timer").style.display = 'block';
    // Update type text (assuming similar structure)
    document.querySelector(".type").innerHTML = "Timer";
});

// Back button for each Clock Section 

document.querySelectorAll(".back-btn, .timer-back-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        // hide all other wrappers
        document.querySelectorAll(".main-container > div").forEach(function (div) {
            div.style.display = 'none'; // Equivalent to slideUp()
        });

        // show clock wrapper
        var clock = document.querySelector(".clock");
        clock.style.display = 'block'; // Equivalent to slideDown()

        // update type text
        document.querySelector(".type").innerHTML = "Clock";
    });
});




// Stop watch Setup /////////////////////////////////////////////////////////

let stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMiliseconds = 0,
    stopwatchRunning = false,
    laps = 0,
    stopwatchInterval;

function updateStopwatch() {
    stopwatchMiliseconds++;

    if (stopwatchMiliseconds === 100) {
        stopwatchSeconds++;
        stopwatchMiliseconds = 0;
    }

    if (stopwatchSeconds === 60) {
        stopwatchMinutes++;
        stopwatchSeconds = 0;
    }

    if (stopwatchMinutes === 60) {
        stopwatchHours++;
        stopwatchMinutes = 0;
    }

    // Update the display in the document  /////////////////////////////////////////////////////////


    document.getElementById('stopwatch-hr').textContent = addZero(stopwatchHours);
    document.getElementById('stopwatch-min').textContent = addZero(stopwatchMinutes);
    document.getElementById('stopwatch-sec').textContent = addZero(stopwatchSeconds);
    document.getElementById('stopwatch-ms').textContent = addZero(stopwatchMiliseconds);
}

function addZero(number) {
    return number < 10 ? '0' + number : number;
}

function startStopWatch() {
    if (!stopwatchRunning) {
        stopwatchInterval = setInterval(updateStopwatch, 10);
        stopwatchRunning = true;
    }
}

function stopStopWatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
}


// Reset Stop watch  /////////////////////////////////////////////////////////
function resetStopWatch() {
    console.log("Resetting stopwatch");
    clearInterval(stopwatchInterval); // Clear the interval
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMiliseconds = 0;
    stopwatchRunning = false;

    // Reset the display
    document.getElementById('stopwatch-hr').textContent = addZero(stopwatchHours);
    document.getElementById('stopwatch-min').textContent = addZero(stopwatchMinutes);
    document.getElementById('stopwatch-sec').textContent = addZero(stopwatchSeconds);
    document.getElementById('stopwatch-ms').textContent = addZero(stopwatchMiliseconds);

    // Clear all recorded laps
    const lapsContainer = document.querySelector('.laps');
    lapsContainer.innerHTML = ''; // This removes all child elements from the laps container

    // Reset laps counter
    laps = 0;
}



// Record Laps //  /////////////////////////////////////////////////////////

document.querySelector('.lap-stopwatch').addEventListener('click', function () {
    // On Lap button click
    laps++;
    const lapDiv = document.createElement('div');
    lapDiv.classList.add('lap', 'active');
    lapDiv.innerHTML = `
        <p>Lap ${laps}</p>
        <p>${addZero(stopwatchHours)}:${addZero(stopwatchMinutes)}:${addZero(stopwatchSeconds)}:${addZero(stopwatchMiliseconds)}</p>
    `;
    document.querySelector('.laps').prepend(lapDiv);
});


/// All DOM Needed Actions here //  /////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    // ... other event listeners ...

    document.querySelector('.reset-stopwatch').addEventListener('click', function () {
        resetStopWatch();
        document.querySelector('.start-stopwatch').style.display = 'block'; // Show Start button
        document.querySelector('.lap-stopwatch').style.display = 'none'; // Hide Lap button
    });
});


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.start-stopwatch').addEventListener('click', function () {
        startStopWatch();
        this.style.display = 'none'; // Hide the Start button
        document.querySelector('.lap-stopwatch').style.display = 'block'; // Show the Lap button
    });

});

document.querySelector('.lap-stopwatch').addEventListener('click', function () {
    // ... existing lap code ...

    // Hide older laps
    const allLaps = document.querySelectorAll('.laps .lap');
    const maxVisibleLaps = 5; // Adjust this number as needed

    if (allLaps.length > maxVisibleLaps) {
        allLaps.forEach((lap, index) => {
            if (index < allLaps.length - maxVisibleLaps) {
                lap.style.display = 'none'; // Hide older laps
            }
        });
    }
});


// Timer //////////////////////////////////////////////////
let time = 0;
let timerHours = 0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMiliseconds = 0,
    timerInterval;

const getTime = () => {
    let inputTime = prompt("Enter your time in minutes");
    time = parseInt(inputTime) * 60;  // Convert input time to seconds

    setTime();
};

const setTime = () => {
    timerHours = Math.floor(time / 3600);
    timerMinutes = Math.floor((time % 3600) / 60);
    timerSeconds = Math.floor(time % 60);

    document.getElementById('timer-hr').innerHTML = addZero(timerHours);
    document.getElementById('timer-min').innerHTML = addZero(timerMinutes);
    document.getElementById('timer-sec').innerHTML = addZero(timerSeconds);
    document.getElementById('timer-ms').innerHTML = addZero(timerMiliseconds);
};

const startTimer = () => {
    if (time === 0) {
        getTime();
    } else {
        if (!timerInterval) {
            timerMiliseconds = 1000;
            timerInterval = setInterval(timer, 10); // Call timer function every second
        }
        document.querySelector(".start-timer").style.display = 'none';
        document.querySelector(".stop-timer").style.display = 'block';
    }
};

const stopTimer = () => {
    clearInterval(timerInterval);
    document.querySelector(".start-timer").style.display = 'block';
    document.querySelector(".stop-timer").style.display = 'none';
};

const resetTimer = () => {
    stopTimer();
    time = 0;
    timerMiliseconds = 0;  // Reset milliseconds to 0
    timerHours = 0;
    timerMinutes = 0;
    timerSeconds = 0;
    setTime();
};

document.querySelector(".start-timer").addEventListener("click", startTimer);
document.querySelector(".stop-timer").addEventListener("click", stopTimer);
document.querySelector(".reset-timer").addEventListener("click", resetTimer);

function addZero(value) {
    return value < 10 ? `0${value}` : value;
}


function timer() {
    if (time > 0 || timerMiliseconds > 0) {
        timerMiliseconds -= 10;
        if (timerMiliseconds <= 0) {
            if (time > 0) {
                time--;  // Decrement the time by 1 second
                timerMiliseconds = 1000; // Reset milliseconds
            } else {
                timerMiliseconds = 0;
            }
        }

        // Recalculate hours, minutes, and seconds
        timerHours = Math.floor(time / 3600);
        timerMinutes = Math.floor((time % 3600) / 60);
        timerSeconds = time % 60;

        // Update the display
        document.getElementById('timer-hr').innerHTML = addZero(timerHours);
        document.getElementById('timer-min').innerHTML = addZero(timerMinutes);
        document.getElementById('timer-sec').innerHTML = addZero(timerSeconds);
        document.getElementById('timer-ms').innerHTML = addZero(Math.floor(timerMiliseconds / 10));
    } else {
        stopTimer(); // Stop the timer if time runs out
    }
}

// Drop down menu for my city/timezone list
document.addEventListener('DOMContentLoaded', function () {
    cityDropdown();
});

function cityDropdown() {
    let apiUrl = 'http://worldtimeapi.org/api/timezone';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let dropdown = document.querySelector('.city-select');
            data.forEach(timezone => {
                let option = document.createElement('option');
                option.value = timezone;
                option.textContent = timezone;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
}
function fetchCityTime(city) {
    let apiUrl = `http://worldtimeapi.org/api/timezone/${city}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("API Data:", data); // Debugging

            // If the offset is a string like '+02:00', parse it correctly
            let offset = data.utc_offset; // Assume it's a string like '+02:00'
            let offsetSign = offset[0] === '+' ? 1 : -1;
            let parts = offset.substring(1).split(':');
            let offsetHours = parseInt(parts[0], 10) * offsetSign;
            let offsetMinutes = parseInt(parts[1], 10) * offsetSign / 60;

            // Combine hours and minutes for total offset
            let totalOffset = offsetHours + offsetMinutes;
            console.log("Calculated Offset:", totalOffset); // Debugging

            clockFunc(totalOffset); // Call clockFunc with the calculated offset
        })
        .catch(error => console.error('Error:', error));
}


document.querySelector(".city-select").addEventListener("change", function () {
    let city = this.value;
    if (city) {
        fetchCityTime(city);
    }
});;