const greenBox = document.querySelector("#green");
const redBox = document.querySelector("#red");
const yellowBox = document.querySelector("#yellow");
const blueBox = document.querySelector("#blue");

const greenAudio = new Audio('./sounds/green.mp3');
const redAudio = new Audio('./sounds/red.mp3');
const yellowAudio = new Audio('./sounds/yellow.mp3');
const blueAudio = new Audio('./sounds/blue.mp3');
const wrongAudio = new Audio('./sounds/wrong.mp3');


const buttonsArray = document.querySelectorAll(".btn");
const body = document.querySelector("body");
const levelTitle = document.querySelector("#level-title");



let pattern = [];
let userPattern = [];
let newNumber;
let greenVal = 1;
let redVal = 2;
let yellowVal = 3;
let blueVal = 4;
let level = 0;
let userCanInput = false;
let gameEnd = true;



const prepareGame = () =>{
    $('body').keyup(function(e){
        if(gameEnd){
            gameEnd=false;
            startGame();
        }
     });

}
  
const startGame = () => {
    levelTitle.innerText = `Level ${level}`;
    generateNewColor();
}

$( ".btn" ).on( "click", (e) => {
    if(userCanInput){
        
        if(e.target.id=="green"){
            $(greenBox).fadeOut(100).fadeIn(100);
            greenAudio.play();
            $(greenBox).addClass("pressed");
                setTimeout(function () {
                $(greenBox).removeClass("pressed");
            }, 100);
        }
        else if(e.target.id=="red"){
            $(redBox).fadeOut(100).fadeIn(100);
            redAudio.play();
            $(redBox).addClass("pressed");
                setTimeout(function () {
                $(redBox).removeClass("pressed");
            }, 100);
        }
        else if(e.target.id=="yellow"){
            $(yellowBox).fadeOut(100).fadeIn(100);
            yellowAudio.play();
            $(yellowBox).addClass("pressed");
                setTimeout(function () {
                $(yellowBox).removeClass("pressed");
            }, 100);
        }
        else{
            $(blueBox).fadeOut(100).fadeIn(100);
            blueAudio.play();
            $(blueBox).addClass("pressed");
                setTimeout(function () {
                $(blueBox).removeClass("pressed");
            }, 100);
        }
        userPattern.push(e.target.id);
        userCanInput = false;
        compareUserInput();
    }
});


const generateNewColor = () => {
    level++;
    levelTitle.innerText = `Level ${level}`;
    userPattern = [];
    newColor = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    if(newColor==greenVal){
        $(greenBox).fadeOut(100).fadeIn(100);
        greenAudio.play();
        pattern.push("green");
    }
    else if(newColor==redVal){
        $(redBox).fadeOut(100).fadeIn(100);
        redAudio.play();
        pattern.push("red");
    }
    else if(newColor==yellowVal){
        $(yellowBox).fadeOut(100).fadeIn(100);
        yellowAudio.play();
        pattern.push("yellow");
    }
    else{
        $(blueBox).fadeOut(100).fadeIn(100);
        blueAudio.play();
        pattern.push("blue");
    }
    console.log(pattern);
    userCanInput = true;
}





const compareUserInput = () => {
    userCanInput = true;
    for(let i=0;i<userPattern.length;i++){
        if(pattern[i]!=userPattern[i]){
            endGame()
        }
    }
    if(pattern.length == userPattern.length && gameEnd==false){
        console.log("Move on to next round!")
        setTimeout(() => {
            generateNewColor();
        }, "1000");
    }
    
    
    
}

const endGame = () => {
    console.log("Game ended")
    wrongAudio.play();
    body.classList.add("game-over");
    setTimeout(()=>{
        body.classList.remove("game-over");
    }, "200");
    levelTitle.innerText = "Game Over, Press Any Key to Restart";
    userCanInput = false;
    gameEnd = true;
    level = 0;
    pattern = [];
    userPattern = [];
}

$(window).on('load', (event) => { 
    prepareGame()
});