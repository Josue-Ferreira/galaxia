import Invader from './js-objects/Invader.js'

let pos_shuttle = 50;
let pos_laser = 85;
let pos_laserXY;
let flag_shot = false;
let refreshIntervalId1, refreshIntervalId2, refreshIntervalId3;
let audioLaser = new Audio("assets/sf_laser_13.mp3"); //sf_laser_13  10957.mp3
let shottedInvader= false;
let timeInvaderAppear = 2000;
let timeInvaderDown = 500;
let allInvaders= [];
let canGoDown;
let i=0;

refreshIntervalId3 = setInterval(() => {
    if(allInvaders.length != 0){
        allInvaders.forEach(invader => {
            canGoDown = invader.goDown();
            if(!canGoDown)
                allInvaders.shift();
        });   
    }
},timeInvaderDown);

refreshIntervalId2 = setInterval(() => {
    allInvaders.push(new Invader());
},timeInvaderAppear);


refreshIntervalId1 = setInterval(function() {
    document.getElementById('laser').style.top = `${pos_laser}vh`;
    pos_laserXY= document.getElementById('laser').getBoundingClientRect();
    if(pos_laser>0 && flag_shot === true){
        i=0;
        while(!shottedInvader && i < allInvaders.length){ 
            shottedInvader= allInvaders[i].isShotted(pos_laserXY);
            if(shottedInvader){
                allInvaders.splice(i,1);
                flag_shot= false;
            }
            i++;
        }
        shottedInvader= false;
        pos_laser -= 5;
    }
    else {
        pos_laser= 85;
        flag_shot= false;
        document.getElementById('laser').classList.remove('visible');
    }
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

