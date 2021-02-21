import {GameObject} from "./game-object";
import Phaser from "phaser";
import {FoodEaten, TankScene} from "../tank-scene";

export class Food implements GameObject {

    private readonly _sprite: Phaser.GameObjects.GameObject & Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private readonly _startTime: number;

    public Consumed: boolean;

    constructor(private readonly _scene: TankScene, private readonly _texture: string) {
        this.Consumed = false;

        const width = this._scene.game.canvas.width;

        const x = Math.random() * width;

        this._sprite = this._scene.physics.add.sprite(x, 0, this._texture);
        this._sprite.body.setCollideWorldBounds(true)
        this._sprite.body.setAllowRotation(true)
        this._startTime = this._scene.game.getTime()
    }

    create() { }


    update(time: number, delta: number): void {
        if (this._startTime && this._sprite && !this.Consumed ) {
            if (time - this._startTime < 3000) {
                this._sprite.body.velocity.y = Math.sin((time - this._startTime) / 200) * 5
                this._sprite.body.rotation = 1;
                this._sprite.body.angularAcceleration = 1.5
                this._sprite.body.maxAngular = (Math.random() * 30) + 10
            } else {
                if (this._sprite.body.y < (this._scene.game.canvas.height - (this._sprite.body.height *2))) {
                    this._sprite.body.acceleration.y = 10;
                    const rot = Math.sin((time - this._startTime) / 200) * ((this._startTime - time) / 500)
                    this._sprite.body.velocity.x = rot
                } else {
                    this._sprite.body.angularAcceleration = 0;
                    this._sprite.body.angularVelocity = 0;
                    this._sprite.body.velocity.x = 0
                }
            }
        }
    }

    eat() {
        if (this._sprite) {
            this.Consumed = true;
            this._sprite.destroy();
            this._scene.events.emit(FoodEaten, this);
        }
    }

    getPhysics() {
        return this._sprite;
    }

}
