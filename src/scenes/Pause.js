class Pause extends Phaser.Scene{
    constructor(){
        super("PauseScene");
    }

    init(data){
        this.returnScene = data.return; //gets the originial scene
    }

    create(){
        this.blackRectangle = this.add.rectangle(game.config.width/2,game.config.height/2,
        game.config.width/2,game.config.height/2,0x000000,.8).setScale(1);                  //add pause background

        this.ESCkey = this.input.keyboard.addKey("ESC");
        this.ESCkey.on("down", () => {
            // console.log("test")
            this.scene.resume(this.returnScene);                                            //go back to original scene.
            this.scene.sleep(this);                                                         //instead of deleted, sleep.
        });
    }
}