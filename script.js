// add javascript here
let answer = 0;
let range = 0;
let guessCount = 0;
let playerName = prompt("What is your name?")
playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();

const scores = [];

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);

function play(){
    range = 0;
    let levels = document.getElementsByName("level")

    for(let i=0; i<levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }

    document.getElementById("msg").textContent = playerName + " guess a number 1-" +range;

    answer = Math.floor(Math.random()*range) +1;
    guessCount = 0;

    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;
}

function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);
    if(isNaN(guess)){
        msg.textContent = playerName + " please enter valid number";
        return;
    }
    guessCount++;

    if(guess == answer){
        msg.textContent = "Correct " + playerName + " it took " + guessCount + " tries.";
        updateScore(guessCount);
        resetGame();
        return;
    }
    let hcwString = "";
    let offset = Math.abs(guess-answer);
    if (offset <= 2) {
        hcwString = "hot";
    } else if (offset <= 5) {
        hcwString = "warm";
    } else {
        hcwString = "cold";
    }

    if(guess < answer){
        msg.textContent = "Too low, " + playerName + " you are " + hcwString + " try again.";
    }
    else{
        msg.textContent = "Too high, " + playerName + " you are " + hcwString + " try again.";
    }
    
}

function giveUp() {
    updateScore(range);
    resetGame();
}

function updateScore(score){
    scores.push(score);
    wins.textContent = "Total Wins: " + scores.length;
    let sum = 0
    for(let i = 0; i < scores.length; i++){
        sum += scores[i];
    }
    avgScore.textContent = "Average Score: " +  (sum/scores.length).toFixed(1);

    scores.sort(function(a,b){return a-b;});

    let lb = document.getElementsByName("leaderboard")
    for(let i = 0; i < lb.length; i++){
        if(i < scores.length){
            lb[i].textContent = scores[i];
        }
    }
}
function resetGame(){
    guess.textContent = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false;
    h.disabled = false;

}
function getFormattedDate() {
    const today = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let monthName = months[today.getMonth()];

    let day = today.getDate();

    let suffix = NaN
    if (day === 1 || day === 21 || day === 31){
        suffix = "st";
    } else if (day === 2 || day === 22){
        suffix = "nd";
    } else if (day === 3 || day === 23){
        suffix = "rd";
    } else {
        suffix = "th";
    }

    return monthName + " " + day + suffix + ", " + today.getFullYear();
}

document.getElementById("date").textContent = "Date: " + getFormattedDate();

setInterval(function(){
    const now = new Date();
    document.getElementById("date").textContent = "Date: " + getFormattedDate() + " " + now.toLocaleTimeString();
}, 1000);
