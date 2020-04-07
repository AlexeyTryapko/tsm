export function adder(x, simulationParams, blockParams, step) {
    let signal = 0;

    for (let [, input_x] of x.entries()) {
        signal += input_x.data
    }
    return signal;
}

export function monitor(x, simulationParams, blockParams, step) {
    let dt = simulationParams['quantizationPeriod'];
    x.forEach((input_x)=>{
        let found = false;
        for (let [, chart] of blockParams['chartData'].entries()) {
            if (input_x.name === chart.id) {
                if (!chart.data) {
                    chart.data = [];
                }
                chart.data.push({ x: dt * step, y: input_x.data });
                found = true;
                break;
            }
        }
        if (!found) {
            blockParams['chartData'].push({
                id: input_x.name,
                data: [{ x: dt * step, y: input_x.data }],
            });
        }
    })
}

export function communicationLine(x, simulationParams, blockParams, step) {
    let inputSignal = 0;
    let inputNoise = 0;
    let kSignal = blockParams['coeffForIncomingSignal'];
    let kNoise = blockParams['coeffForTheNoise'];

    for (let [, input_x] of x.entries()) {
        if (input_x.name.includes('SIGNAL SOURCE')) {
            inputSignal = input_x.data;
        }
        if (input_x.name.includes('NOISE')) {
            inputNoise = input_x.data;
        }
    }
    return inputSignal * kSignal + inputNoise * kNoise;
}