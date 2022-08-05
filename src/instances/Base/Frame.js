import {ANIMATION_FRAME_SPEED} from "../../helpers/constants";

export default (Base) => {
    class Frame extends Base {
        constructor() {
            super();
            this.frame = {
                count: 0
            };
        }

        checkFrame(callback) {
            if (this.frame.count >= ANIMATION_FRAME_SPEED || this.frame.count >= this.animation.state.speed) {
                callback();
                this.frame.count = 0;
            }
        }

        resetFrame() {
            this.frame.count = 0;
        }
    }

    return Frame;
};