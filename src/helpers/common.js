import { GAME_CONFIG } from "./constants";

export const normalize = (num) => num * GAME_CONFIG.PIXEL_SIZE;

const creator = (allClasses, cls) => cls(allClasses);

class Base {
    constructor() {
        this.base = true;
    }
}

export const classExtender = (...classes) => classes.reduce(creator, Base);