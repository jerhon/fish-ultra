import * as Phaser from "phaser"
import fishUrl from "./assets/img/fish1.svg"
import {Fish} from "./game-objects/fish";
import {GameScene} from "./game-objects/game-scene-manager";

export class TankScene extends GameScene
{

    init(game: Phaser.Game)
    {

    }
    preload()
    {
        // Load the fish image
        this.load.image("fish", fishUrl);
    }
    create()
    {
        super.create()

        const fish = new Fish(this, "fish")
        this.addObject(fish)

    }
}
