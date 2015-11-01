function ToolbarController(massControl, toolbarView, universeController) {
    return {
        activate: function() {
            toolbarView.onResetClick(universeController.reset.bind(universeController));
            toolbarView.onStartStopToggleClick(this.toggleStartStopButton.bind(this));
            toolbarView.onTimestepButtonClick(universeController.updateAndRender.bind(universeController));
        },
        changeMass: function(n) {
            massControl.setMass(massControl.getMass() + n);
        },
        toggleStartStopButton: function() {
            if(universeController.isRunning()) {
                universeController.stopEvolution();
                toolbarView.isStarted(false);
            } else {
                universeController.startEvolution();
                toolbarView.isStarted(true);
            }
        }
    }
}