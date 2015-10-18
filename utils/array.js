Array.prototype.fold = function(seed, operator) {
	var retVal = seed;
	this.forEach(function(item) {
		retVal = operator(seed, item);
	});
	return retVal;
}