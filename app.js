import Invader from './js-objects/Invader.js'
import { invaderAttack, setVelocity, shot } from './js-objects/Function.js'

let score= {value: 0};
let life= {value: 3};
let pos_shuttle = 50;
let flag_shot = false;
let refreshIntervalId1, refreshIntervalId2, refreshIntervalId3;
let audioLaser = new Audio("assets/sf_laser_13.mp3"); //sf_laser_13  10957.mp3
let timeInvader= {appear: 2000, down: 500};
let velocity= 1;
let allInvaders= [];

refreshIntervalId3 = setInterval(() => {
    invaderAttack(allInvaders,life,refreshIntervalId1,refreshIntervalId2,refreshIntervalId3);
},timeInvader.down);

refreshIntervalId2 = setInterval(() => {
    allInvaders.push(new Invader());
},timeInvader.appear);

refreshIntervalId1 = setInterval(function() {
    flag_shot = shot(flag_shot,allInvaders,score);
    document.getElementById('life').innerHTML="";
    for(let n=0; n<life.value; n++)
        document.getElementById('life').insertAdjacentHTML('beforeend','<i class="fa-solid fa-heart"></i>');
    document.getElementById('score').innerHTML="";
    document.getElementById('score').append(`SCORE : ${score.value}`);
    velocity = setVelocity(velocity,score,timeInvader,refreshIntervalId1,refreshIntervalId2,refreshIntervalId3,allInvaders,life);
},10);

document.addEventListener('keydown', (event) => {
    if(event.key === "ArrowLeft" && pos_shuttle>0) {
        pos_shuttle -= 1;     
    }
    if(event.key === "ArrowRight" && pos_shuttle<96) {
        pos_shuttle += 1;        
    }
    document.getElementById('shuttle').style.left= `${pos_shuttle}vw`;
    if(flag_shot ==false)  
        document.getElementById('laser').style.left= `${pos_shuttle}vw`; 
})

document.addEventListener('keydown', (event) => {
    if(event.key === " ") {
        flag_shot = true;
        document.getElementById('laser').classList.add('visible');
        audioLaser.play();
    }
    
    if(event.key === "s") {
        clearInterval(refreshIntervalId1);
        clearInterval(refreshIntervalId2);
        clearInterval(refreshIntervalId3);
    }
})

