class Title extends Phaser.Scene{
    constructor(){
        super("TitleScene");
    }

    create(){
        this.add.sprite(0,0,"TitleBG").setOrigin(0);
        this.Rkey = this.input.keyboard.addKey("R");
        this.Rkey.on("down", () => {
            this.scene.switch("TutorialScene");
            this.Rkey.off("down");
        })
    }

    update(){
    }
}