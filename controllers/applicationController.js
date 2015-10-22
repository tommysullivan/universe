function ApplicationController(universeController, toolbarController, importExportController, configuration) {
	return {
		activate: function() {
			importExportController.activate();
			universeController.activate();
			toolbarController.activate();
			importExportController.import(configuration.initialParticles());
			if(configuration.autoStart()) {
				toolbarController.toggleStartStopButton();
			}
		}
	}
}