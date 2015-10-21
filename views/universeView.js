function UniverseView(canvas, particleRenderer, $canvas, background) {
	return {
		render: function(universe) {
			canvas.width($canvas.width());
			canvas.height($canvas.height());
			canvas.background(background);
			universe.particles().forEach(function(particle) {
				particleRenderer.render(particle);
			});
		},
		onMouseDrag: canvas.onMouseDrag.bind(canvas),
		position: canvas.position.bind(canvas),
		width: canvas.width.bind(canvas),
		height: canvas.height.bind(canvas)
	}
}