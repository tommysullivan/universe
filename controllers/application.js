function Application(jquerySelectionForKeyboard, universeCanvas, controlPanel, universe, massControl, configuration) {
	var interval;
	return {
		reset: function() {
			universe.reset();
			universeCanvas.renderUniverse(universe);
		},
		startStopToggle: function() {
			interval ? this.stopEvolution() : this.startEvolution();
		},
		updateAndRenderUniverse: function() {
			universeCanvas.renderUniverse(universe);
			universe = universe.evolve();
		},
		startEvolution: function() {
			controlPanel.isStarted(true);
			interval = setInterval(this.updateAndRenderUniverse.bind(this), configuration.renderIntervalInMilliseconds());
		},
		stopEvolution: function() {	
			controlPanel.isStarted(false);
			clearInterval(interval);
			interval = undefined;
		},
		activate: function() {
			controlPanel.onResetClick(this.reset.bind(this));
			controlPanel.onStartStopToggleClick(this.startStopToggle.bind(this));
			universeCanvas.onMouseDown(this.beginTrackingMouseForParticleVelocityCreation.bind(this));
			jquerySelectionForKeyboard.keypress(this.processKeyPress.bind(this));
		},
		beginTrackingMouseForParticleVelocityCreation: function(mousePressEvent) {
			var _this = this;
			universeCanvas.onMouseUp(function(mouseReleaseEvent) {
				_this.createParticleWithVelocityBasedOnMouseDistance(mousePressEvent, mouseReleaseEvent);
			});
		},
		createParticleWithVelocityBasedOnMouseDistance: function(mousePressEvent, mouseReleaseEvent) {	
			var canvasPosition = universeCanvas.position();
			var mousePressPosition = Vector(mousePressEvent.pageX, mousePressEvent.pageY).minus(canvasPosition);
			var mouseReleasePosition = Vector(mouseReleaseEvent.pageX, mouseReleaseEvent.pageY).minus(canvasPosition);
			var velocity = mouseReleasePosition.minus(mousePressPosition).timesScalar(configuration.velocitySettingStrength());
			var particle = Particle(mousePressPosition, velocity, massControl.getMass(), configuration.gravitationalConstant());
			universe.particles().push(particle);
			universeCanvas.renderParticle(particle);
			universeCanvas.removeMouseUpHandlers();
		},
		changeMass: function(n) {
			massControl.setMass(massControl.getMass() + n);
		},
		processKeyPress: function(event) {
			switch(String.fromCharCode(event.which)) {
				case 's': this.startStopToggle(); break;
				case '-': this.changeMass(-1 * configuration.smallChange()); break;
				case '=': this.changeMass(configuration.smallChange()); break;
				case '_': this.changeMass(-1 * configuration.bigChange()); break;
				case '+': this.changeMass(configuration.bigChange()); break;
				case 'r': this.reset(); break;
				case 't': this.updateAndRenderUniverse(); break;
				case 'l': console.log(universe.toString()); break;
			}
		}
	}
}