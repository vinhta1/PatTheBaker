//hover button https://labs.phaser.io/edit.html?src=src/input/mouse/click%20sprite.js&v=3.70.0

class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.parentScene = scene;                           //maintain scene context
        
        this.parentScene.add.existing(this);                //draw the button
        this.setInteractive();

        this.on("pointerover", (pointer) => {               //hover lights up
            this.setTint(0xffcd45);
        });
        this.on("pointerdown", (pointer) => {
            this.setTint(0x424242);
        });
        this.on("pointerup", (pointer) => {
            this.clearTint();
        });
        this.on("pointerout", (pointer) => {
            this.clearTint();
        });
    }
}