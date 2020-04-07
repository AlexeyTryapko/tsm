export function adder(x, simulationParams, blockParams, step) {
    let signal = 0;

    for (let [, input_x] of x.entries()) {
        signal += input_x.data
    }
    return signal;
}