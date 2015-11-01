function ApplicationController(universeController, toolbarController, importExportController, configuration, keyboard) {
	return {
		activate: function() {
			keyboard.onKeyPress(this.processKeyPress.bind(this));
			keyboard.onArrowKey(universeController.processArrowKey.bind(universeController));
			importExportController.activate();
			universeController.activate();
			toolbarController.activate();
			importExportController.import(configuration.initialParticles());
			if(configuration.autoStart()) {
				toolbarController.toggleStartStopButton();
			}
		},
		processKeyPress: function(char) {
			switch(char) {
				case 's': toolbarController.toggleStartStopButton(); break;
				case '-': toolbarController.changeMass(-1 * configuration.smallChange()); break;
				case '=': toolbarController.changeMass(configuration.smallChange()); break;
				case '_': toolbarController.changeMass(-1 * configuration.bigChange()); break;
				case '+': toolbarController.changeMass(configuration.bigChange()); break;
				case 'r': universeController.reset(); break;
				case 't': universeController.updateAndRender(); break;
			}
		}
	}
}