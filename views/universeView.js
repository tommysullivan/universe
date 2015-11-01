function UniverseView(canvas, particleRenderer) {
	var zoomFactor = 1.1;
	var zoom, cameraPosition;
	function resetCamera() {
		zoom = 1;
		cameraPosition = Vector(0, 0);
	}
	resetCamera();
	return {
		render: function(universe) {
			canvas.clear();
			universe.particles().forEach(function(particle) {
				particleRenderer.render(particle, cameraPosition, zoom);
			});
		},
		background: canvas.background.bind(canvas),
		onParticleAddRequested: function(handler) {
			canvas.onMouseDrag(function(startPosition, endPosition) {
				var position = startPosition.plus(cameraPosition).divide(zoom).divide(configuration.modelToViewSpaceFactor());
				var velocity = endPosition.divide(zoom).minus(startPosition.divide(zoom)).times(configuration.velocitySettingStrength());
				handler(position, velocity);
			});
		},
		resetCamera: resetCamera,
		position: canvas.position.bind(canvas),
		width: function(val) {
			canvas.width(val);
		},
		height: function(val) {
			canvas.height(val);
		},
		moveCamera: function(diff) {
			cameraPosition = cameraPosition.plus(diff);
		},
		zoomOut: function() {
			zoom = zoom / zoomFactor;
		},
		zoomIn: function() {
			zoom = zoom * zoomFactor;
		}
	}
}