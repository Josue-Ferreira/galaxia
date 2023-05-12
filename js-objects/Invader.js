let audioExplosion = new Audio("assets/explosion.mp3");

class Invader {
    invaderHtmlElement;
    posX;
    posY;

    constructor(){
        this.id= Math.round(Math.random()*27182818285);
        this.src="assets/green_invader.png";
        this.initPosLeft= Math.round(Math.random()*90+5);
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
        this.posX= tmp.left;
        this.posY= tmp.top;
    }

    goDown(){
        const tmpInvaderPos= parseInt(this.invaderHtmlElement.style.top);
        if(tmpInvaderPos < 92){
            this.invaderHtmlElement.style.top= `${tmpInvaderPos + 2}vh`;
            return true;
        }
        else {
            this.invaderHtmlElement.remove();
            console.log(this.id)
            return false;
        }
    }

    isShotted(pos_laserXY){
        this.getPos();
        if(pos_laserXY.top > (this.posY - this.hitBoxHeight) && pos_laserXY.top < (this.posY + this.hitBoxHeight) 
            && pos_laserXY.left > (this.posX - this.hitBoxWidth) && pos_laserXY.left < (this.posX + this.hitBoxWidth)){
                this.invaderHtmlElement.remove();
                audioExplosion.play();
                return true;
            }
        else {
            return false;
        }
    }
}

export default Invader;