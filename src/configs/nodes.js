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
            samplesPerPeriod: 20,
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
            signalType: 'manchesterСode',
            referenceSymbol: '1',
            amplitude: 1,
            frequency: 1,
            outOfSync: 0,
            samplesPerPeriod: 20,
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
        type: 'SIGNAL ENREGY',
        ports: {
            in: {
                id: 'in',
                type: 'left',
            },
        },
        properties: {
            name: 'SIGNAL ENREGY',
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
            coeffForIncomingSignal: 1,
            coeffForTheNoise: 0.5,
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
        type: 'COMPARATOR',
        ports: {
            in: {
                id: 'in',
                type: 'left',
            },
        },
        properties: {
            name: 'COMPARATOR',
            compSum: 0,
            previousInput: 0,
            sequence: '',
        },
    },
    // {
    //     type: 'SPECTRE',
    //     ports: {
    //         in: {
    //             id: 'in',
    //             type: 'left',
    //         },
    //     },
    //     properties: {
    //         name: 'SPECTRE',
    //         chartData: [],
    //     },
    // },
];
