let timer;
let running = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function start() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    document.getElementById('display').innerText = '00:00:00';
    document.getElementById('laps').innerHTML = '';
    laps = [];
}

function lap() {
    if (running) {
        let lapTime = formatTime(elapsedTime);
        laps.push(lapTime);
        displayLaps();
    }
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    document.getElementById('display').innerText = formatTime(elapsedTime);
}

function formatTime(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    
    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

function displayLaps() {
    let lapContainer = document.getElementById('laps');
    lapContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        let lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerText = `Lap ${index + 1}: ${lap}`;
        lapContainer.appendChild(lapItem);
    });
}
