function UniverseController(universeView, universe, particleRenderer, configuration, massControl) {
    var interval;
    return {
        reset: function() {
            universe.reset();
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
            universeView.onMouseDrag(function(startPosition, endPosition) {
                var position = startPosition.divide(configuration.modelToViewSpaceFactor());
                var velocity = endPosition.minus(startPosition).times(configuration.velocitySettingStrength());
                _this.addParticle(startPosition, velocity, massControl.getMass());
            });
            window.addEventListener("resize", function() {
                universeView.render(universe);
            });
        },
        addParticle: function(position, velocity, mass) {
            var particle = Particle(
                position,
                velocity,
                mass,
                configuration
            );
            universe.addParticle(particle);
            particleRenderer.render(particle);
        }
    }
}