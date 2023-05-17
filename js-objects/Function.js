import Invader from './Invader.js'

let canGoDown;
let shottedShuttle= false;
let pos_laserXY;
let shottedInvader= false;
let pos_laser = 85;

// HTML elements 
const elementLife = document.getElementById('life');
const elementScore = document.getElementById('score');
const elementShuttle = document.getElementById('shuttle');
const elementLaser = document.getElementById('laser');
const elementGameOver = document.getElementById('gameover');
const elementVelocity = document.getElementById('velocity');

const invaderAttack = (allInvaders, life, refreshIntervalId1, refreshIntervalId2, refreshIntervalId3) => {
    if(allInvaders.length != 0){
        allInvaders.forEach((invader, i) => {
            canGoDown = invader.goDown();
            shottedShuttle = invader.isShotted(elementShuttle.getBoundingClientRect());
            if(shottedShuttle && life.value > 0){
                life.value--;
                elementLife.innerHTML="";
                for(let n=0; n<life.value; n++)
                    elementLife.insertAdjacentHTML('beforeend','<i class="fa-solid fa-heart"></i>');
                elementShuttle.classList.add('loselife');
                setTimeout(() => elementShuttle.classList.remove('loselife'), 200);
            }
            else if(life.value == 0){
                clearInterval(refreshIntervalId1);
                clearInterval(refreshIntervalId2);
                clearInterval(refreshIntervalId3);
                elementLife.innerHTML="";
                elementGameOver.classList.add('enable');
            }
            if(!canGoDown)
                allInvaders.splice(i,1);
        });   
    }
}

const setVelocity = (velocity, score, timeInvader, refreshIntervalId1, refreshIntervalId2, refreshIntervalId3, allInvaders, life) => {
    switch(velocity){
        case 1: if(score.value > 5){
                    timeInvader.appear -= 1000;
                    timeInvader.down -= 100;
                    velocity++;
                    resetSetIntervals(refreshIntervalId1,refreshIntervalId2,refreshIntervalId3,timeInvader,allInvaders,life,velocity);
                }
                break;
        case 2: if(score.value > 10){
                    timeInvader.appear -= 500;
                    timeInvader.down -= 50;
                    velocity++;
                    resetSetIntervals(refreshIntervalId1,refreshIntervalId2,refreshIntervalId3,timeInvader,allInvaders,life,velocity);
                }
                break;
        case 3: if(score.value > 20){
                    timeInvader.appear -= 250;
                    timeInvader.down -= 50;
                    velocity++;
                    resetSetIntervals(refreshIntervalId1,refreshIntervalId2,refreshIntervalId3,timeInvader,allInvaders,life,velocity);
                }
                break;
        case 4: if(score.value > 30){
                    timeInvader.appear -= 200;
                    timeInvader.down -= 50;
                    velocity++;
                    resetSetIntervals(refreshIntervalId1,refreshIntervalId2,refreshIntervalId3,timeInvader,allInvaders,life,velocity);
                }
                break;
        case 5: if(score.value > 40){
                    timeInvader.appear -= 100;
                    timeInvader.down -= 50;
                    velocity++;
                    resetSetIntervals(refreshIntervalId1,refreshIntervalId2,refreshIntervalId3,timeInvader,allInvaders,life,velocity);
                }
                break;
    }
    return velocity;
}

const resetSetIntervals = (refreshIntervalId1, refreshIntervalId2, refreshIntervalId3, timeInvader, allInvaders, life,velocity) => {
    clearInterval(refreshIntervalId2);
    refreshIntervalId2 = setInterval(() => {
        allInvaders.push(new Invader());
    },timeInvader.appear);
    clearInterval(refreshIntervalId3);
    refreshIntervalId3 = setInterval(() => {
        invaderAttack(allInvaders,life,refreshIntervalId1,refreshIntervalId2,refreshIntervalId3);
    },timeInvader.down);
    elementVelocity.innerHTML="";
    elementVelocity.append(`Velocity : x${velocity}`);
}

const shot = (flag_shot, allInvaders, score) => {
    elementLaser.style.top = `${pos_laser}vh`;
    pos_laserXY= elementLaser.getBoundingClientRect();
    if(pos_laser>0 && flag_shot === true){
        let i=0;
        while(!shottedInvader && i < allInvaders.length){ 
            shottedInvader= allInvaders[i].isShotted(pos_laserXY);
            if(shottedInvader){
                allInvaders.splice(i,1);
                flag_shot= false;
                score.value += 1;
                elementScore.innerHTML="";
                elementScore.append(`SCORE : ${score.value}`);
            }
            i++;
        }
        shottedInvader= false;
        pos_laser -= 5;
    }
    else {
        pos_laser= 85;
        flag_shot= false;
        elementLaser.classList.remove('visible');
    }
    return flag_shot;
}

export {invaderAttack, setVelocity, shot};