function UniverseView(canvas, particleRenderer) {
	var cameraPosition = Vector(0, 0);
	return {
		render: function(universe) {
			canvas.clear();
			universe.particles().forEach(function(particle) {
				particleRenderer.render(particle, cameraPosition);
			});
		},
		background: canvas.background.bind(canvas),
		onParticleAddRequested: function(handler) {
			canvas.onMouseDrag(function(startPosition, endPosition) {
				var position = startPosition.divide(configuration.modelToViewSpaceFactor());
				var velocity = endPosition.minus(startPosition).times(configuration.velocitySettingStrength());
				handler(position, velocity);
			});
		},
		position: canvas.position.bind(canvas),
		width: function(val) {
			canvas.width(val);
		},
		height: function(val) {
			canvas.height(val);
		},
		moveCamera: function(diff) {
			cameraPosition = cameraPosition.plus(diff);
		}
	}
}