function UniverseController(universeView, universe, particleRenderer, configuration, massControl, $universeContainer) {
    var interval;
    return {
        reset: function() {
            universe.reset();
            universeView.resetCamera();
            universeView.render(universe);
        },
        isRunning: function() {
            return interval != undefined;
        },
        updateAndRender: function() {
            universeView.render(universe);
            universe.evolve();
        },
        startEvolution: function() {
            interval = setInterval(this.updateAndRender.bind(this), configuration.renderIntervalInMilliseconds());
        },
        stopEvolution: function() {
            clearInterval(interval);
            interval = undefined;
        },
        activate: function() {
            var _this = this;
            universeView.onParticleAddRequested(function(startPosition, velocity) {
                var charge = parseInt($(configuration.chargeTextInputSelector()).val());
                _this.addParticle(startPosition, velocity, massControl.getMass(), charge);
            });
            var background = new Image();
            background.src = configuration.backgroundURL();
            background.onload = function() {
                universeView.background(background);
            }
            _this.resizeCanvas();
            window.addEventListener("resize", this.resizeCanvas.bind(this));
        },
        resizeCanvas: function() {
            universeView.width($universeContainer.width());
        },
        addParticle: function(position, velocity, mass, charge) {
            var particle = Particle(
                position,
                velocity,
                mass,
                configuration,
                charge
            );
            universe.addParticle(particle);
            universeView.render(universe);
        },
        processArrowKey: function(event) {
            var d = event.shiftKey ? 10 : 1;
            var k = event.keyCode;
            var x = k == Keyboard.RIGHT ? d : k == Keyboard.LEFT ? (-1 * d) : 0;
            var y = k == Keyboard.DOWN ? d : k == Keyboard.UP ? (-1 * d) : 0;
            universeView.moveCamera(Vector(x, y));
        },
        zoomOut: universeView.zoomOut.bind(universeView),
        zoomIn: universeView.zoomIn.bind(universeView)
    }
}