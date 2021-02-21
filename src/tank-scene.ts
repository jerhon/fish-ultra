import * as Phaser from "phaser"
import fishUrl from "./assets/img/fish1.svg"
import foodUrl from "./assets/img/food.png"
import {Fish} from "./game-objects/fish";
import {GameScene} from "./game-objects/game-scene-manager";
import {Food} from "./game-objects/food";
import EventEmitter = Phaser.Events.EventEmitter;

export const FoodEaten = "FoodEaten";

export interface FoodEatenEvent {
    food: Food;
}

export class TankScene extends GameScene {

    private readonly _fish: Fish[];
    private _food: Food[];

    public readonly events : EventEmitter;

    constructor(config: ConstructorParameters<typeof GameScene>[0]) {
        super(config)

        this._food = []
        this._fish = []
        this.events = new EventEmitter();
        this.events.on(FoodEaten, (food: Food) => this._food = this._food.filter((f) => f !== food))
    }

    init(game: Phaser.Game) {

    }

    preload() {
        // Load the fish image
        this.load.image("fish", fishUrl);
        this.load.image( "food", foodUrl);
    }

    create() {
        super.create()

        const fish = new Fish(this, "fish")
        this.addObject(fish)
    }

    feed() {
        const food = new Food(this, "food")
        this._food.push(food)
        this.addObject(food)
    }

    getRandomFood(): Food | null {
        if (this._food.length > 0)
        {
            const idx = Math.round(Math.random() * this._food.length)
            return this._food[idx]
        }

        return null;
    }

}
