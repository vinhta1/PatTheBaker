class Fail extends Phaser.Scene{
    constructor(){
        super("FailScene");
    }

    create(){
        this.sound.stopAll();
        let title = this.scene.get("TitleScene") //get emergency escape
        title.emergencyEscape(this);

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