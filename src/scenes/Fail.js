class Fail extends Phaser.Scene{
    constructor(){
        super("FailScene");
    }

    create(){
        this.sound.stopAll();
        let title = this.scene.get("TitleScene") //get emergency escape
        title.emergencyEscape(this);

        this.fffire = this.sound.add("sfx_failFire", {
            volume: 1,
            loop: true,
            rate: 1
        });

        this.alarm = this.sound.add("sfx_failAlarm", {
            volume:0.5,
            loop: true,
            rate: 1
        });
        
        this.voice = this.sound.add("sfx_r1Fail", {
            volume:0.7,
            loop: false,
            rate: 1
        });

        this.fffire.play();
        this.alarm.play();
        this.time.delayedCall(1000, ()=> {
            this.voice.play();
        });

        this.add.sprite(0,0,"FailBG").setOrigin(0);
        this.Rkey = this.input.keyboard.addKey("R");
        this.Rkey.on("down", () => {
            this.scene.switch("TutorialScene");
            this.Rkey.off("down");
        })

        this.add.text(game.config.width/2, game.config.height*5/9 + 20, "Press R to try again", {
            fontFamily:"Ghibo Talk",
            wordWrap: {width: game.config.width/2},
            align: "center"
        }).setOrigin(0.5).setScale(3).setResolution(3).setTint(0x000000);
        this.add.text(game.config.width/2, game.config.height*6/9, "Press ESC to return to title", {
            fontFamily:"Ghibo Talk",
            wordWrap: {width: game.config.width/2},
            align: "center"
        }).setOrigin(0.5).setScale(3).setResolution(3).setTint(0x000000);
    }

    update(){
    }
}