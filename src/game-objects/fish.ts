import Phaser from "phaser";
import {normalize} from "../utils";
import {Food} from "./food";
import {TankScene} from "../tank-scene";


export enum FishState {
    Swim,
    GrabTheFood
}

export class Fish {

    _state: FishState;
    _sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    _lastYDirectionChange: number;
    _food?: Food;

    constructor(private readonly _scene: TankScene, private readonly texture: string) {
        this._state = FishState.Swim
        this._lastYDirectionChange = 0

        this._sprite = this._scene.physics.add.sprite(100, 100, this.texture)

        this._sprite.displayWidth = this._sprite.width * 0.8
        this._sprite.displayHeight = this._sprite.height * 0.8
        this._sprite.setCollideWorldBounds(true)
        this._sprite.setVelocityX(20)
        this._sprite.setMaxVelocity(100, 100)
        this._sprite.setDragX(50)
        this._sprite.setDragY(50)

        this._sprite.setInteractive();
        this._sprite.on('pointerdown', () => {
            this.scatter()
        });
    }


    create() {}

    update(time: number, delta: number) {


        /** Update direction of fish based on velocity, eventually, these should be animations to turn. */
        if (this._sprite.body.velocity.x < 0 && !this._sprite.flipX) {
            this._sprite.setFlipX(true)
        }
        if (this._sprite.body.velocity.x > 0 && this._sprite.flipX) {
            this._sprite.setFlipX(false)
        }

        if (this._state == FishState.Swim) {
            this.swim()

            const food = this._scene.getRandomFood();
            if (food) {
                this._state = FishState.GrabTheFood
                this._food = food
                this._scene.physics.add.collider(this._sprite, food.getPhysics(), () => this.eat())
            }
        } else if (this._state == FishState.GrabTheFood) {
            // Try to move to the food

            if (this._food && !this._food.Consumed) {
                this._scene.physics.moveToObject(this._sprite, this._food?.getPhysics(), 200)
            } else {
                this._state = FishState.Swim
            }
        }
    }

    /*
    swimToward(x: number, y: number) {

    }
    */

    eat() {
        this._food?.eat();
    }

    scatter() {
        if (this._sprite) {
            const xVelocity = ((Math.random() - 0.5) * 1.5) * 800 ;
            const yVelocity = ((Math.random() - 0.5) * 1.5) * 800 ;

            this._sprite.body.setVelocityX(xVelocity)
            this._sprite.body.setVelocityY(yVelocity)
        }
    }

    swim() {
        if (this._sprite) {



            /** This should be an animation where the fish flaps it's tail */
            if (Math.abs(this._sprite.body.velocity.x) < 50) {
                this._sprite.setVelocityX(200 * Math.random() * normalize(this._sprite.body.velocity.x))

                if (this._sprite.body.velocity.x == 0) {
                    this._sprite.body.setVelocityX(200 * (Math.random() - 0.5))
                }
            }

            if (this._scene.time.now - this._lastYDirectionChange > 3000)
            {
                if (Math.random() > 0.33) {
                    this._sprite.body.setVelocityY( (Math.random() - 0.5) * 600  )
                    this._lastYDirectionChange = this._scene.time.now
                }
            }
        }
    }
}
