class Pause extends Phaser.Scene{
    constructor(){
        super("PauseScene");
    }

    init(data){
        this.returnScene = data.return; //gets the originial scene
    }

    create(){
        this.returnSceneScene = this.scene.manager.getScene(this.returnScene);                  //get original scene
        
        this.blackRectangle = this.add.rectangle(game.config.width/2,game.config.height/2,      //add pause background
        game.config.width/2,game.config.height/2,0x000000,.8).setScale(1);
        this.returnSceneScene.sound.pauseAll();

        this.Button01 = new Button(this,game.config.width/2, game.config.height/2, "fullAtlas", "Sausage_00");
        this.Button01.setY(this.Button01.y+this.Button01.height)
        this.Button01.on("pointerup", (pointer) => {
            this.returnSceneScene.time.removeAllEvents();   //stop any delayedCalls in progress
            this.returnSceneScene.scene.stop();
            this.returnSceneScene.sound.stopAll();          //stop any sound playing
            this.scene.start("TitleScene");
        });

        this.buttonText(this.Button01, "Title");

        this.Button02 = new Button(this,game.config.width/2, game.config.height/2, "fullAtlas", "Sausage_00");
        this.Button02.setY(this.Button02.y-this.Button02.height)
        this.Button02.on("pointerup", (pointer) => {
            this.returnSceneScene.sound.resumeAll();
            this.scene.resume(this.returnScene);            //just like pressing the escape key
            this.scene.sleep(this);
        });
        

        this.buttonText(this.Button02, "Resume");

        //unpause
        this.ESCkey = this.input.keyboard.addKey("ESC");
        this.ESCkey.on("down", () => {
            // console.log("test")
            this.returnSceneScene.sound.resumeAll();
            this.scene.resume(this.returnScene);                                            //go back to original scene.
            this.scene.sleep(this);                                                         //instead of deleted, sleep.
        });
    }

    //allows buttons to get text
    buttonText(button, text, scale = 2){
        this.add.text(button.x, button.y, text, {
            fontFamily:"Ghibo Talk"
        }).setScale(scale).setOrigin(0.5).setResolution(scale).setTint(0x000000);
    }
}