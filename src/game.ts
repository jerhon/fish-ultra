import * as Phaser from "phaser"
import {TankScene} from "./tank-scene";
import ScaleModes = Phaser.Scale.ScaleModes;
import Center = Phaser.Scale.Center;

const config = {
    type: Phaser.AUTO,
    width: "100%",
    height: "100%",
    backgroundColor: '#0000FF',
    scale: {
        mode: ScaleModes.FIT,
        autoCenter: Center.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 },
            debug: process.env.NODE_ENV === 'development'
        }
    },
    parent: 'game'
} as Phaser.Types.Core.GameConfig


const game = new Phaser.Game(config)

game.scene.add("Tank", new TankScene({}), true)
