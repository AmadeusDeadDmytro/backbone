export default (Base) => {
    class Animation extends Base {
        constructor(config) {
            super();
            this.animation = {
                index: 0,
                state: config.idle,
                config: config
            };
        }

        nextAnimation() {
            this.animation.index++;
            if (this.animation.index >= this.animation.state.loop.length) {
                this.animation.index = 0;
            }
        }

        setAnimation(name, isReversed) {
            this.animation.state = this.animation.config[isReversed ? `${name}Reverse` : name];
        }
    }
    return Animation;
};