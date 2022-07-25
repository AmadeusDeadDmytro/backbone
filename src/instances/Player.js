

import { GAME_CONFIG } from "../helpers/constants";
import Frame from "./Base/Frame";

const animationConfig = {
    idle: {
        loop: [0, 1, 2],
        size: {
            x: 43,
            y: 91
        }
    }
};

export class Player extends Frame {    
    constructor(config) {
        super();
        this.context = config.context;
        this.sprite  = config.sprite;        
        
        this.currentAnimationIndex = 0;
        this.animationState = animationConfig.idle;
    }

    update() {
        if (!this.sprite) return;

        this.#drawFrame(this.animationState.loop[this.currentAnimationIndex], 0, 0, window.innerHeight * 0.5);

        this.increaseFrameCount();
        if (this.frameCount < 4) {
            return;
        } else {
            this.resetFrameCount();
        }        
        
        // TODO: Refactor
        this.currentAnimationIndex++;
        if (this.currentAnimationIndex >= this.animationState.loop.length) {
            this.currentAnimationIndex = 0;
        }
    }

    #drawFrame(frameX, frameY, canvasX, canvasY) {   
        const size = this.animationState.size;

        this.context.drawImage(
            this.sprite, 
            size.x * frameX, // crop start point x
            size.y * frameY, // crop start point y
            size.x, // size cropped area x
            size.y, // size cropped area y
            canvasX, // position image x
            canvasY, // position image y
            size.x * GAME_CONFIG.PIXEL_SIZE, // size image x
            size.y * GAME_CONFIG.PIXEL_SIZE, // size image y     
        );  
    }
}