export class Canvas{
    constructor(config) {
        this.context = config.context;
        this.world = config.world;
    }

    drawImage(image, posX, posY, scaleX, scaleY) {
        this.context.drawImage(
            image,
            posX + this.world.offsetX,
            posY + this.world.offsetY,
            scaleX,
            scaleY
        );
    }
}