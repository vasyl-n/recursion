var parseJSON = function(json) {
	json = trimStr(json)
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
 		var j = sliceFirstAndLast(json)

		j = splitObj(j);
		var obj = j.reduce(function(a,b){
			// var c = b.split(":");
			var c = keyAndValue(b)
			var key = parseJSON(c[0])
			var value = parseJSON(c[1]);
			a[key] = value
			return a;
        }, {});
        return obj
    }
    return json;
};

function splitObj(str){
	arr = []
	while(str.indexOf('":') > 0){
	    var quoteColonIndex = str.indexOf('":');
	    var splitted = str.slice(quoteColonIndex + 2, str.length)
	    var key = str.slice(0, quoteColonIndex + 2)
	    var position = 1
	    var comaIndex = getPosition(splitted, ',', position)
	    if(splitted.indexOf('[') >= 0 && splitted.indexOf(']') > comaIndex){
	    	comaIndex = getPosition(splitted, ',', ++position)
	    }
	    if(comaIndex < 0){
	    	comaIndex = splitted.length;
	    }
	    var value = splitted.slice(0, comaIndex);
		var el = key + value
	    arr.push(el);
	    str = splitted.slice(comaIndex + 2, str.length)
	}
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

function newString(str){
var ns = str;
return ns;
}

