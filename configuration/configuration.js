Configuration = function(configurationJSON) {
	function jsonAccessorMethod(fieldName) {
		return function(value) {
			if(value == undefined) {
				if(configurationJSON[fieldName]==undefined) throw new Error("Missing configuration value for "+fieldName);
				return configurationJSON[fieldName];
			} else {
				configurationJSON[fieldName]=value;
			}
		}
	}
	return {
		backgroundURL: jsonAccessorMethod('backgroundURL'),
		universeContainerJQuerySelection: jsonAccessorMethod('universeContainerJQuerySelection'),
		velocitySettingStrength: jsonAccessorMethod('velocitySettingStrength'),
		renderIntervalInMilliseconds: jsonAccessorMethod('renderIntervalInMilliseconds'),
		gravitationalConstant: jsonAccessorMethod('gravitationalConstant'),
		massDensityFactor: jsonAccessorMethod('massDensityFactor'),
		modelToViewSpaceFactor: jsonAccessorMethod('modelToViewSpaceFactor'),
		smallChange: jsonAccessorMethod('smallChange'),
		bigChange: jsonAccessorMethod('bigChange'),
		particleColor: jsonAccessorMethod('particleColor'),
		tinyParticleColor: jsonAccessorMethod('tinyParticleColor'),
		massTextInputSelector: jsonAccessorMethod('massTextInputSelector'),
		resetButtonSelector: jsonAccessorMethod('resetButtonSelector'),
		startStopToggleSelector: jsonAccessorMethod('startStopToggleSelector'),
		universeCanvasSelector: jsonAccessorMethod('universeCanvasSelector'),
		keyboardShortcutSelector: jsonAccessorMethod('keyboardShortcutSelector'),
		timestepButtonSelector: jsonAccessorMethod('timestepButtonSelector'),
		logButtonSelector: jsonAccessorMethod('logButtonSelector'),
		exportButtonSelector: jsonAccessorMethod('exportButtonSelector'),
		importButtonSelector: jsonAccessorMethod('importButtonSelector'),
		autoStart: jsonAccessorMethod('autoStart'),
		initialParticles: jsonAccessorMethod('initialParticles')
	}
}