

import { GAME_CONFIG } from "../helpers/constants";
import Frame from "./Frame";

const PLAYER_ANIMATION_LOOP = {
    IDLE: [0, 1, 2]
};

export class Player extends Frame {
    constructor(config) {
        super();
        this.size = {
            x: 43,
            y: 91
        };
        this.context = config.context;
        this.sprite  = config.sprite;        
        
        this.currentAnimSprite = 0;
        this.animationState = "IDLE";
    }

    update() {
        if (!this.sprite) return;

        this.drawFrame(PLAYER_ANIMATION_LOOP[this.animationState][this.currentAnimSprite], 0, 0, window.innerHeight * 0.5);

        this.increaseFrameCount();
        if (this.frameCount < 4) {
            return;
        } else {
            this.resetFrameCount();
        }        
        
        this.currentAnimSprite++;
        if (this.currentAnimSprite >= PLAYER_ANIMATION_LOOP[this.animationState].length) {
            this.currentAnimSprite = 0;
        }
    }

    drawFrame(frameX, frameY, canvasX, canvasY) {   
        this.context.drawImage(
            this.sprite, 
            this.size.x * frameX, // crop start point x
            this.size.y * frameY, // crop start point y
            this.size.x, // size cropped area x
            this.size.y, // size cropped area y
            canvasX, // position image x
            canvasY, // position image y
            this.size.x * GAME_CONFIG.PIXEL_SIZE, // size image x
            this.size.y * GAME_CONFIG.PIXEL_SIZE, // size image y     
        );  
    }
}