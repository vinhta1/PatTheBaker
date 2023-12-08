//playtest notes: add a fail state menu

class Tutorial extends Phaser.Scene{
    constructor() {
        super("TutorialScene");
    };

    create(){
        this.sound.stopAll();   //Stop all running sounds
        this.QTE = false;       //QTE flag

        let title = this.scene.get("TitleScene") //get emergency escape
        title.emergencyEscape(this, false, "TutorialScene");

        //add music and sounds
        this.bgm = this.sound.add("bgm_oven", {
            volume:0.5,
            loop: true,
            rate: 1
        });
        this.ovenSFX = this.sound.add("sfx_oven", {
            volume: 0.7,
            loop: false
        });
        this.pointsSFX = this.sound.add("sfx_points", {
            volume: 0.6,
            loop: false
        })
    

        this.kitchen = this.add.sprite(0,0,"kitchenBG").setOrigin(0);                                               //add background
        this.blackRectangle = this.add.rectangle(0,0,game.config.width,game.config.height,0x000000,.8).setScale(5); //add QTE filter


        //add tutorial keys, mouse sprite, and other UI
        this.tutorialWASD = this.add.sprite(game.config.width/2, game.config.height/4, "fullAtlas", "WASD_00").setVisible(false).setScrollFactor(0).setScale(2);
        this.tutorialMouse = this.add.sprite(game.config.width/2, game.config.height/4, "fullAtlas", "Mouse_00").setVisible(false).setScrollFactor(0).setScale(2);
        this.bar1 = this.add.nineslice(0, game.config.height/4, "fullAtlas", "ProgressBar").setVisible(false).setScale(2);
        this.bar1Target = this.add.nineslice(game.config.width/4 + 3, game.config.height/4, "fullAtlas", "ProgressBarFill",(this.bar1.width-12)*75/100,26,2,2).setVisible(false).setScale(1,2);
        this.bar1Fill = this.add.nineslice(game.config.width/4 + 3, game.config.height/4, "fullAtlas", "ProgressBarFill",5,26,2,2).setVisible(false).setScale(1,2);

        this.tutorialMouse.setX(game.config.width/2 - (this.tutorialMouse.width*6 + this.bar1.width)/2);
        this.bar1.setX(game.config.width/2 - (this.tutorialMouse.width*3 + this.bar1.width)/2);
        this.bar1Target.setX(game.config.width/2 - (this.tutorialMouse.width*3 + this.bar1.width)/2 + (this.bar1.width)*65/100);
        this.bar1Fill.setX(game.config.width/2 - (this.tutorialMouse.width*3 + this.bar1.width)/2 + 6);

        this.bar1Target.setTintFill(0x63ff70);
        this.bar1Target.setAlpha(.7);
        
        this.tutorialMouse.setOrigin(0, 0.5);
        this.bar1.setOrigin(0, 0.5);
        this.bar1Fill.setOrigin(0, 0.5);
        this.bar1Target.setOrigin(0, 0.5);

        this.gingerbread = this.add.sprite(0,0,"fullAtlas","GingerbreadMan").setVisible(false);

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
            this.bgm.play();
            this.tutorialWASD.setVisible(false);
            this.physics.world.setBounds(0, 0, game.config.width, game.config.height);
            check.destroy();
        })

        //add Oven
        this.oven = this.physics.add.sprite(game.config.width*1/8, game.config.height,"fullAtlas", "Oven_00").setScale(2); //add oven
        this.oven.setY(this.player.y);
        this.oven.setX(this.oven.x + this.oven.width);
        this.oven.setImmovable(true);


        //camera work
        this.QTECam = this.cameras.add(0, 0, game.config.width, game.config.height).setVisible(false);  //create a QTE camera
        this.UICam = this.cameras.add(0, 0, game.config.width, game.config.height);                     //create UI layer
        
        this.cameras.main.ignore([this.blackRectangle, this.tutorialMouse, this.tutorialWASD, this.bar1, this.bar1Fill, this.bar1Target]);           //ignore QTE filter at start
        this.QTECam.ignore([this.tutorialMouse, this.tutorialWASD, this.bar1, this.bar1Fill, this.bar1Target]);       //ignore QTE filter at start
        this.UICam.ignore([this.player, this.kitchen, this.blackRectangle, this.oven]);
        //this.QTECam.setBounds(0,0,game.config.height,game.config.height);
        //this.QTECam.startFollow(this.player, false, .2, .2, );

        //QTE Enter: Oven
        this.EnterOvenQTE();

        //QTE Exit: Oven
        this.ExitOvenQTE();
        

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

        //enter scene setup
        this.player.QTE();
        this.time.delayedCall(2500, () => {
            this.player.QTE();
            this.tutorialWASD.setVisible(true);
            this.tutorialWASD.anims.play("A-highlight");
        });

    }

    update(){
        this.player.update();
    }
    
    //Interact during the QTE
    enactQTE(){
        this.tutorialMouse.setVisible(false);
        this.bar1.setVisible(false);
        this.bar1Fill.setVisible(false);
        this.bar1Target.setVisible(false);
        this.QTECam.flash(1000);
        this.time.removeAllEvents();            //stop any delayedCalls in progress (bgm)
        this.oven.anims.play("oven-open");
        this.player.anims.play("pat-open");
        this.QTE = false;
    }

    //Check for Event Listener: Success or Failure
    QTEcheck(success){
        if (success){
            this.cameras.main.flash(250,100,255,100);
            this.gingerbread.setPosition(Phaser.Math.Between(this.gingerbread.width * 2, game.config.width - this.gingerbread.width * 2),
            Phaser.Math.Between(this.gingerbread.height * 2, game.config.height/2 - this.gingerbread.height));
            this.gingerbread.setVisible(true);
            this.pointsSFX.play();
            this.pointsSFX.on("complete", () => {
                //console.log("success"); //debug
                this.scene.stop("TutorialScene");
                this.scene.start("Transition01aScene");
            });
        } else {
            this.cameras.main.flash(250,255,100,100);
            this.scene.stop("TutorialScene");
            this.scene.start("FailScene");
            //console.log("failure"); //debug
        }
    }

    EnterOvenQTE(){
        this.physics.add.collider(this.player, this.oven, () => {
        this.QTEsuccess = false;
        this.tutorialMouse.setVisible(true);
        this.tutorialMouse.anims.play("leftClick-highlight");
        //console.log(this.QTEsuccess); //console.log debug

        this.bar1.setVisible(true);
        this.bar1Fill.setVisible(true);
        this.bar1Target.setVisible(true);

        this.tweens.add({                               //QTE bar tween
            targets: this.bar1Fill,
            width: this.bar1.width * 2 - 12,
            duration: 10000,
            ease: 'Linear',
            repeat: 0,
        });

        this.time.delayedCall(3000, () => {
            this.QTEsuccess = true;
            //console.log(this.QTEsuccess); //console.log debug
        });
        this.time.delayedCall(7500, () => {
            this.QTEsuccess = false;
            //console.log(this.QTEsuccess); console.log debug
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
        this.QTE = true;                                //QTE flag
        this.player.QTE();                              //player's QTE flag
        this.QTECam.setVisible(true);
        this.QTECam.zoomTo(2, 10000, "Circ");
        this.QTECam.pan(this.player.x - (this.player.x - this.oven.x)/2,this.player.y-this.player.y/8,10000,"Circ")
        });
    }
    
    ExitOvenQTE(){
        this.oven.on("animationcomplete", () => {
            this.time.delayedCall(250, () => {          //small delay
                this.QTECam.setVisible(false);          //go out of QTE cam
                this.cameras.main.setVisible(true);     //go back to regular cam
                this.ovenSFX.stop();                    //stop the QTE sfx
                this.bgm.setVolume(0.4);                //set bgm back to normal
                this.bgm.setRate(1);
                this.QTEcheck(this.QTEsuccess);
            })
        });
    }
}