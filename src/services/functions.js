const {PI, sin, floor, random} = Math

function signalSource(simulationParams, blockParams, step) {
    let A = blockParams['amplitude'];
    let f = blockParams['frequency'];
    let message = blockParams['sequence'];
    let T = simulationParams['periodOfSignalUnit'];
    let dt = simulationParams['quantizationPeriod']
    let current = floor(step*dt/T);

    if(current <= message.lenght-1) {
        if(blockParams['signalType'] == 'manchesterСode'){
            if(message[current] == '1'){
                if((step*dt/T-current) <= 0.5) {
                    return A;
                } else {
                    return -A;
                }
            } else {
                if((step*dt/T-current) <= 0.5) {
                    return -A;
                } else {
                    return A;
                }
            }
        } else {
            if(message[current] == '1') {
                return A*sin(2*PI*f*step*dt);
            } else {
                return A*sin(2*PI*f*step*dt + PI);
            }
        }
    }
    return 0;
}


function referenceSource(simulationParams, blockParams, step) {
    let A = blockParams['amplitude'];
    let f = blockParams['frequency'];
    let outofsync = blockParams['outofsync'];
    let T = simulationParams['periodOfSignalUnit'];
    let dt = simulationParams['quantizationPeriod']
    let current = floor(step*dt/T);

    if(blockParams['signalType'] == 'manchesterСode'){
        if((step*dt/T-current+outofsync/100) <= 0.5) {
            return A;
        } else {
            return -A;
        }
    } else {
        return A*sin(2*PI*f*(step*dt+T*outofsync/100));
    }
}


function noise(simulationParams, blockParams, step){
    let noiseType = blockParams['noiseType'];
    let A = blockParams['amplitude'];
    let rand = 0;

    if(noiseType == 'whiteNoise'){
        rand = 2*(random()-0.5);
    }
    if(noiseType == 'pinkNoise'){
        rand = 2*(random()-0.5);
    }
    if(noiseType == 'blueNoise'){
        rand = 2*(random()-0.5);
    }
    if(noiseType == 'grayNoise'){
        rand = 2*(random()-0.5);
    }
    if(noiseType == 'pinkNoise'){
        rand = 2*(random()-0.5);
    }
    if(noiseType == 'impulseNoise'){
        rand = 2*(random()-0.5);
    }
    if(noiseType == 'randomNoise'){
        rand = 2*(random()-0.5);
    }

    return A*rand;
}