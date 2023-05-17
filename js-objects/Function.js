import Invader from './Invader.js'

let canGoDown;
let shottedShuttle= false;

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

const setVelocity = (velocity, score, timeInvaderAppear, timeInvaderDown, refreshIntervalId1, refreshIntervalId2, refreshIntervalId3, allInvaders, life) => {
    switch(velocity){
        case 1: if(score > 5){
                    timeInvaderAppear = 1500;
                    timeInvaderDown = 400;
                    console.log(timeInvaderAppear)
                    console.log(timeInvaderDown)
                    clearInterval(refreshIntervalId2);
                    refreshIntervalId2 = setInterval(() => {
                        allInvaders.push(new Invader());
                    },timeInvaderAppear);
                    clearInterval(refreshIntervalId3);
                    refreshIntervalId3 = setInterval(() => {
                        invaderAttack(allInvaders,life,refreshIntervalId1,refreshIntervalId2,refreshIntervalId3);
                    },timeInvaderDown);
                    velocity++;
                }
                break;
        case 2: if(score > 10){
                    timeInvaderAppear = 1000;
                    timeInvaderDown = 300;
                    console.log(timeInvaderAppear)
                    console.log(timeInvaderDown)
                    clearInterval(refreshIntervalId2);
                    refreshIntervalId2 = setInterval(() => {
                        allInvaders.push(new Invader());
                    },timeInvaderAppear);
                    clearInterval(refreshIntervalId3);
                    refreshIntervalId3 = setInterval(() => {
                        invaderAttack(allInvaders,life,refreshIntervalId1,refreshIntervalId2,refreshIntervalId3);
                    },timeInvaderDown);
                    velocity++;
                }
                break;
        case 3: if(score > 20){
                    timeInvaderAppear = 800;
                    timeInvaderDown = 250;
                    console.log(timeInvaderAppear)
                    console.log(timeInvaderDown)
                    clearInterval(refreshIntervalId2);
                    refreshIntervalId2 = setInterval(() => {
                        allInvaders.push(new Invader());
                    },timeInvaderAppear);
                    clearInterval(refreshIntervalId3);
                    refreshIntervalId3 = setInterval(() => {
                        invaderAttack(allInvaders,life,refreshIntervalId1,refreshIntervalId2,refreshIntervalId3);
                    },timeInvaderDown);
                    velocity++;
                }
                break;
    }
    return velocity;
}

export {invaderAttack, setVelocity};