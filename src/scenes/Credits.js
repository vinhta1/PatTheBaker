class Credits extends Phaser.Scene{
    constructor(){
        super("CreditScene");
    }

    create(){
        this.add.sprite(0,0,"CreditsBG").setOrigin(0); //set credit background

        let title = this.scene.get("TitleScene") //get emergency escape
        title.emergencyEscape(this);

        //create header sausages
        this.fontHeader = this.add.sprite(0,0,"fullAtlas","Sausage_00");
        this.fontHeader.setPosition(this.fontHeader.width*3/4, this.fontHeader.height/2);
        this.voiceHeader = this.add.sprite(0,0,"fullAtlas","Sausage_00");
        this.voiceHeader.setPosition(game.config.width - this.voiceHeader.width*3/4, this.voiceHeader.height/2);
        this.meHeader01 = this.add.sprite(0,0,"fullAtlas","Sausage_00").setAngle(-10);
        this.meHeader01.setPosition(game.config.width/2 - this.meHeader01.width/2,game.config.height/2);
        this.meHeader02 = this.add.sprite(0,0,"fullAtlas","Sausage_00").setAngle(10);
        this.meHeader02.setPosition(game.config.width/2 + this.meHeader02.width/2,game.config.height/2).setFlipX(true);
        this.exitButton = new Button(this, 0, 0,"fullAtlas","Sausage_00").setScale(.75); //exit button
        this.exitButton.on("pointerup", (pointer) => {
            this.scene.switch("TitleScene");
        });
        this.exitButton.setPosition(this.exitButton.width/2, game.config.height - this.exitButton.height/2);

        //make header text
        this.buttonText(this.fontHeader, "Font");
        this.buttonText(this.voiceHeader, "Voice");
        this.buttonText(this.meHeader01, "Made",);
        this.buttonText(this.meHeader02, "By",);
        this.buttonText(this.exitButton, "Back",);

        //make regular text
        this.add.text(this.fontHeader.x + 10, this.fontHeader.y + this.fontHeader.height,"Ghibo Talk by Docallisme", {
            fontFamily:"Ghibo Talk",
            wordWrap: {width: this.fontHeader.width/2},
            align: "center"
        }).setOrigin(0.5).setScale(1.5).setResolution(2).setTint(0xFACADE);

        this.add.text(this.voiceHeader.x, this.voiceHeader.y + this.voiceHeader.height,"Microsoft Zira", {
            fontFamily:"Ghibo Talk",
            wordWrap: {width: this.voiceHeader.width/4},
            align: "center"
        }).setOrigin(0.5).setScale(1.5).setResolution(2).setTint(0xFACADE);

        this.add.text(game.config.width/2, game.config.height*5/8,"Vinh Ta", {
            fontFamily:"Ghibo Talk",
            align: "center"
        }).setOrigin(0.5).setScale(3).setResolution(3).setTint(0x000000);
    }

    //allows buttons to get text
    buttonText(button, text, scale = 2){
        this.add.text(button.x, button.y, text, {
            fontFamily:"Ghibo Talk"
        }).setScale(scale).setOrigin(0.5).setResolution(scale).setTint(0x000000);
    }
}