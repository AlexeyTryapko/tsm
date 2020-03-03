

export const start = chart => {
    console.log('Start');
    let func_names = {					
    	'SIGNAL SOURCE':'signalSource', //TODO use func instead of strings
    }

    let obj_idxs = {}
    let obj_id = 0

    for(let node_id in chart["nodes"]){
    	let node = chart["nodes"][node_id]
    	if(!(node.id in obj_idxs)){
    		obj_idxs[node.id]=obj_id
    		obj_id=obj_id+1
    	}
	}

	let matrix = new Array(obj_id).fill(new Array(obj_id).fill(0))
    let inputs = new Array(obj_id).fill(0)
    let outputs = new Array(obj_id).fill(0)
    let Y = new Array(obj_id).fill(undefined)

	for(let link_id in chart["links"]){
		let link = chart["links"][link_id]
		let to_idx = obj_idxs[link.to.nodeId]
		let from_idx = obj_idxs[link.from.nodeId]
		inputs[to_idx]+=1
		outputs[from_idx]+=1
		matrix[from_idx][to_idx]+=1
	}

	for(let [idx, value] of outputs.entries()){
		if(value == 0){
			Y[idx] = 'end-point'
		}
	}

	function calc(idx){
		let x = []
		for(let [row_idx, row] of matrix.entries()){
			if(row[idx]!==0){
				if(Y[row_idx]===undefined){
					Y[row_idx]=calc(row_idx)
				}
				x.push(Y[row_idx])
			}
		}
		let node_id = undefined
		for(let [_node_id,node_idx] of obj_idxs.entries()){
			if(node_idx===idx){
				node_id = _node_id
			}
		}
		return func_names[chart["nodes"][node_id]](x,params)//TODO Correct call
	}

	for(let [idx, value] of Y.entries()){
		if(value==='end-point'){
			
			Y[idx]=calc(idx)
		}

};
