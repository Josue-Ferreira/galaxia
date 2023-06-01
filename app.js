import Invader from './js-objects/Invader.js'
import { invaderAttack, setVelocity, shot } from './js-objects/Function.js'

let score = {value: 0};
let life = {value: 3};
let pos_shuttle = 50;
let flag_shot = false;
let refreshIntervalId1, refreshIntervalId2, refreshIntervalId3;
let audioLaser = new Audio("/public/sf_laser_13.mp3"); //sf_laser_13  10957.mp3
let timeInvader= {appear: 2000, down: 500};
let velocity= 1;
let allInvaders= [];

// HTML elements 
const elementShuttle = document.getElementById('shuttle');
const elementLaser = document.getElementById('laser');
const elementLife = document.getElementById('life');
const elementScore = document.getElementById('score');
const elementVelocity = document.getElementById('velocity');

// Initialise life and score
for(let n=0; n<life.value; n++)
    elementLife.insertAdjacentHTML('beforeend','<i class="fa-solid fa-heart"></i>');
elementScore.append(`SCORE : ${score.value}`);
elementVelocity.append(`Velocity : x${velocity}`);

// Tasks
refreshIntervalId3 = setInterval(() => {
    invaderAttack(allInvaders,life,refreshIntervalId1,refreshIntervalId2,refreshIntervalId3);
},timeInvader.down);

refreshIntervalId2 = setInterval(() => {
    allInvaders.push(new Invader());
},timeInvader.appear);

refreshIntervalId1 = setInterval(function() {
    flag_shot = shot(flag_shot,allInvaders,score);
    velocity = setVelocity(velocity,score,timeInvader,refreshIntervalId1,refreshIntervalId2,refreshIntervalId3,allInvaders,life);
},10);

document.addEventListener('keydown', (event) => {
    if(event.key === "ArrowLeft" && pos_shuttle>0) {
        pos_shuttle -= 1;     
    }
    if(event.key === "ArrowRight" && pos_shuttle<96) {
        pos_shuttle += 1;        
    }
    elementShuttle.style.left= `${pos_shuttle}vw`;
    if(flag_shot ==false)  
        elementLaser.style.left= `${pos_shuttle}vw`; 
})

document.addEventListener('keydown', (event) => {
    if(event.key === " ") {
        flag_shot = true;
        elementLaser.classList.add('visible');
        audioLaser.play();
    }
    
    if(event.key === "s") {
        clearInterval(refreshIntervalId1);
        clearInterval(refreshIntervalId2);
        clearInterval(refreshIntervalId3);
    }
})

