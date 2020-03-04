const { PI, sin, floor, random, sign } = Math;

export function signalSource(x, simulationParams, blockParams, step) {
    let A = blockParams['amplitude'];
    let f = blockParams['frequency'];
    let message = String(blockParams['sequence']);
    let T = simulationParams['periodOfSignalUnit'];
    let dt = simulationParams['quantizationPeriod'];
    let current = floor((step * dt) / T);

    if (current <= message.length - 1) {
        if (blockParams['signalType'] === 'manchesterСode') {
            if (message.charAt(current) === '1') {
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
            if (message.charAt(current)=== '1') {
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
    let outofsync = blockParams['outOfSync'];
    let T = simulationParams['periodOfSignalUnit'];
    let dt = simulationParams['quantizationPeriod'];
    let current = floor((step * dt) / T);

    if (blockParams['signalType'] === 'manchesterСode') {
       return A*sign( sin(2 * PI  * (step * dt )/T/(1 + outofsync / 100)));
    } else {
        return A * sin(2 * PI * f * (step * dt )/(1 + outofsync / 100));
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
    for (let [in_i,input_x] of x.entries()) {
        let found = false;
        for (let [ch_i,chart] of blockParams['chartData'].entries()) {
            if (input_x.name == chart.id) {
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


export function communicationLine(x, simulationParams, blockParams, step){
    let inputSignal = 0;
    let inputNoise = 0;
    let kSignal = blockParams['coeffForIncomingSignal'];
    let kNoise = blockParams['coeffForTheNoise'];

    for(let [in_i,input_x] of x.entries()){
        if(input_x.name.includes("SIGNAL SOURCE")){
            inputSignal = input_x.data;
        }
        if(input_x.name.includes("NOISE")){
            inputNoise = input_x.data;
        }
    }
    return inputSignal*kSignal + inputNoise*kNoise;
}


export function correlator(x, simulationParams, blockParams, step){
    let inputSignal = 0;
    let referenceSignal = 0;
    let dt = simulationParams['quantizationPeriod'];
    let T = simulationParams['periodOfSignalUnit'];
    let sum = blockParams['integralSum'];

    for(let [in_i,input_x] of x.entries()){
        if(input_x.name.includes("COMMUNICATION LINE")){
            inputSignal = input_x.data;
        }
        if(input_x.name.includes("REFERENCE SOURCE")){
            referenceSignal = input_x.data;
        }
    }

    sum += inputSignal*referenceSignal*dt;

    if(blockParams['reset']){
        sum = 0;
        blockParams['reset'] = false;
    }
    if(dt*step - floor(step*dt/T)*T == 0){ 
        blockParams['reset'] = true;
    }

    blockParams['integralSum'] = sum;
    return sum;
}
