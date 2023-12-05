class Tutorial extends Phaser.Scene{
    constructor() {
        super("TutorialScene");
    };

    create(){
        this.sound.stopAll();   //Stop all running sounds
        this.QTE = false;       //QTE flag


        //add music and sounds
        this.bgm = this.sound.add("bgm_oven", {
            volume:0.4,
            loop: true,
            rate: 1
        });
        this.bgm.play();
        this.ovenSFX = this.sound.add("sfx_oven", {
            volume: 0.7,
            loop: false
        });
        this.pointsSFX = this.sound.add("sfx_points", {
            volume: 0.7,
            loop: false
        })
        
        
    
        this.add.sprite(0,0,"kitchenBG").setOrigin(0);                                                              //add background
        this.blackRectangle = this.add.rectangle(0,0,game.config.width,game.config.height,0x000000,.8).setScale(5); //add QTE filter
        //this.cameras.main.setBackgroundColor(0x11dc00);   //sets camera background to green
        //this.cameras.main.setZoom(0.8);                   //zoom out for debug


        //add Pat, move them off screen, then set world bounds so they can't stray too far to the right.
        this.player = new Pat(this, game.config.width, game.config.height, "fullAtlas", "Pat_00");
        this.player.setPosition(this.player.x + this.player.width * 6/10,this.player.y - this.player.height*1.5);
        this.physics.world.setBounds(0, 0, game.config.width+this.player.width * 11/10,game.config.height);
        this.player.body.setCollideWorldBounds(true);

        //a small check to get the player to stay on screen after moving on.
        this.onScreenCheck = this.physics.add.sprite(game.config.width-this.player.width - 16, this.player.y).setOrigin(1);
        this.physics.add.collider(this.player, this.onScreenCheck, (player, check) => {
            this.physics.world.setBounds(0, 0, game.config.width, game.config.height);
            check.destroy();
        })

        //add Oven
        this.oven = this.physics.add.sprite(game.config.width*1/8, game.config.height,"fullAtlas", "Oven_00").setScale(2); //add oven
        this.oven.setY(this.player.y);
        this.oven.setX(this.oven.x + this.oven.width);
        this.oven.setImmovable(true);

        //QTE Exit: Oven
        this.oven.on("animationcomplete", () => {
            this.time.delayedCall(250, () => {          //small delay
                this.QTECam.setVisible(false);          //go out of QTE cam
                this.cameras.main.setVisible(true);     //go back to regular cam
                this.ovenSFX.stop();                    //stop the QTE sfx
                this.bgm.setVolume(0.4);                //set bgm back to normal
                this.bgm.setRate(1);
                this.QTEcheck(this.QTEsuccess);
            })
        })


        //camera work
        this.cameras.main.ignore(this.blackRectangle);                                                  //ignore QTE filter at start
        this.QTECam = this.cameras.add(0, 0, game.config.width, game.config.height).setVisible(false);  //create a QTE camera
        //this.QTECam.setBounds(0,0,game.config.height,game.config.height);
        //this.QTECam.startFollow(this.player, false, .2, .2, );

        //QTE Enter: Oven
        this.physics.add.collider(this.player, this.oven, () => {
            this.QTEsuccess = false;
            console.log(this.QTEsuccess);
            this.time.delayedCall(3000, () => {
                this.QTEsuccess = true;
                console.log(this.QTEsuccess);
            });
            this.time.delayedCall(7500, () => {
                this.QTEsuccess = false;
                console.log(this.QTEsuccess);
            });
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
            
        });

        this.input.on("pointerdown", () => {    //left click interact for tutorial.
            if (this.QTE) {
                this.enactQTE();
            };
        });

        cursors.space.on("down", () => {        //space bar interact for tutorial.
            if (this.QTE) {
                this.enactQTE();
            };
        });
    }

    update(){
        this.player.update();
        // if(this.QTE){
        //     if (cursors.space.isDown) {
        //         this.oven.anims.play("oven-open");
        //         this.player.anims.play("pat-open");
        //     }
        // }
    }
    
    enactQTE(){
        this.QTECam.flash(1000);
        this.time.removeAllEvents();            //stop any delayedCalls in progress (bgm)
        this.oven.anims.play("oven-open");
        this.player.anims.play("pat-open");
        this.QTE = false;
    }

    QTEcheck(success){
        if (success){
            this.pointsSFX.play();
            this.pointsSFX.on("complete", () => {
                console.log("success");
                this.scene.stop("TutorialScene");
                this.scene.start("Transition01aScene");
            });
        } else {
            console.log("failure");
        }
    }
    
}