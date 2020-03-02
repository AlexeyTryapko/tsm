export const nodesConfig = [
    {
        type: 'SIGNAL SOURCE',
        ports: {
            port1: {
                id: 'port1',
                type: 'right',
            },
        },
        properties: {},
    },
    {
        type: 'NOISE',
        ports: {
            port1: {
                id: 'port1',
                type: 'right',
            },
        },
        properties: {},
    },
    {
        type: 'REFENRENCE SOURCE',
        ports: {
            port1: {
                id: 'port1',
                type: 'right',
            },
        },
        properties: {},
    },
    {
        type: 'MONITOR',
        ports: {
            port1: {
                id: 'port1',
                type: 'left',
            },
        },
        properties: {},
    },
    {
        type: 'COMMUNICATION LINE',
        ports: {
            port1: {
                id: 'port1',
                type: 'left',
            },
            port2: {
                id: 'port2',
                type: 'right',
            },
        },
        properties: {},
    },
    {
        type: 'CORRELATOR',
        ports: {
            port1: {
                id: 'port1',
                type: 'left',
            },
            port2: {
                id: 'port2',
                type: 'right',
            },
        },
        properties: {},
    },
    {
        type: 'CLOCK GENERATOR',
        ports: {
            port1: {
                id: 'port1',
                type: 'right',
            },
        },
        properties: {},
    },
];
