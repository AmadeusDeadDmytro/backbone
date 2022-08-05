import ANIMATION_CONFIG from "../animations/playerAnimationConfig";
import {classExtender, normalize} from "../helpers/common";
import Animation from "./Base/Animation";
import Frame from "./Base/Frame";

const MOVEMENT_SPEED = 700;

export class Player extends classExtender(Frame, Animation) {
    constructor(config) {
        super(ANIMATION_CONFIG);
        this.context = config.context;
        this.sprite = config.sprite;
        this.world = config.world;

        // Movement
        this.offsetX = 0;
        this.offsetY = 0;
        this.isMoving = false;

        // Extra
        this.isRightDirection = true;
        this.toIdleTimeout = null;
    }

    update(passedTime) {
        if (!this.sprite) return;

        this.#drawFrame(
            this.animation.state.loop[this.animation.index],
            this.animation.state.verticalCrop,
            400 + (this.animation.state.horizontalOffset || 0) + this.offsetX,
            window.innerHeight - normalize(this.animation.state.size.y) - 150
        );

        this.frame.count++;
        this.move(passedTime);
        this.checkFrame(() => this.nextAnimationFrame());

    }

    startMove(isRight) {
        this.isMoving = true;
        this.isRightDirection = isRight;
        this.setAnimation("idleDirectional", !isRight);
    }

    stopMove() {
        this.isMoving = false;
        this.#startToIdleTimeout();
    }

    move(time) {
        if (!this.isMoving) return;
        // TODO: Refactor this
        if (this.animation.nextAnimation) return;

        if (this.toIdleTimeout) {
            clearTimeout(this.toIdleTimeout);
        }
        this.offsetX += ((this.isRightDirection ? MOVEMENT_SPEED : -MOVEMENT_SPEED) * time);
    }

    #startToIdleTimeout() {
        if (this.toIdleTimeout) clearTimeout(this.toIdleTimeout);

        this.toIdleTimeout = setTimeout(() => {
            this.setAnimation("idle", !this.isRightDirection);
        }, 1000);
    }

    #drawFrame(frameX, frameY, canvasX, canvasY) {
        const size = this.animation.state.size;

        this.context.drawImage(
            this.sprite,
            size.x * frameX + (this.animation.index), // crop start point x
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