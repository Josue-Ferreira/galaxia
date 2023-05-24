let audioExplosion = new Audio("assets/explosion.mp3");
const greenInvader = "../assets/green_invader.png";
const orangeInvader = "../assets/orange_invader.png";
const brownInvader = "../assets/brown_invader.png";
const yellowInvader = "../assets/yellow_invader.png";

class Invader {
    invaderHtmlElement;
    posX;
    posY;
    invaderProbs = [1,1,1,2,2,2,3,3,4,4];
    scoreShot;

    constructor(){
        this.id= Math.round(Math.random()*27182818285);
        // this.src=greenInvader;
        this.initPosLeft= Math.round(Math.random()*90+5);
        this.initPosTop= 2;
        this.hitBoxHeight= 30;
        this.hitBoxWidth= 30;
        this.init();
    }

    init(){
        const randomInvader = Math.floor(Math.random()*this.invaderProbs.length);
        switch(randomInvader){
            case 1:     this.src= greenInvader;
                        this.scoreShot= 1;
                        break;
            case 2:     this.src= orangeInvader;
                        this.scoreShot= 2;
                        break;
            case 3:     this.src= brownInvader;
                        this.scoreShot= 5;
                        break;
            case 4:     this.src= yellowInvader;
                        this.scoreShot= 10;
                        break;
            default:    this.src= greenInvader;
                        break;
        }
        document.querySelector('body').insertAdjacentHTML('afterbegin',`<img src=${this.src} class="invader" id="invader${this.id}">`);
        this.invaderHtmlElement= document.getElementById(`invader${this.id}`);
        this.invaderHtmlElement.style.left= `${this.initPosLeft}vw`;
        this.invaderHtmlElement.style.top= `${this.initPosTop}vh`;
    }

    getPos(){
        const tmp= this.invaderHtmlElement.getBoundingClientRect();
        this.posX= tmp.left;
        this.posY= tmp.top;
    }

    goDown(){
        const tmpInvaderPos= parseInt(this.invaderHtmlElement.style.top);
        if(tmpInvaderPos < 94){
            this.invaderHtmlElement.style.top= `${tmpInvaderPos + 2}vh`;
            return true;
        }
        else {
            this.invaderHtmlElement.remove();
            return false;
        }
    }

    isShotted(pos_laserXY){
        this.getPos();
        if(pos_laserXY.top > (this.posY - this.hitBoxHeight) && pos_laserXY.top < (this.posY + this.hitBoxHeight) 
            && pos_laserXY.left > (this.posX - this.hitBoxWidth) && pos_laserXY.left < (this.posX + this.hitBoxWidth)){
                this.invaderHtmlElement.remove();
                audioExplosion.play();
                return this.scoreShot;
            }
        else {
            return false;
        }
    }
}

export default Invader;