function ToolbarController(keyboard, massControl, toolbarView, universeController) {
    return {
        activate: function() {
            keyboard.onKeyPress(this.processKeyPress.bind(this));
            toolbarView.onResetClick(universeController.reset.bind(universeController));
            toolbarView.onStartStopToggleClick(this.toggleStartStopButton.bind(this));
            toolbarView.onTimestepButtonClick(universeController.updateAndRender.bind(universeController));
        },
        changeMass: function(n) {
            massControl.setMass(massControl.getMass() + n);
        },
        processKeyPress: function(char) {
            switch(char) {
                case 's': this.toggleStartStopButton(); break;
                case '-': this.changeMass(-1 * configuration.smallChange()); break;
                case '=': this.changeMass(configuration.smallChange()); break;
                case '_': this.changeMass(-1 * configuration.bigChange()); break;
                case '+': this.changeMass(configuration.bigChange()); break;
                case 'r': universeController.reset(); break;
                case 't': universeController.updateAndRender(); break;
            }
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