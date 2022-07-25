
import HeroSpritesheet from "../assets/characters/hero.png";
import { GAME_CONFIG } from "../helpers/constants";

export class Player {
    constructor(config) {
        this.position = {
            x: 0,
            y: 0
        };
        this.context = config.context;
        this._init();
    }

    _init() {
        const image = new Image();
        image.src = HeroSpritesheet;
        image.style.imageRendering = "pixelated";
        image.onload = () => {
            this.context.drawImage(
                image, 
                0, 
                window.innerHeight * 0.50, 
                41 * GAME_CONFIG.PIXEL_SIZE, 
                89 * GAME_CONFIG.PIXEL_SIZE
            );
        };         
    }
}