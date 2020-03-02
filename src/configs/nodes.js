export const nodesConfig = [
    {
        type: 'SIGNAL SOURCE',
        ports: {
            out: {
                id: 'out',
                type: 'right',
            },
        },
        properties: {},
    },
    {
        type: 'NOISE',
        ports: {
            out: {
                id: 'out',
                type: 'right',
            },
        },
        properties: {},
    },
    {
        type: 'REFERENCE SOURCE',
        ports: {
            out: {
                id: 'out',
                type: 'right',
            },
        },
        properties: {},
    },
    {
        type: 'MONITOR',
        ports: {
            in: {
                id: 'in',
                type: 'left',
            },
        },
        properties: {},
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
        properties: {},
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
        properties: {},
    },
    {
        type: 'CLOCK GENERATOR',
        ports: {
            out: {
                id: 'out',
                type: 'right',
            },
        },
        properties: {},
    },
];
