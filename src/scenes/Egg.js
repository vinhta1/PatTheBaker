class Egg extends Phaser.Scene{
    constructor(){
        super("EggGameScene");
    }

    create(){
        let title = this.scene.get("TitleScene") //get emergency escape
        title.emergencyEscape(this, true, "EggGameScene");

        this.add.sprite(0,0,"Round2Placeholder").setOrigin(0);
        this.Rkey = this.input.keyboard.addKey("R");
        this.Rkey.on("down", () => {
            this.scene.switch("TutorialScene");
            this.Rkey.off("down");
        })

        this.time.delayedCall(2500, ()=> {
            this.scene.switch("CreditScene");
        })
    }

    update(){
    }
}