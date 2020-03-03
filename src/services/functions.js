const { PI, sin, floor, random } = Math;

export function signalSource(x, simulationParams, blockParams, step) {
    let A = blockParams['amplitude'];
    let f = blockParams['frequency'];
    let message = blockParams['sequence'];
    let T = simulationParams['periodOfSignalUnit'];
    let dt = simulationParams['quantizationPeriod'];
    let current = floor((step * dt) / T);

    if (current <= String(message).lenght - 1) {
        if (blockParams['signalType'] === 'manchesterСode') {
            if (message[current] === '1') {
                if ((step * dt) / T - current <= 0.5) {
                    return A;
                } else {
                    return -A;
                }
            } else {
                if ((step * dt) / T - current <= 0.5) {
                    return -A;
                } else {
                    return A;
                }
            }
        } else {
            if (message[current] === '1') {
                return A * sin(2 * PI * f * step * dt);
            } else {
                return A * sin(2 * PI * f * step * dt + PI);
            }
        }
    }
    return 0;
}

export function referenceSource(x, simulationParams, blockParams, step) {
    let A = blockParams['amplitude'];
    let f = blockParams['frequency'];
    let outofsync = blockParams['outofsync'];
    let T = simulationParams['periodOfSignalUnit'];
    let dt = simulationParams['quantizationPeriod'];
    let current = floor((step * dt) / T);

    if (blockParams['signalType'] === 'manchesterСode') {
        if ((step * dt) / T - current + outofsync / 100 <= 0.5) {
            return A;
        } else {
            return -A;
        }
    } else {
        return A * sin(2 * PI * f * (step * dt + (T * outofsync) / 100));
    }
}

export function noise(x, simulationParams, blockParams, step) {
    let noiseType = blockParams['noiseType'];
    let A = blockParams['amplitude'];
    let rand = 0;

    if (noiseType === 'whiteNoise') {
        rand = 2 * (random() - 0.5);
    }
    if (noiseType === 'pinkNoise') {
        rand = 2 * (random() - 0.5);
    }
    if (noiseType === 'blueNoise') {
        rand = 2 * (random() - 0.5);
    }
    if (noiseType === 'grayNoise') {
        rand = 2 * (random() - 0.5);
    }
    if (noiseType === 'pinkNoise') {
        rand = 2 * (random() - 0.5);
    }
    if (noiseType === 'impulseNoise') {
        rand = 2 * (random() - 0.5);
    }
    if (noiseType === 'randomNoise') {
        rand = 2 * (random() - 0.5);
    }

    return A * rand;
}

export function monitor(x, simulationParams, blockParams, step) {
    let dt = simulationParams['quantizationPeriod'];
    for (let input_x in x) {
        let found = false;
        for (let chart in blockParams['chartData']) {
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
    }
}
