export default class Frame {
    constructor() {
        this.frameCount = 0;
    }

    increaseFrameCount() {
        this.frameCount++;
    }

    resetFrameCount() {
        this.frameCount = 0;
    }
}