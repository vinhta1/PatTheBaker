class Title extends Phaser.Scene{
    constructor(){
        super("TitleScene");
    }

    create(){
        this.add.sprite(0,0,"TitleBG").setOrigin(0); //set title background

        //emergency start key
        this.Rkey = this.input.keyboard.addKey("R");
        this.Rkey.on("down", () => {
            this.scene.switch("TutorialScene");
        })

        //Make buttons + destinations
        this.Button01 = new Button(this,game.config.width/2, game.config.height/2, "fullAtlas", "Sausage_00");
        this.Button01.on("pointerup", (pointer) => {
            this.scene.switch("TutorialScene");
        });

        this.Button02 = new Button(this, game.config.width/2, game.config.height*3/4, "fullAtlas", "Sausage_00");
        this.Button02.on("pointerup", (pointer) => {
            this.scene.switch("CreditScene");
        });

        //Give buttons text
        this.buttonText(this.Button01, "Tutorial");
        this.buttonText(this.Button02, "Credits");
    }

    update(){
    }

    //allows buttons to get text
    buttonText(button, text, scale = 2){
        this.add.text(button.x, button.y, text, {
            fontFamily:"Ghibo Talk"
        }).setScale(scale).setOrigin(0.5).setResolution(scale).setTint(0x000000);
    }

    emergencyEscape(scene){ //emergency esc key
        scene.ESCkey = scene.input.keyboard.addKey("ESC");
        scene.ESCkey.on("down", () => {
            scene.time.removeAllEvents();   //stop any delayedCalls in progress
            scene.scene.stop();
            scene.sound.stopAll();          //stop any sound playing
            scene.scene.start("TitleScene");
        })
    }
}