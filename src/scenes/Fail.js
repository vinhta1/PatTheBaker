class Fail extends Phaser.Scene{
    constructor(){
        super("FailScene");
    }

    create(){
        this.add.sprite(0,0,"FailBG").setOrigin(0);
        this.Rkey = this.input.keyboard.addKey("R");
        this.Rkey.on("down", () => {
            this.scene.switch("TutorialScene");
            this.Rkey.off("down");
        })
    }

    update(){
    }
}