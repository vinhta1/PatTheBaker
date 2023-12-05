

class Pat extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, speed = 200, freeze = false) {
        super(scene, x, y, texture, frame);
        
        this.parentScene = scene; // maintain scene context
        
        this.parentScene.add.existing(this); //draw Pat
        this.parentScene.physics.add.existing(this); //add a physics body to Pat

        this.speed = speed;
        this.freeze = freeze;
        
    }

    update(){

        this.direction = new Phaser.Math.Vector2(0)
        if (!this.freeze){
            if(cursors.left.isDown) {
                this.direction.x = -1
                this.setFlipX(false);
                this.anims.play("move-left",true);
                //console.log("left");
            } else if(cursors.right.isDown) {
                this.direction.x = 1
                this.setFlipX(true);
                this.anims.play("move-left",true);
                //console.log("right");
            }

            if(!(cursors.left.isDown || cursors.right.isDown)){
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