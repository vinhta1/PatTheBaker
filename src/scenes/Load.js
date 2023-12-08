class Load extends Phaser.Scene{
    constructor() {
        super("LoadScene");
    };

    preload() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        this.load.on('progress', function (value) {
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        //load images
        this.load.path = "./assets/images/";
        this.load.image("kitchenBG","Kitchen.png");
        this.load.image("Round2Placeholder","Round2Placeholder.png");
        this.load.image("Round1WinBG","Round01WinBG.png");
        this.load.image("Round2IntroBG","Round02IntroBG.png");
        this.load.image("FailBG", "FailBG.png");
        this.load.image("TitleBG","TitleBG.png");
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

        this.load.path = "";
        this.load.css("Style","./src/Style.css");
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

        this.anims.create({
            key: "A-highlight",
            frames: this.anims.generateFrameNames("fullAtlas",{
                frames: ["WASD_00","WASD_00","WASD_00","WASD_11","WASD_11","WASD_12","WASD_12"]
            }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: "leftClick-highlight",
            frames: this.anims.generateFrameNames("fullAtlas",{
                frames: ["Mouse_00","Mouse_00","Mouse_00","LC_01","LC_01","LC_02","LC_02"]
            }),
            frameRate: 4,
            repeat: -1
        })

        //After everything's done, move to the next scene (currently oven)
        this.scene.start("TitleScene");
    }

}