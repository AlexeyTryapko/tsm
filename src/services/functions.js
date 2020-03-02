const {PI, sin, ceil} = Math

function signalSource(simulationParams, blockParams, t) {
    let A = blockParams[amplitude];
    let f = blockParams[frequency];
    let message = blockParams[sequence];
    let current = ceil(t/simulationParams[T]);

    if(current <= message.lenght-1) {
        if(message[current] == 
    }
    let output = A*sin(2*PI*f*t);
    return output;
}