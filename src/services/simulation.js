import {
    signalSource,
    referenceSource,
    noise,
    correlator,
    comparator,
    signalEnergy,
    spectralDensity,
    
} from './functions';
import { cloneDeep } from 'lodash';
import { blockReferences } from '../expand/config/ref'

export const start = chart => {
    let step = chart.globalProperties['step'];
    /**
     ** Clear temporart properties
     **/
    if (step === 0) {
        let resetObj = { chartData: [] };
        const resetFields = (nodes, resetObj) => {
            const resetedNodes = { ...nodes };
            Object.keys(resetedNodes).forEach(nodeKey => {
                const currNode = resetedNodes[nodeKey];
                const res = {
                    ...currNode.properties,
                };
                Object.keys(resetObj).forEach(key => {
                    if (res[key] !== undefined) {
                        res[key] = cloneDeep(resetObj[key]);
                    }
                });
                resetedNodes[nodeKey].properties = res;
            });

            return resetedNodes;
        };
        chart.nodes = resetFields(chart.nodes, resetObj);
    }
    /**
     *
     *	Main logic
     *
     **/

    if(step===0){
        if(chart.globalProperties['useSamples']){
            chart.globalProperties['executionTime'] = 
            chart.globalProperties['numberOfSamples'] * chart.globalProperties['quantizationPeriod'];
            chart.globalProperties['periodOfSignalUnit'] = 
                chart.globalProperties['samplesPerUnit'] * chart.globalProperties['quantizationPeriod'];
        }
    }

    if (
        step <
        chart.globalProperties['executionTime'] /
            chart.globalProperties['quantizationPeriod']
    ) {
        let func_names = {
            'SIGNAL SOURCE': signalSource,
            'REFERENCE SOURCE': referenceSource,
            'NOISE': noise,
            'CORRELATOR': correlator,
            'COMPARATOR': comparator,
            'SIGNAL ENREGY': signalEnergy,
            'SPECTRAL DENSITY': spectralDensity,
            ...blockReferences,
        };

        let obj_idxs = {};
        let obj_id = 0;

        for (let node_id in chart['nodes']) {
            let node = chart['nodes'][node_id];
            if (!(node.id in obj_idxs)) {
                obj_idxs[node.id] = obj_id;
                obj_id = obj_id + 1;
            }
        }

        let matrix = new Array(obj_id);
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = new Array(obj_id).fill(0);
        }
        let inputs = new Array(obj_id).fill(0);
        let outputs = new Array(obj_id).fill(0);
        let Y = new Array(obj_id).fill(undefined);

        for (let link_id in chart['links']) {
            let link = chart['links'][link_id];
            let to_idx = obj_idxs[link.to.nodeId];
            let from_idx = obj_idxs[link.from.nodeId];
            inputs[to_idx] += 1;
            outputs[from_idx] += 1;
            matrix[from_idx][to_idx] += 1;
        }

        for (let [idx, value] of outputs.entries()) {
            if (value === 0) {
                Y[idx] = 'end-point';
            }
        }

        function get_node(idx) {
            let node_id = undefined;
            for (let [_node_id, node_idx] of Object.entries(obj_idxs)) {
                if (node_idx === idx) {
                    node_id = _node_id;
                    break;
                }
            }
            return chart['nodes'][node_id];
        }

        function calc(idx) {
            let x = [];
            for (let [row_idx, row] of matrix.entries()) {
                if (row[idx] !== 0) {
                    if (Y[row_idx] === undefined) {
                        Y[row_idx] = calc(row_idx);
                    }
                    x.push({
                        name: get_node(row_idx).properties.name,
                        data: Y[row_idx],
                    });
                }
            }

            let node = get_node(idx);

            return func_names[node.type](
                x,
                chart.globalProperties,
                node.properties,
                step
            ); //TODO use step
        }

        for (let [idx, value] of Y.entries()) {
            if (value === 'end-point') {
                Y[idx] = calc(idx);
            }
        }
        chart.globalProperties['step'] += 1;
        return Y;
    } else {
        chart.globalProperties['step'] = 0;
        return undefined;
    }
};
