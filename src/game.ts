import * as Phaser  from "phaser"
import { TankScene } from "./tank-scene";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#0000FF',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 },
            debug: process.env.NODE_ENV === 'development'
        }
    },

} as Phaser.Types.Core.GameConfig


const game = new Phaser.Game(config)

game.scene.add("Tank", new TankScene({}), true)
