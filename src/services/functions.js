import { fft, ComplexNumber} from './math/math';
import { rand_gauss} from './math/distributions'
const { PI, sin, floor, random, sign, log2, sqrt } = Math;

export function signalSource(x, simulationParams, blockParams, step) {
    let A = blockParams['amplitude'];
    let f = blockParams['frequency'];
    let message = String(blockParams['sequence']);
    let T = simulationParams['periodOfSignalUnit'];
    let dt = simulationParams['quantizationPeriod'];
    let n = simulationParams['samplesPerUnit'];
    let period = blockParams['samplesPerPeriod'];
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
    let period = blockParams['samplesPerPeriod'];

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
    let dt = simulationParams['quantizationPeriod']
    let max_f = 0.5/dt;

    let rand = 0;

    if(step===0){
        blockParams.rand_func = undefined;
        blockParams.f = new Array(floor(2*log2(max_f-1.0))).fill(0);
    }

    if(!blockParams.rand_func){
        if (noiseType === 'whiteNoise') {
            blockParams.rand_func = () =>  (max_f-1.0)*random();
        }
        else if (noiseType === 'pinkNoise') {
            blockParams.rand_func = () => 2 * (random() - 0.5);
        }
        else if (noiseType === 'blueNoise') {
            blockParams.rand_func = () => 2 * (random() - 0.5);
        }
        else if (noiseType === 'grayNoise') {
            blockParams.rand_func = () => 2 * (random() - 0.5);
        }
        else if (noiseType === 'pinkNoise') {
            blockParams.rand_func = () => 2 * (random() - 0.5);
        }
        else if (noiseType === 'impulseNoise') {
            blockParams.rand_func = () => 2 * (random() - 0.5);
        }
        else if (noiseType === 'randomNoise') {
            blockParams.rand_func = () => rand_gauss({mu:(max_f-1.0)/2, std:sqrt(max_f)});
        }

        blockParams.f = blockParams.f.map((v)=> blockParams.rand_func())
    }

    blockParams.f.forEach((f)=>rand+=A*sin(2*PI*f*dt*step))

    return rand;
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
    for (let [, input_x] of x.entries()) {
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
    if (dt * step - floor((step * dt) / T) * T === 0) {
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
    for (let [, input_x] of x.entries()) {
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

    for (let [, input_x] of x.entries()) {
        let found = false;
        for (let [, chart] of blockParams['chartData'].entries()) {
            if (input_x.name === chart.id) {
                if (!chart.data) {
                    chart.data = [];
                    chart.data.push({ x: dt * step, y: input_x.data*input_x.data*dt });
                } else {
                    chart.data.push({ x: dt * step, y: input_x.data*input_x.data*dt + chart.data.filter(obj => obj.x === dt*(step-1))[0].y});
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

export function spectralDensity(x, simulationParams, blockParams, step){
    let time = simulationParams['executionTime'];
    let dt = simulationParams['quantizationPeriod'];

    let N = floor(time/dt);
    if(step===0){
        blockParams.signal = new Array(N);
    }


    if(blockParams.signal)
        blockParams.signal[step] = ComplexNumber.toComplex(x[0].data);
    

    if(step===N-1){
        blockParams['chartData'].push({
                id: x[0].name,
                data: [],
            });
        let chart = blockParams['chartData'][0];

        let output = fft(blockParams.signal);

        for(let [i, f] of output.entries()){
            if(i>N/2)
                break;
            else if(i%Math.round(time)===0)
                chart.data.push({ x: i/Math.round(time), y: f.getRadius() });
        }
    }
}

