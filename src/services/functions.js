const { PI, sin, floor, random, sign, pow, evaluate } = Math;

export function signalSource(x, simulationParams, blockParams, step) {
    let A = blockParams['amplitude'];
    let f = blockParams['frequency'];
    let message = String(blockParams['sequence']);
    let T = simulationParams['periodOfSignalUnit'];
    let dt = simulationParams['quantizationPeriod'];
    let n = simulationParams['samplesPerUnit'];
    let period = simulationParams['samplesPerPeriod'];
    let current = floor((step * dt) / T);

    if(simulationParams['useSamples']){
        f = 1/(period*dt);
        current = floor(step/n);
    }
    if (current <= message.length - 1) {
        if (blockParams['signalType'] === 'manchesterСode') {
            if (message.charAt(current) === '1') {
                if (!simulationParams['useSamples'] && ((step * dt) / T - current <= 0.5)) {
                    return A;
                } else if(simulationParams['useSamples'] && ((step % n)/n <= 0.5)) {
                    return A;
                } else {
                    return -A;
                }
            } else {
                if (!simulationParams['useSamples'] && ((step * dt) / T - current <= 0.5)) {
                    return -A;
                } else if(simulationParams['useSamples'] && ((step % n)/n <= 0.5)) {
                    return -A;
                } else {
                    return A;
                }
            }
        } else {
            if (message.charAt(current) === '1') {
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
    let referenceSymbol = blockParams['referenceSymbol'];
    let n = simulationParams['samplesPerUnit'];
    let period = simulationParams['samplesPerPeriod'];

    if(simulationParams['useSamples']){
        f = 1/(period*dt);
        T = n*dt;
    }
    if (referenceSymbol === '1') {
        if (blockParams['signalType'] === 'manchesterСode') {
            return A * sign(sin((2 * PI * (step * dt)) / T / (1 + outofsync / 100)));
        } else {
            return A * sin((2 * PI * f * (step * dt)) / (1 + outofsync / 100));
        }
    } else {
        if (blockParams['signalType'] === 'manchesterСode') {
            return A * sign(sin((2 * PI * (step * dt)) / T / (1 + outofsync / 100) + PI));
        } else {
            return A * sin((2 * PI * f * (step * dt)) / (1 + outofsync / 100) + PI);
        }
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
    for (let [in_i, input_x] of x.entries()) {
        let found = false;
        for (let [ch_i, chart] of blockParams['chartData'].entries()) {
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

export function communicationLine(x, simulationParams, blockParams, step) {
    let inputSignal = 0;
    let inputNoise = 0;
    let kSignal = blockParams['coeffForIncomingSignal'];
    let kNoise = blockParams['coeffForTheNoise'];

    for (let [in_i, input_x] of x.entries()) {
        if (input_x.name.includes('SIGNAL SOURCE')) {
            inputSignal = input_x.data;
        }
        if (input_x.name.includes('NOISE')) {
            inputNoise = input_x.data;
        }
    }
    return inputSignal * kSignal + inputNoise * kNoise;
}

export function correlator(x, simulationParams, blockParams, step) {
    let inputSignal = 0;
    let referenceSignal = 0;
    let dt = simulationParams['quantizationPeriod'];
    let T = simulationParams['periodOfSignalUnit'];
    let sum = blockParams['integralSum'];
    let n = simulationParams['samplesPerUnit'];

    if(simulationParams['useSamples']){
        T = n*dt;
    }
    for (let [in_i, input_x] of x.entries()) {
        if (input_x.name.includes('COMMUNICATION LINE')) {
            inputSignal = input_x.data;
        }
        if (input_x.name.includes('REFERENCE SOURCE')) {
            referenceSignal = input_x.data;
        }
    }

    sum += inputSignal * referenceSignal * dt;

    if (blockParams['reset']) {
        sum = 0;
        blockParams['reset'] = false;
    }
    if (dt * step - floor((step * dt) / T) * T == 0) {
        blockParams['reset'] = true;
    }

    blockParams['integralSum'] = sum;
    return sum;
}

export function comparator(x, simulationParams, blockParams, step) {
    let h = blockParams['compSum'];
    let prevIn = blockParams['previousInput'];
    let lowLevel1 = blockParams['lowLevel1'];
    let highLevel0 = blockParams['highLevel0'];
    let dt = simulationParams['quantizationPeriod'];
    let T = simulationParams['periodOfSignalUnit'];
    let n = simulationParams['samplesPerUnit'];
    let inputSignal = 0;
    let output;

    if(simulationParams['useSamples']){
        T = n*dt;
    }
    for (let [in_i, input_x] of x.entries()) {
        if (input_x.name.includes('CORRELATOR')) {
            inputSignal = input_x.data;
        }
    }

    let current = floor((step * dt) / T);
    if (step !== 0) {
        if (inputSignal >= prevIn) {
            h += 1;
        } else {
            h -= 1;
        }
        blockParams['previousInput'] = inputSignal;
        blockParams['compSum'] = h;
        if ((step * dt) / T - current === 0) {
            if (h >= lowLevel1) {
                output = '1';
            } else if (h <= highLevel0) {
                output = '0';
            } else {
                output = '?';
            }
            blockParams['sequence'] += output;
            h = 0;
            blockParams['compSum'] = h;
            return output;
        }
    } else {
        blockParams['sequence'] = '';
        blockParams['previousInput'] = inputSignal;
    }
}


export function signalEnergy(x, simulationParams, blockParams, step){
    let dt = simulationParams['quantizationPeriod'];

    for (let [in_i, input_x] of x.entries()) {
        let found = false;
        for (let [ch_i, chart] of blockParams['chartData'].entries()) {
            if (input_x.name == chart.id) {
                if (!chart.data) {
                    chart.data = [];
                    chart.data.push({ x: dt * step, y: input_x.data*input_x.data*dt });
                } else {
                    chart.data.push({ x: dt * step, y: input_x.data*input_x.data*dt + chart.data.filter(obj => obj.x == dt*(step-1))[0].y});
                }
                found = true;
                break;
            }
        }
        if (!found) {
            blockParams['chartData'].push({
                id: input_x.name,
                data: [{ x: dt * step, y: input_x.data*input_x.data*dt }],
            });
        }
    }
}


export function powerSpectralDensity(x, simulationParams, blockParams, step){
    let scaleMin = blockParams['freqScaleMin'];
    let scaleMax = blockParams['freqScaleMax'];
    let dt = simulationParams['quantizationPeriod']
    let last = false;

    if (simulationParams['useSamples']) {
        last = simulationParams['numberOfSamples'] == step;
    } else {
        last = simulationParams['executionTime'] == dt*step;
    }

    for (let [in_i, input_x] of x.entries()) {
        let found = false;
        for (let [ch_i, chart] of blockParams['chartData'].entries()) {
            if (input_x.name == chart.id) {
                if (!chart.data) {
                    chart.signal = [];
                    chart.signal.push(input_x.data);
                } else {
                    chart.signal.push(input_x.data);
                }
                found = true;
                break;
            }
        }
        if (!found) {
            blockParams['chartData'].push({
                id: input_x.name,
                signal: [input_x.data],
            });
        }
    }

    if (last) {
        let freqScale = [];
        if (blockParams['logarithmicScale']) {
            freqScale = logarithmicScale(scaleMin, scaleMax);
        } else {
            df = (scaleMax - scaleMin) / 100;
            for (; scaleMin <= scaleMax; scaleMin += df) {
                freqScale.push(scaleMin);
            } 
        }

        for (let [in_i, input_x] of x.entries()) {
            let found = false;
            for (let [ch_i, chart] of blockParams['chartData'].entries()) {
                if (input_x.name == chart.id) {
                    chart.data = psd(chart.signal, freqScale);
                    found = true;
                    break;
                }
            }
        }
    }
}


function psd(signal, freqScale) {
    let result = [];
    for(let f of freqScale){
        let s = 0;
        for(let i = 0; i < signal.length; i++){
            let scope = {f: f, n: i, dt: dt, PI:PI};
            s += signal[i]*evaluate('e^(-i*2*PI*f*n*dt)', scope);
        }
        s = pow(s, 2);
        s = s/signal.length;
        result.push({x:f, y:s});
    }
    return result;
}


function logarithmicScale(min, max){
    let scale = [];
    let a = min;
    for (let na = 0; a <= 1; na++) { a /= 10; }
    if (na == 0) {
        min = 0;
    } else {
        min = 1*pow(10, na);
    }
    for (; min < max; min *= 10){
        for(let i = 1; i <= 9; i++){
            scale.push(min*i);
        }
    }
    return scale;
}