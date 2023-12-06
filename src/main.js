// Vinh Ta
// Pat the Baker, from Billy and Mandy: Brown Evil
// Started: 12/04/23
// Playtest Version: 12/06/23
// Done, 8-16 hours in 2 days?

// smooth zooming https://stackoverflow.com/questions/56289506/phaser-3-how-to-create-smooth-zooming-effect
// Flipping animation: https://phaser.discourse.group/t/flipx-for-spritesheet-animation/12935
// Announcer Voice: Microsoft Zira
// Progress Bar: https://phaser.io/examples/v3/view/game-objects/nine-slice/progress-bar

'use strict'

// define game object
let config = {
    type: Phaser.AUTO,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false //true
        }
    },
    width: 800,
    height: 600,
    scene: [Load, Tutorial, Transition01a]
}

const game = new Phaser.Game(config);

// global
let cursors;