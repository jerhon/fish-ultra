import {GameObject} from "./game-object";
import Phaser from "phaser";

export class Food implements GameObject {

    private body?: Phaser.Physics.Arcade.Body
    private startTime?: number;

    constructor(private readonly scene: Phaser.Scene) {
    }

    create(): void {
        const width = this.scene.game.canvas.width;

        const x = Math.random() * width;

        const sprite = this.scene.add.rectangle(x, 0, 20, 20, 0x664f3C);
        const foodBody = this.scene.physics.add.existing(sprite, false);

        this.body = foodBody.body as Phaser.Physics.Arcade.Body;
        this.body.collideWorldBounds = true;
        this.body.allowRotation = true;
        this.startTime = this.scene.game.getTime()
    }

    update(time: number, delta: number): void {
        if (this.startTime && this.body) {
            if (time - this.startTime < 5000) {
                const rot = Math.sin((time - this.startTime) / 200) * 20
                this.body.velocity.y = Math.sin((time - this.startTime) / 200) * 5
                this.body.rotation = 1;
                this.body.angularAcceleration = 1
                this.body.maxAngular = (Math.random() * 30) + 10
            } else {
                if (this.body.y < (this.scene.game.canvas.height - (this.body.height *2))) {
                    this.body.acceleration.y = 10;
                    const rot = Math.sin((time - this.startTime) / 200) * ((this.startTime - time) / 500)
                    this.body.velocity.x = rot
                } else {
                    this.body.angularAcceleration = 0;
                    this.body.angularVelocity = 0;
                    this.body.velocity.x = 0
                }
            }
        }
    }

}
