let pos_shuttle = 50;
let pos_laser = 85;
let pos_laserXY;
let flag_shot = false;
let refreshIntervalId;
let audioLaser = new Audio("sf_laser_13.mp3"); //sf_laser_13  10957.mp3
let audioExplosion = new Audio("explosion.mp3");
let invaderID;
let invaderXY;
let shottedInvaderID = null;
let timeInvaderAppear = 2000;
let timeInvaderDown = 1000;
let tmpInvaderPos;

refreshIntervalId3 = setInterval(() => {
    allInvaders= document.querySelectorAll('.invader');
    if(allInvaders){
        allInvaders.forEach((invader) => {
            tmpInvaderPos= parseInt(invader.style.top);
            if(tmpInvaderPos < 92)
                invader.style.top= `${tmpInvaderPos + 2}vh`;
            else
                invader.remove()
        });
    }
},timeInvaderDown);

refreshIntervalId2 = setInterval(() => {
    invaderID= Math.round(Math.random()*27182818285);
    document.querySelector('body').insertAdjacentHTML('afterbegin',`<img src="green_invader.png" class="invader" id="invader${invaderID}">`);
    document.getElementById(`invader${invaderID}`).style.left= `${Math.round(Math.random()*96)}vw`;
    document.getElementById(`invader${invaderID}`).style.top= '2vh';
},timeInvaderAppear);


refreshIntervalId1 = setInterval(function() {
    document.getElementById('laser').style.top = `${pos_laser}vh`;
    pos_laserXY= document.getElementById('laser').getBoundingClientRect();
    document.querySelectorAll('.invader').forEach((invader) => {
        invaderXY= invader.getBoundingClientRect();
        if(flag_shot === true && pos_laserXY.top > (invaderXY.top - 20) && pos_laserXY.top < (invaderXY.top + 20) 
            && pos_laserXY.left > (invaderXY.left - 30) && pos_laserXY.left < (invaderXY.left + 30)){
                shottedInvaderID= invader.getAttribute('id');
            }
    }); //console.log([invader.getAttribute('id'), invader.getBoundingClientRect().top, invader.getBoundingClientRect().left]));//invadersPos.push([invader.attributes('id'), invader.style.bottom]));
    
    if(flag_shot === true && shottedInvaderID != null ){
        console.log('shot');
        audioExplosion.play();
        pos_laser= 85;
        flag_shot= false;
        document.getElementById('laser').classList.remove('visible');
        document.getElementById(shottedInvaderID).remove();
        shottedInvaderID= null;
    }
    else if(pos_laser>0 && flag_shot === true) {
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

