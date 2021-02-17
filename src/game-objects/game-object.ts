

export interface GameObject {
    create(): void;
    update(time: number, delta: number): void;
}
