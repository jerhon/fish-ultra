
export function normalize(value: number) {
    if (value < 0) {
        return -1
    } else if (value > 0) {
        return 1;
    } else {
        return 0
    }
}
