export const nodesConfig = [
    {
        type: 'top/bottom',
        ports: {
            port1: {
                id: 'port1',
                type: 'top',
                properties: {
                    custom: 'property',
                },
            },
            port2: {
                id: 'port1',
                type: 'bottom',
                properties: {
                    custom: 'property',
                },
            },
        },
        properties: {
            custom: 'property',
        },
    },
    {
        type: 'bottom-only',
        ports: {
            port1: {
                id: 'port1',
                type: 'bottom',
                properties: {
                    custom: 'property',
                },
            },
        },
    },
    {
        type: 'left-right',
        ports: {
            port1: {
                id: 'port1',
                type: 'left',
                properties: {
                    custom: 'property',
                },
            },
            port2: {
                id: 'port2',
                type: 'right',
                properties: {
                    custom: 'property',
                },
            },
        },
    },
    {
        type: 'all-sides',
        ports: {
            port1: {
                id: 'port1',
                type: 'left',
            },
            port2: {
                id: 'port2',
                type: 'right',
            },
            port3: {
                id: 'port3',
                type: 'top',
            },
            port4: {
                id: 'port4',
                type: 'bottom',
            },
        },
    },
];
