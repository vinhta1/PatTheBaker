class Oven extends Phaser.Scene{
    constructor() {
        super("OvenScene");
    };

    create(){
        this.QTE = false; //QTE flag

        //initialize cursors
        cursors = this.input.keyboard.createCursorKeys();

        //add bgm
        this.bgm = this.sound.add("bgm_oven", {
            volume:0.4,
            loop: true,
            rate: 1
        });
        this.bgm.play();
        this.ovenSFX = this.sound.add("sfx_oven", {
            volume:0.7,
            loop: false
        });
        

        this.add.sprite(0,0,"kitchenBG").setOrigin(0);
        this.blackRectangle = this.add.rectangle(0,0,game.config.width,game.config.height,0x000000,.8).setScale(5);
        //this.cameras.main.setBackgroundColor(0x11dc00);
        this.player = new Pat(this, game.config.width*3/4, game.config.height, "fullAtlas", "Pat_00"); //add Pat
        this.player.setY(this.player.y - this.player.height*1.5);
        this.oven = this.physics.add.sprite(game.config.width*1/8, game.config.height,"fullAtlas", "Oven_00").setScale(2); //add oven
        this.oven.setY(this.player.y);
        this.oven.setX(this.oven.x + this.oven.width);
        this.oven.setImmovable(true);

        this.cameras.main.ignore(this.blackRectangle);

        this.QTECam = this.cameras.add(0, 0, game.config.width, game.config.height).setVisible(false);
        //this.QTECam.setBounds(0,0,game.config.height,game.config.height);
        //this.QTECam.startFollow(this.player, false, .2, .2, );

        this.physics.add.collider(this.player, this.oven, () => {
            this.ovenSFX.play();
            this.bgm.setRate(.8).setVolume(0.1);
            this.time.delayedCall(5000, () => {
                this.bgm.setVolume(0.2);
                this.time.delayedCall(2500, () => {
                    this.bgm.setVolume(0.3);
                })
            })
            this.cameras.main.setVisible(false);
            this.QTE = true; //QTE flag
            this.player.QTE(); //player's QTE flag
            this.QTECam.setVisible(true);
            this.QTECam.zoomTo(2, 10000, "Circ");
            this.QTECam.pan(this.player.x - (this.player.x - this.oven.x)/2,this.player.y-this.player.y/8,10000,"Circ")
            
        })
    }

    update(){
        this.player.update();
        if(this.QTE){
            if (cursors.space.isDown) {
                this.oven.anims.play("oven-open");
                this.player.anims.play("pat-open");
            }
        }
    }
    
}