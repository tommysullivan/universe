function ApplicationController(universeController, toolbarController, importExportController) {
	return {
		activate: function() {
			importExportController.activate();
			universeController.activate();
			toolbarController.activate();
		}
	}
}