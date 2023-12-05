class Load extends Phaser.Scene{
    constructor() {
        super("LoadScene");
    };

    preload() {
        //load images
        this.load.path = "./assets/images/";
        this.load.image("kitchenBG","Kitchen.png");
        this.load.atlas("fullAtlas", "TextureAtlas.png","TextureJSON.json");

        //load music
        this.load.path = "./assets/music/";
        this.load.audio("bgm_oven", "bgm01.wav");
        this.load.audio("bgm_beatRound01", "beatRound01.wav");
        this.load.audio("bgm_introRound02", "introRound02.wav");

        //load sfx
        this.load.path = "./assets/sfx/";
        this.load.audio("sfx_oven", "oven.wav");
        this.load.audio("sfx_points", "getPoints.wav");
        this.load.audio("sfx_r1Success","round1Success.wav");
        this.load.audio("sfx_r2Intro","round2Intro.wav");
    }

    create() {
        //create animations
        this.anims.create({
            key: "move-left",
            frames: this.anims.generateFrameNames("fullAtlas", {
                prefix: "Pat_",
                start: "00",
                end: "04",
                zeroPad: 2
            }),
            frameRate: 4
        })

        this.anims.create({
            key: "pat-open",
            frames: this.anims.generateFrameNames("fullAtlas",{
                frames: ["Pat_10","Pat_10","Pat_11","Pat_11","Pat_12"]
            }),
            frameRate: 4
        })

        this.anims.create({
            key: "oven-open",
            frames: this.anims.generateFrameNames("fullAtlas",{
                frames: ["Oven_00","Oven_01","Oven_02","Oven_02","Oven_03"]
            }),
            frameRate: 4
        })

        //After everything's done, move to the next scene (currently oven)
        this.scene.start("TutorialScene");
    }

}