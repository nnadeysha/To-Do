import Control from "./common/control";
import './animation.css'
export class Animation extends Control{
animBtn: Control<HTMLButtonElement>;
    counterBtn: Control<HTMLElement>;
constructor(parentNode: HTMLElement){
    super(parentNode);

    this.animBtn = new Control(this.node, 'button', 'animBtn animBtn-hidden', 'Start');
    this.counterBtn = new Control(this.node, 'div', 'counteBtn counterBtn-hidden');
    
}

animate(){
    this.animBtn.node.ontransitionend = () => {
        
    }
    this.animBtn.node.classList.add('animBtn-hidden')
}

}