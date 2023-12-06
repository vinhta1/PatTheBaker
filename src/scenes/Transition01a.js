class Transition01a extends Phaser.Scene{
    constructor(){
        super("Transition01aScene");
    }

    load() {
        
    }

    create(){
        //transition screen initialization
        this.round1WinBG = this.add.sprite(0,0,"Round1WinBG").setOrigin(0);
        this.round2IntroBG  = this.add.sprite(0,0,"Round2IntroBG").setOrigin(0).setVisible(false);

        //sound initialization
        this.sound.stopAll();
        this.round01WinA = this.sound.add("bgm_beatRound01", {
            volume:0.5,
            loop: false,
            rate: 1
        })
        this.round01WinB = this.sound.add("sfx_r1Success", {
            volume:0.7,
            loop: false,
            rate: 1
        })
        this.round02IntroA = this.sound.add("bgm_introRound02", {
            volume:0.5,
            loop: false,
            rate: 1
        })
        this.round02IntroB = this.sound.add("sfx_r2Intro", {
            volume:0.7,
            loop: false,
            rate: 1
        })

        //sound playing
        this.round01WinA.play();
        this.round01WinB.play();
        this.round01WinA.on("complete", () => {
            this.time.delayedCall(1000, () => {
                this.round2IntroBG.setVisible(true);
                this.round02IntroA.play();
                this.round02IntroB.play()
                this.round02IntroA.on("complete", () => {

                });
            });
        });
    }
}