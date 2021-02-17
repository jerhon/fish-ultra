import { GameObject } from "./game-object";


export class GameScene extends Phaser.Scene
{
    gameObjects: GameObject[];
    created: boolean;

    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config)

        this.gameObjects = []
        this.created = false
    }

    // Make it more efficient
    addObject(object: GameObject) {
        this.gameObjects.push(object)

        // If creation logic has already been done, call create.
        if (this.created) {
            object.create()
        }
    }

    removeObject(object: GameObject) {
        this.gameObjects = this.gameObjects.filter((go) => go !== object)
    }

    create() {
        this.created = true;
    }

    update(time: number, delta: number)
    {
        super.update(time, delta)

        this.gameObjects.forEach((go) => go.update(time, delta))
    }


}
