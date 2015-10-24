function UniverseView(canvas, particleRenderer) {
	return {
		render: function(universe) {
			canvas.clear();
			universe.particles().forEach(function(particle) {
				particleRenderer.render(particle);
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
		}
	}
}