import Phaser from "phaser";
import {normalize} from "../utils";


export enum FishState {
    Swim,
}

export class Fish {

    state: FishState;
    sprite?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    lastYDirectionChange: number;

    constructor(private readonly scene: Phaser.Scene, private readonly texture: string) {
        this.state = FishState.Swim
        this.lastYDirectionChange = 0;
    }

    create() {

        this.sprite = this.scene.physics.add.sprite(100, 100, this.texture)

        this.sprite.displayWidth = this.sprite.width * 0.8
        this.sprite.displayHeight = this.sprite.height * 0.8
        this.sprite.setCollideWorldBounds(true)
        this.sprite.setVelocityX(20)
        this.sprite.setMaxVelocity(100, 100)
        this.sprite.setDragX(50)
        this.sprite.setDragY(50)

        this.sprite.setInteractive();
        this.sprite.on('pointerdown', () => {
           this.scatter()
        });
    }


    update(time: number, delta: number) {
        if (this.state == FishState.Swim) {
            this.swim()
        }
    }

    scatter() {
        if (this.sprite) {
            const xVelocity = ((Math.random() - 0.5) * 1.5) * 800 ;
            const yVelocity = ((Math.random() - 0.5) * 1.5) * 800 ;

            this.sprite.body.setVelocityX(xVelocity)
            this.sprite.body.setVelocityY(yVelocity)
        }
    }

    swim() {
        if (this.sprite) {

            /** Update direction of fish based on velocity, eventually, these should be animations to turn. */
            if (this.sprite.body.velocity.x < 0 && !this.sprite.flipX) {
                this.sprite.setFlipX(true)
            }
            if (this.sprite.body.velocity.x > 0 && this.sprite.flipX) {
                this.sprite.setFlipX(false)
            }

            /** This should be an animation where the fish flaps it's tail */
            if (Math.abs(this.sprite.body.velocity.x) < 50) {
                this.sprite.setVelocityX(200 * Math.random() * normalize(this.sprite.body.velocity.x))

                if (this.sprite.body.velocity.x == 0) {
                    this.sprite.body.setVelocityX(200 * (Math.random() - 0.5))
                }
            }

            if (this.scene.time.now - this.lastYDirectionChange > 3000)
            {
                if (Math.random() > 0.33) {
                    this.sprite.body.setVelocityY( (Math.random() - 0.5) * 600  )
                    this.lastYDirectionChange = this.scene.time.now
                }
            }
        }
    }
}
