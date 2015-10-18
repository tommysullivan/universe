function UniverseCanvas($, massControl) {
	var canvasOffset =  $('#universe').offset();
	var velocitySettingStrength = 0.01;
	var renderIntervalInMilliseconds = 20;	
	var drawingContext = document.getElementById("universe").getContext("2d");
	var universeCanvas = {
		renderUniverse: function() {
			drawingContext.clearRect(0, 0, 5000, 5000);
			universe.particles().forEach(function(particle) {
				universeCanvas.renderParticle(particle);
			});
		},
		renderParticle: function(particle) {
			var radius = particle.mass() / 2;
			var position = particle.position();
			drawingContext.fillStyle = '#FFFFFF';
			drawingContext.beginPath();
			drawingContext.arc(position.x(), position.y(), radius, 0, 2 * Math.PI);
			drawingContext.fill();
			drawingContext.stroke();
		},
		onMouseDown: function(mousePressEvent) {
			$('#universe').bind('mouseleave mouseup', function(mouseReleaseEvent) {	
				var canvasPosition = Vector(canvasOffset.left, canvasOffset.top);
				var mousePressPosition = Vector(mousePressEvent.pageX, mousePressEvent.pageY).minus(canvasPosition);
				var mouseReleasePosition = Vector(mouseReleaseEvent.pageX, mouseReleaseEvent.pageY).minus(canvasPosition);
				var velocity = mouseReleasePosition.minus(mousePressPosition).timesScalar(velocitySettingStrength);
				var particle = Particle(mousePressPosition, velocity, massControl.getMass());
				universe.particles().push(particle);
				universeCanvas.renderParticle(particle);
				$('#universe').unbind('mouseleave mouseup');
			});
		},
		updateAndRenderUniverse: function() {
			universeCanvas.renderUniverse();
			universe = universe.evolve();
		},
		startEvolution: function() {
			$('#startStopToggle').text('Stop');
			interval = setInterval(function() { universeCanvas.updateAndRenderUniverse(); }, renderIntervalInMilliseconds);
		},
		stopEvolution: function() {	
			$('#startStopToggle').text('Start');
			clearInterval(interval);
			interval = undefined;
		}
	}
	$('#universe').mousedown(universeCanvas.onMouseDown);
	return universeCanvas;
}