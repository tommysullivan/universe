function Physics($, configuration) {
    return {
        startApplication: function() {
            var $canvas = $(configuration.universeCanvasSelector());
            var canvas = Canvas($canvas);
            var particleRenderer = ParticleRenderer(configuration, canvas);
            var keyboard = Keyboard($(configuration.keyboardShortcutSelector()));
            var massControl = MassControl($(configuration.massTextInputSelector()));
            var initialParticles = [];
            var universe = Universe(initialParticles);
            var universeView = UniverseView(
                canvas,
                particleRenderer
            );
            var universeController = UniverseController(
                universeView,
                universe,
                particleRenderer,
                configuration,
                massControl,
                $(configuration.universeContainerSelector())
            );
            var toolbarView = ToolbarView(
                $(configuration.resetButtonSelector()),
                $(configuration.startStopToggleSelector()),
                $(configuration.timestepButtonSelector()),
                $(configuration.logButtonSelector()),
                $(configuration.exportButtonSelector()),
                $(configuration.importButtonSelector())
            );
            var applicationController = ApplicationController(
                universeController,
                ToolbarController(
                    massControl,
                    toolbarView,
                    universeController
                ),
                ImportExportController(
                    keyboard,
                    Logger(),
                    universe,
                    universeController,
                    toolbarView
                ),
                configuration,
                keyboard
            );
            applicationController.activate();
        }
    }
}