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
            type: 'NOISE',
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
