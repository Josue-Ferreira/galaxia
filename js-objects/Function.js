import Invader from './Invader.js'

let canGoDown;
let shottedShuttle= false;
let pos_laserXY;
let shottedInvader= false;
let pos_laser = 85;

const invaderAttack = (allInvaders, life, refreshIntervalId1, refreshIntervalId2, refreshIntervalId3) => {
    if(allInvaders.length != 0){
        allInvaders.forEach(invader => {
            canGoDown = invader.goDown();
            shottedShuttle = invader.isShotted(document.getElementById('shuttle').getBoundingClientRect());
            if(shottedShuttle && life.value > 0){
                life.value--;
                document.getElementById('shuttle').classList.add('loselife');
                setTimeout(() => document.getElementById('shuttle').classList.remove('loselife'), 200);
            }
            else if(life.value == 0){
                clearInterval(refreshIntervalId1);
                clearInterval(refreshIntervalId2);
                clearInterval(refreshIntervalId3);
                document.getElementById('life').innerHTML="";
                document.getElementById('gameover').classList.add('enable');
            }
            if(!canGoDown)
                allInvaders.shift();
        });   
    }
}

const setVelocity = (velocity, score, timeInvader, refreshIntervalId1, refreshIntervalId2, refreshIntervalId3, allInvaders, life) => {
    switch(velocity){
        case 1: if(score.value > 5){
                    timeInvader.appear -= 500;
                    timeInvader.down -= 100;
                    resetSetIntervals(refreshIntervalId1,refreshIntervalId2,refreshIntervalId3,timeInvader,allInvaders,life);
                    velocity++;
                }
                break;
        case 2: if(score.value > 10){
                    timeInvader.appear -= 250;
                    timeInvader.down -= 50;
                    resetSetIntervals(refreshIntervalId1,refreshIntervalId2,refreshIntervalId3,timeInvader,allInvaders,life);
                    velocity++;
                }
                break;
        case 3: if(score.value > 20){
                    timeInvader.appear -= 100;
                    timeInvader.down -= 50;
                    resetSetIntervals(refreshIntervalId1,refreshIntervalId2,refreshIntervalId3,timeInvader,allInvaders,life);
                    velocity++;
                }
                break;
    }
    return velocity;
}

const resetSetIntervals = (refreshIntervalId1, refreshIntervalId2, refreshIntervalId3, timeInvader, allInvaders, life) => {
    clearInterval(refreshIntervalId2);
    refreshIntervalId2 = setInterval(() => {
        allInvaders.push(new Invader());
    },timeInvader.appear);
    clearInterval(refreshIntervalId3);
    refreshIntervalId3 = setInterval(() => {
        invaderAttack(allInvaders,life,refreshIntervalId1,refreshIntervalId2,refreshIntervalId3);
    },timeInvader.down);
}

const shot = (flag_shot, allInvaders, score) => {
    document.getElementById('laser').style.top = `${pos_laser}vh`;
    pos_laserXY= document.getElementById('laser').getBoundingClientRect();
    if(pos_laser>0 && flag_shot === true){
        let i=0;
        while(!shottedInvader && i < allInvaders.length){ 
            shottedInvader= allInvaders[i].isShotted(pos_laserXY);
            if(shottedInvader){
                allInvaders.splice(i,1);
                flag_shot= false;
                score.value += 1;
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
    return flag_shot;
}

export {invaderAttack, setVelocity, shot};