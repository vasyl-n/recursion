// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
const getElementsByClassName = className => {
  const elements = [];
  const recurse = el => {
  	 for(c in el.classList){
	  	if(el.classList[c] === className){
	  		if(elements[elements.length - 1] !== el){
	  		elements.push(el);	  		
	  		}
	  	}
	  }
  	_.each(el.children, function(child){
  		recurse(child);
  	})
  }
  recurse(document)
  return elements;
};
