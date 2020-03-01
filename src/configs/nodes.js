export const nodesConfig = [
    {
        type: 'SIGNAL SOURCE',
        ports: {
            port1: {
                id: 'port1',
                type: 'right',
            },
        },
    },
    {
        type: 'NOISE',
        ports: {
            port1: {
                id: 'port1',
                type: 'right',
            },
        },
    },
    {
        type: 'REFENRENCE SOURCE',
        ports: {
            port1: {
                id: 'port1',
                type: 'right',
            },
        },
    },
    {
        type: 'MONITOR',
        ports: {
            port1: {
                id: 'port1',
                type: 'left',
            },
        },
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
    },
    {
        type: 'CLOCK GENERATOR',
        ports: {
            port1: {
                id: 'port1',
                type: 'right',
            },
        },
    },
];
