import Invader from './Invader.js'

let canGoDown;
let shottedShuttle= false;

const invaderAttack = (allInvaders, life, refreshIntervalId1, refreshIntervalId2, refreshIntervalId3) => {
    if(allInvaders.length != 0){
        allInvaders.forEach(invader => {
            canGoDown = invader.goDown();
            shottedShuttle = invader.isShotted(document.getElementById('shuttle').getBoundingClientRect());
            if(shottedShuttle && life > 0){
                life--;
                document.getElementById('shuttle').classList.add('loselife');
                setTimeout(() => document.getElementById('shuttle').classList.remove('loselife'), 200);
            }
            else if(life == 0){
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
    return life;
}

export {invaderAttack};