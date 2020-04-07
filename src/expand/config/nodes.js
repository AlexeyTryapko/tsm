export const nodes = [
    {
        "type": "ADDER",
        "ports": {
            "in": {
                "id": "in",
                "type": "left"
            },
            "out": {
                "id": "out",
                "type": "right"
            }
        },
        "properties": {
            "name": "ADDER"
        }
    },
    {
        "type": "MONITOR",
        "ports": {
            "in": {
                "id": "in",
                "type": "left"
            }
        },
        "properties": {
            "name": "MONITOR",
            "modal": true,
            "chartData": []
        }
    },
    {
        "type": "COMMUNICATION LINE",
        "ports": {
            "in": {
                "id": "in",
                "type": "left"
            },
            "out": {
                "id": "out",
                "type": "right"
            }
        },
        "properties": {
            "name": "COMMUNICATION LINE",
            "form": true,
            "coeffForIncomingSignal": 1,
            "coeffForTheNoise": 0.5
        }
    }
]