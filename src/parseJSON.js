var parseJSON = function(json) {
console.log(json)

	json = trimStr(json)
	console.log(json)

	if(isEmptyStr(json)){
		return ""
	}

	if(json === 'null'){
		return null;
    }
  	if(typeof Number(json) === 'number' && !isNaN(json)){
		return Number(json);
  	}
  	if(json === 'false'){
  		return false;
  	}
  	if(json === 'true'){
  		return true;
  	}
	if(json[0] === '"'){
		return json.slice(1, json.length - 1);
    }
	if(json[0] === '['){
		if(json[1] === ']'){
			return [];
        }
		var arr = [];
		var j = json.slice(1, json.length - 1);

		j = j.split(",");
		j.forEach(function(x){
			arr.push(parseJSON(x));
        });
		return arr;
    };
	if(json[0] === '{'){
		if(json[1] === '}'){
			return {};
        };
        // debugger
 		var j = sliceFirstAndLast(json)

		j = splitObj(j);
		var obj = j.reduce(function(a,b){
			// debugger
			// var c = b.split(":");
			var c = keyAndValue(b)
			console.log(c, "cccc")
			var key = parseJSON(c[0])
			var value = parseJSON(c[1]);
			a[key] = value
			return a;
        }, {});
        console.log(obj)
        return obj
    }
    return json;
};

function splitObj(str){
	arr = []
	while(str.indexOf('":') > 0){
	console.log(str)
	// debugger
	    var quoteColonIndex = str.indexOf('":');
	    var splitted = str.slice(quoteColonIndex + 2, str.length)
	    var key = str.slice(0, quoteColonIndex + 2)

	    var position = 1

	    var comaIndex = getPosition(splitted, ',', position)
	    if(splitted.indexOf('[') >= 0 && splitted.indexOf(']') > comaIndex){
	    	debugger
	    	comaIndex = getPosition(splitted, ',', ++position)
	    }

	    // var comaIndex = splitted.indexOf(',');
	    if(comaIndex < 0){
	    	comaIndex = splitted.length;
	    }
	    var value = splitted.slice(0, comaIndex);
		var el = key + value
	    arr.push(el);
	    str = splitted.slice(comaIndex + 2, str.length)
	}
	console.log(arr)
	return arr
}


function trimStr(json){
	while(json[0] === "'" || json[0] === '"' || json[0] === " "){
		json = json.slice(1, json.length)
	}
	while(json[json.length - 1] === "'" || json[json.length -1] === '"' || json[json.length -1] === ' '){
		json = json.slice(0, json.length - 1)
	}
	return json
}

function isEmptyStr(str){
	if(typeof str === 'string' && str.length === 0){
		return true;
	}
	return false
}

function sliceFirstAndLast(str){
	console.log(str, str.slice(1, str.length - 1))
	return str.slice(1, str.length - 1);
}

function keyAndValue(str){
	var arr = [];
	var colonInd = str.indexOf(":");
	arr.push(str.slice(0, colonInd));
	arr.push(str.slice(colonInd + 1, str.length))
	return arr;
}

function getPosition(string, subString, index) {
   return string.split(subString, index).join(subString).length;
}