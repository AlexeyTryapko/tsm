import {nodes} from '../expand/config/nodes.js'

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
            form: true,
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
            form: true,
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
            form: true,
            signalType: 'manchesterСode',
            referenceSymbol: '1',
            amplitude: 1,
            frequency: 1,
            outOfSync: 0,
            samplesPerPeriod: 20,
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
            modal:true,
            chartData: [],
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
            form: true,
            compSum: 0,
            previousInput: 0,
            sequence: '',
        },
    },
    {
        type: 'SPECTRAL DENSITY',
        ports: {
            in: {
                id: 'in',
                type: 'left',
            },
        },
        properties: {
            modal:true,
            name: 'SPECTRAL DENSITY',
            chartData: [],
        },
    },
    ...nodes,
];