export default (Base) => {
    class Animation extends Base {
        constructor(config) {
            super();
            this.animation = {
                index: 0,
                state: config.idle,
                config: config,
                isReversed: false,
                nextAnimation: null
            };
        }

        nextAnimationFrame() {
            this.animation.index++;

            if (this.animation.index >= this.animation.state.loop.length) {
                if (this.animation.nextAnimation) {
                    this.setAnimation(this.animation.nextAnimation, this.animation.isReversed);
                    this.animation.nextAnimation = null;
                }
                this.animation.index = 0;
            }
        }

        setAnimation(name, isReversed) {
            const {animation: {state: currentState, config: currentConfig}} = this;

            const targetName = isReversed ? `${name}Reverse` : name;
            const targetAnimation = currentConfig[targetName];

            if (targetAnimation === currentState) return;
            console.log(targetName);
            if (currentState.transitions && currentState.transitions[targetName]) {
                const transitionAnimation = currentConfig[currentState.transitions[targetName]];
                this.animation.state = transitionAnimation;
                this.animation.nextAnimation = transitionAnimation.onEnd;
            } else {
                this.animation.state = targetAnimation;
            }
            this.animation.isReversed = isReversed;
            this.#resetIndex();
            this.resetFrame();
        }


        #resetIndex() {
            this.animation.index = 0;
        }
    }

    return Animation;
};