const {PI, sin, ceil} = Math

function signalSource(simulationParams, blockParams, t) {
    let A = blockParams[amplitude];
    let f = blockParams[frequency];
    let message = blockParams[sequence];
    let current = ceil(t/simulationParams[T]);

    if(current <= message.lenght-1) {
        if(blockParams[signalType] == 'manchesterСode'){
            if(message[current] == '1'){
                if((t/simulationParams[T]-current) <= 0.5) {
                    return A;
                } else {
                    return -A;
                }
            } else {
                if((t/simulationParams[T]-current) <= 0.5) {
                    return -A;
                } else {
                    return A;
                }
            }
        } else {
            if(message[current] == '1') {
                return A*sin(2*PI*f*t);
            } else {
                return A*sin(2*PI*f*t + PI);
            }
        }
    }
    return 0;
}