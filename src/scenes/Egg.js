class Egg extends Phaser.Scene{
    constructor(){
        super("EggGameScene");
    }

    create(){
        this.add.sprite(0,0,"Round2Placeholder").setOrigin(0);
        this.Rkey = this.input.keyboard.addKey("R");
        this.Rkey.on("down", () => {
            this.scene.switch("TutorialScene");
            this.Rkey.off("down");
        })
    }

    update(){
    }
}