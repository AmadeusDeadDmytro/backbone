import { normalize } from "../helpers/common";
import Frame from "./Base/Frame";

const animationConfig = {
    idleReverse: {
        loop: [0, 1, 2],
        size: {
            x: 41,
            y: 89
        },
        verticalCrop: 0,
        horizontalOffset: -60
    },
    idle: {
        loop: [0, 1, 2],
        size: {
            x: 41,
            y: 89
        },
        verticalCrop: 90
    },
    idleDirectionalReverse: {
        loop: [0, 1, 2],
        size: {
            x: 32,
            y: 89
        },
        verticalCrop: 180
    },
    idleDirectional: {
        loop: [0, 1, 2],
        size: {
            x: 32,
            y: 89
        },
        verticalCrop: 270
    }
};

const SPEED = 700;

export class Player extends Frame {    
    constructor(config) {
        super();
        this.context = config.context;
        this.sprite  = config.sprite;       
        this.world = config.world; 

        // Movement
        this.offsetX = 0;
        this.offsetY = 0;
        this.isMoving = false;
        
        // Animation
        this.currentAnimationIndex = 0;
        this.animationState = animationConfig.idle;

        // Extra
        this.isRightDirection = true;
        this.toIdleTimeout = null;
    }
    
    update(passedTime) {
        if (!this.sprite) return;
    
        this.#drawFrame(
            this.animationState.loop[this.currentAnimationIndex], 
            this.animationState.verticalCrop, 
            400 + (this.animationState.horizontalOffset || 0) + this.offsetX, 
            window.innerHeight * 0.38
        );

        this.increaseFrameCount();

        if (this.isMoving) {
            if (this.toIdleTimeout)
            {
                clearTimeout(this.toIdleTimeout);
            }
            this.move(passedTime);
        }

        if (this.frameCount < 10) {   
            return;
        } else {
            this.currentAnimationIndex++;
            if (this.currentAnimationIndex >= this.animationState.loop.length) {
                this.currentAnimationIndex = 0;
            }
            this.resetFrameCount();
        }    
    }

    startMove(isRight) {
        this.isMoving = true;
        this.isRightDirection = isRight;
        this.animationState = isRight ? animationConfig.idleDirectional : animationConfig.idleDirectionalReverse;
    }

    stopMove(){
        this.isMoving = false;
        this.#startToIdleTimeout();
    }

    move(time) {   
        this.offsetX += ((this.isRightDirection ? SPEED : -SPEED) * time);
    }

    #startToIdleTimeout() {
        if (this.toIdleTimeout) clearTimeout(this.toIdleTimeout);
        
        this.toIdleTimeout = setTimeout(() => {
            this.animationState = this.isRightDirection ? animationConfig.idle : animationConfig.idleReverse;
        }, 2000);
    }

    #drawFrame(frameX, frameY, canvasX, canvasY) {   
        const size = this.animationState.size;

        this.context.drawImage(
            this.sprite, 
            size.x * frameX + (this.currentAnimationIndex), // crop start point x
            frameY, // crop start point y
            size.x, // size cropped area x
            size.y, // size cropped area y
            canvasX, // position image x
            canvasY, // position image y
            normalize(size.x) * 1.25, // size image x
            normalize(size.y) * 1.25, // size image y     
        );  
    }
}