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

        this.test = new Button(this,game.config.width/2, game.config.height/2, "fullAtlas", "Sausage_00");
        this.test.on("pointerup", (pointer) => {
            this.scene.switch("TutorialScene");
        });
    }

    update(){
    }
}