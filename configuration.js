Configuration = function(smallChange, bigChange, velocitySettingStrength, renderIntervalInMilliseconds, gravitationalConstant) {
	return {
		smallChange: function() { return smallChange; },
		bigChange: function() { return bigChange; },
		velocitySettingStrength: function() { return velocitySettingStrength; },
		renderIntervalInMilliseconds: function() { return renderIntervalInMilliseconds; },
		gravitationalConstant: function() { return gravitationalConstant; }
	}
}