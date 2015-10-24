function UniverseController(universeView, universe, particleRenderer, configuration, massControl, $universeContainer) {
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
            universeView.onParticleAddRequested(function(startPosition, velocity) {
                _this.addParticle(startPosition, velocity, massControl.getMass());
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