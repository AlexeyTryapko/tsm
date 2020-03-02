const {PI, sin, ceil} = Math

function signalSource(simulationParams, blockParams, step) {
    let A = blockParams['amplitude'];
    let f = blockParams['frequency'];
    let message = blockParams['sequence'];
    let T = simulationParams['periodOfSignalUnit'];
    let dt = simulationParams['quantizationPeriod']
    let current = ceil(step*dt/T);

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