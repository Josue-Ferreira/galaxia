let audioExplosion = new Audio("assets/explosion.mp3");

class Invader {
    invaderHtmlElement;
    posX;
    posY;

    constructor(){
        this.id= Math.round(Math.random()*27182818285);
        this.src="assets/green_invader.png";
        this.initPosLeft= Math.round(Math.random()*96);
        this.initPosTop= 2;
        this.hitBoxHeight= 20;
        this.hitBoxWidth= 30;
        this.init();
    }

    init(){
        document.querySelector('body').insertAdjacentHTML('afterbegin',`<img src=${this.src} class="invader" id="invader${this.id}">`);
        this.invaderHtmlElement= document.getElementById(`invader${this.id}`);
        this.invaderHtmlElement.style.left= `${this.initPosLeft}vw`;
        this.invaderHtmlElement.style.top= `${this.initPosTop}vh`;
    }

    getPos(){
        const tmp= this.invaderHtmlElement.getBoundingClientRect();
        posX= tmp.left;
        posY= tmp.top;
    }

    isShotted(pos_laserXY){
        if(pos_laserXY.top > (posY - this.hitBoxHeight) && pos_laserXY.top < (posY + this.hitBoxHeight) 
            && pos_laserXY.left > (posX - this.hitBoxWidth) && pos_laserXY.left < (posX + this.hitBoxWidth)){
                this.invaderHtmlElement.remove();
                audioExplosion.play();
                return true;
            }
        else {
            return false;
        }
    }
}