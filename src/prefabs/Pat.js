

class Pat extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, speed = 200, freeze = false) {
        super(scene, x, y, texture, frame);
        
        this.parentScene = scene;                           // maintain scene context
        
        this.parentScene.add.existing(this);                //draw Pat
        this.parentScene.physics.add.existing(this);        //add a physics body to Pat

        this.speed = speed;
        this.freeze = freeze;

        //cursors = scene.input.keyboard.createCursorKeys(); 
        cursors = scene.input.keyboard.addKeys({           //populate cursors with arrows, space, shift, and wasd
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            upArrow: Phaser.Input.Keyboard.KeyCodes.UP,
            downArrow: Phaser.Input.Keyboard.KeyCodes.DOWN,
            leftArrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
            rightArrow: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
        });
        
    }

    update(){

        this.direction = new Phaser.Math.Vector2(0)
        if (!this.freeze){
            if(cursors.left.isDown || cursors.leftArrow.isDown) {
                this.direction.x = -1
                this.setFlipX(false);
                this.anims.play("move-left",true);
                //console.log("left");
            } else if(cursors.right.isDown || cursors.rightArrow.isDown) {
                this.direction.x = 1
                this.setFlipX(true);
                this.anims.play("move-left",true);
                //console.log("right");
            }

            if(!(cursors.left.isDown || cursors.leftArrow.isDown || cursors.right.isDown || cursors.rightArrow.isDown)){
                this.direction.x = 0
                this.anims.stop();
            }

            this.direction.normalize();
            this.body.setVelocity(this.speed * this.direction.x, this.speed * this.direction.y);
        }
    }

    QTE(){
        this.anims.stop();
        if (this.freeze){
            this.freeze = false;
        }
        else {
            this.freeze = true;
        }
    }
}