import SignalSourceForm from '../components/forms/SignalSource';
import NoiseForm from '../components/forms/Noise';
import ReferenceSourceForm from '../components/forms/ReferenceSource';
import ComparatorForm from '../components/forms/Comparator';
import SignalEnergy from '../components/modals/SignalEnergy';
import SpectralDensity from '../components/modals/SpectralDensity';
import {nodes} from '../expand/config/nodes.js'

export const nodesConfig = [
    {
        type: 'SIGNAL SOURCE',
        component:SignalSourceForm,
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
        component: NoiseForm,
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
        component: ReferenceSourceForm,
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
        component:SignalEnergy,
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
            form: true,
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
        component:ComparatorForm,
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
        component:SpectralDensity,
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