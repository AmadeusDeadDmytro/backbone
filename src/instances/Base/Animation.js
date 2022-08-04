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

        nextAnimationFrame() {
            this.animation.index++;

            if (this.animation.index >= this.animation.state.loop.length) {
                this.animation.index = 0;
            }
        }

        setAnimation(name, isReversed) {
            const {animation: {state: currentState, config: currentConfig}} = this;

            const targetName = isReversed ? `${name}Reverse` : name;
            const targetAnimation = currentConfig[targetName];

            if (targetAnimation === currentState) return;

            if (currentState.transitions && currentState.transitions[targetName]) {
                this.animation.state = currentConfig[currentState.transitions[targetName]];
            } else {
                this.animation.state = targetAnimation;
            }
            this.#resetIndex();
        }


        #resetIndex() {
            this.animation.index = 0;
        }
    }

    return Animation;
};