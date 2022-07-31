export default (Base) => {
    class Frame extends Base {
        constructor() {
            super();
            this.frameCount = 0;
        }
    
        increaseFrameCount() {
            this.frameCount++;
        }
    
        resetFrameCount() {
            this.frameCount = 0;
        }
    }
    return Frame;
};