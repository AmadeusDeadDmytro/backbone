/*
* @loop - queue sprite frames
* @size - sprite size
* @verticalCrop - row of animation, offset from top of the spritesheet
* @horizontalOffset - offset for sprite if we need this
* @transitions - transition animations
* @onEnd - animation which must turn on when current is end
* */

export default {
    idleReverse: {
        loop: [0, 1, 2],
        size: {
            x: 41,
            y: 89
        },
        verticalCrop: 0,
        horizontalOffset: -60
    },
    idle: {
        loop: [0, 1, 2],
        size: {
            x: 41,
            y: 89
        },
        verticalCrop: 90
    },
    idleDirectionalReverse: {
        loop: [0, 1, 2],
        size: {
            x: 32,
            y: 89
        },
        verticalCrop: 180,
        transitions: {
            idleDirectional: "rotationReverse"
        }
    },
    idleDirectional: {
        loop: [0, 1, 2],
        size: {
            x: 32,
            y: 89
        },
        verticalCrop: 270,
        transitions: {
            idleDirectionalReverse: "rotation"
        }
    },
    rotation: {
        loop: [0, 1],
        size: {
            x: 33,
            y: 86
        },
        verticalCrop: 360,
        onEnd: "idleDirectional"
    },
    rotationReverse: {
        loop: [0, 1],
        size: {
            x: 33,
            y: 86
        },
        verticalCrop: 450,
        onEnd: "idle"
    },
};