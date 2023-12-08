// Vinh Ta
// Pat the Baker, from Billy and Mandy: Brown Evil
// Started: 12/04/23
// Playtest Version: 12/06/23
// Done, 8-16 hours in 2 days?
// Final Version: 12/14/23
//

// Technical Execution: physics systems (velocity and movement), cameras (multiple cameras for UI and events),
// animation manager (Pat, objects), tween manager (zoom in effects, certain UI elements), timers (timers for... timing / QTEs, scene transitions)

// Ghibo talk font by Docallisme https://www.dafont.com/ghibo-talk.font
// Announcer Voice: Microsoft Zira

// custom font https://webtips.dev/webtips/phaser/custom-fonts-in-phaser3 https://github.com/vercel/next.js/discussions/16850
// smooth zooming https://stackoverflow.com/questions/56289506/phaser-3-how-to-create-smooth-zooming-effect
// Flipping animation: https://phaser.discourse.group/t/flipx-for-spritesheet-animation/12935

// Progress Bar: https://phaser.io/examples/v3/view/game-objects/nine-slice/progress-bar
// Loading Bar: https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/
// mouse hover: https://labs.phaser.io/edit.html?src=src/input/mouse/click%20sprite.js&v=3.70.0

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
    scene: [Load, Title, Credits, Tutorial, Transition01a, Egg, Fail]
}

const game = new Phaser.Game(config);

// global
let cursors;