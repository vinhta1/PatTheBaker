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

        //Make buttons + destinations
        this.Button01 = new Button(this,game.config.width/2, game.config.height/2, "fullAtlas", "Sausage_00");
        this.Button01.on("pointerup", (pointer) => {
            this.scene.switch("TutorialScene");
        });

        //Give buttons text
        this.ButtonText(this.Button01, "Tutorial");
    }

    update(){
    }

    //allows buttons to get text
    ButtonText(button, text){
        this.add.text(button.x, button.y, text, {
            fontFamily:"Ghibo Talk"
        }).setScale(2).setOrigin(0.5).setResolution(2).setTint(0x000000);
    }
}