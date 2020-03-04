export const nodesConfig = [
    {
        type: 'SIGNAL SOURCE',
        ports: {
            out: {
                id: 'out',
                type: 'right',
            },
        },
        properties: {
            name: 'SIGNAL SOURCE',
            signalType: 'manchesterСode',
            amplitude: 1,
            frequency: 3,
            sequence: 11101,
        },
    },
    {
        type: 'NOISE',
        ports: {
            out: {
                id: 'out',
                type: 'right',
            },
        },
        properties: {
            name: 'NOISE',
            noiseType: 'whiteNoise',
            amplitude: 0.1,
        },
    },
    {
        type: 'REFERENCE SOURCE',
        ports: {
            out: {
                id: 'out',
                type: 'right',
            },
        },
        properties: {
            name: 'REFERENCE SOURCE',
        },
    },
    {
        type: 'MONITOR',
        ports: {
            in: {
                id: 'in',
                type: 'left',
            },
        },
        properties: {
            name: 'MONITOR',
            chartData: [],
        },
    },
    {
        type: 'COMMUNICATION LINE',
        ports: {
            in: {
                id: 'in',
                type: 'left',
            },
            out: {
                id: 'out',
                type: 'right',
            },
        },
        properties: {
            name: 'COMMUNICATION LINE',
        },
    },
    {
        type: 'CORRELATOR',
        ports: {
            in: {
                id: 'in',
                type: 'left',
            },
            out: {
                id: 'out',
                type: 'right',
            },
        },
        properties: {
            name: 'CORRELATOR',
            integralSum: 0,
            reset: false,
        },
    },
    {
        type: 'CLOCK GENERATOR',
        ports: {
            out: {
                id: 'out',
                type: 'right',
            },
        },
        properties: {
            name: 'CLOCK GENERATOR',
        },
    },
];
