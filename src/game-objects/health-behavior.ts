import * as Phaser from "phaser"


export interface FishProps {
    initialHealth?: number;
    maxHealth?: number;
}

export enum HealthEvents {
    HealthChanged= "health_changed",
}


export class HealthBehavior {

    health: number;
    maxHealth: number;

    constructor(eventEmitter: Phaser.Events.EventEmitter, { initialHealth=100, maxHealth }: FishProps ) {
        this.health = initialHealth ?? 100;
        this.maxHealth = maxHealth ?? initialHealth ?? 100;
    }

    feed(health: number) {
        this.health += health;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }

    attack(health: number) {
        this.health -= health;
        if (this.health <= 0) {

        }
    }

}
