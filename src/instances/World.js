import { normalize } from "../helpers/common";

export class World {
    constructor(config) {
        this.context = config.context;

        this.offsetX = 0;
        this.offsetY = 0;	
        this.minOffsetX = 0;
    }

    drawImage(image, posX, posY, scaleX, scaleY) {
        this.context.drawImage(
            image,
            posX + this.offsetX,
            posY + this.offsetY,
            scaleX,
            scaleY
        );
    }

    drawFullfilledImage(image, canvasHeight) {
        this.drawImage(
            image,
            0, 
            canvasHeight - normalize(image.height), 
            normalize(image.width), 
            normalize(image.height)
        );
    }
}