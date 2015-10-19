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
		export: function() {
			var exportJSONString = JSON.stringify(this.getExportJSON());
			window.prompt("Copy to clipboard: Ctrl+C, Enter", exportJSONString);
		},
		import: function() {
			var importJSONString = window.prompt("Import: Ctrl+V, Enter", '[paste your configuration here]');
			try {
				var importJSON = JSON.parse(importJSONString);
				var particleJSONs = importJSON.particles;
				var particles = particleJSONs.map(function(particleJSON) {
					var position = Vector(particleJSON.position.x, particleJSON.position.y);
					var velocity = Vector(particleJSON.velocity.x, particleJSON.velocity.y);
					return Particle(position, velocity, particleJSON.mass, configuration);
				});
				universe = Universe(particles);
				this.updateAndRenderUniverse();
			}
			catch(e) {
				alert('There was a problem importing the configuration you specified: '+e.toString());
			}
		},
		getExportJSON: function() {
			return {
				version: '0.0.1-SNAPSHOT',
				configuration: {
					smallChange: configuration.smallChange(),
					bigChange: configuration.bigChange(),
					velocitySettingStrength: configuration.velocitySettingStrength(),
					renderIntervalInMilliseconds: configuration.renderIntervalInMilliseconds(),
					gravitationalConstant: configuration.gravitationalConstant()
				},
				particles: universe.particles().map(function(p) {
					return {
						position: {
							x: p.position().x(),
							y: p.position().y()
						},
						velocity: {
							x: p.velocity().x(),
							y: p.velocity().y()
						},
						mass: p.mass()
					}
				})
			};
		},
		createParticleWithVelocityBasedOnMouseDistance: function(mousePressEvent, mouseReleaseEvent) {	
			//TODO: Move this coordinate transformation stuff into the view.
			var canvasPosition = universeCanvas.position();
			var mousePressPosition = Vector(mousePressEvent.pageX, mousePressEvent.pageY).minus(canvasPosition);
			var mouseReleasePosition = Vector(mouseReleaseEvent.pageX, mouseReleaseEvent.pageY).minus(canvasPosition);
			var velocity = mouseReleasePosition.minus(mousePressPosition).timesScalar(configuration.velocitySettingStrength());
			var particle = Particle(mousePressPosition, velocity, massControl.getMass(), configuration);
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
				case 'l': 
					var exportJSON = this.getExportJSON();
					console.log(JSON.stringify(exportJSON)); 
					console.log(exportJSON);
					break;
				case 'x': this.export(); break;
				case 'i': this.import(); break;
			}
		}
	}
}