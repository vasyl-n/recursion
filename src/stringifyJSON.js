// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	let array = [];
	let keyVals = [];
	if(typeof obj === 'number' || obj === null || typeof obj === 'boolean' ){
		return String(obj);
	}
	if(typeof(obj) === 'string'){
		return `"${obj}"`
		// return String(obj);
	}
	if(Array.isArray(obj)){
		if(obj[0] === undefined){
			return '[]';
		} else {
			// debugger
			_.each(obj, function(el){
				array.push(stringifyJSON(el));	
			})
			return '[' + array + ']'
		}
	}
	if(obj instanceof Object){
		if(Object.keys(obj).length === 0){
			return '{}'
		} else {
			for(let i in obj){
				if(typeof(obj[i]) === 'boolean' || obj[i] === null){
					keyVals.push('"' + i + '"' + ':' + obj[i]);
				} else if(obj[i] === undefined || i === 'functions') {
					keyVals.push()
				} else if(Object.keys(obj[i]).length === 0 || obj[i].length === 0){
					keyVals.push('"' + i + '"' + ':' + stringifyJSON(obj[i]))
				} else if(obj[i] instanceof Object){
						keyVals.push('"' + i + '"' + ':' + stringifyJSON(obj[i]))
				} else {
					keyVals.push('"' + i + '"' + ':' + '"' + obj[i] + '"');
				}
			}
		}
	}
	return "{" + keyVals + "}"
}