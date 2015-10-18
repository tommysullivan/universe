function UniverseCanvas(jquerySelectionForUniverseCanvas, drawingContext) {
	return {
		renderUniverse: function(universe) {
			drawingContext.clearRect(0, 0, 5000, 5000);
			universe.particles().forEach(this.renderParticle.bind(this));
		},
		renderParticle: function(particle) {
			//TODO: Only render particle if it is within viewable area
			var radius = particle.mass() / 2;
			var position = particle.position();
			drawingContext.fillStyle = '#FFFFFF';
			drawingContext.beginPath();
			drawingContext.arc(position.x(), position.y(), radius, 0, 2 * Math.PI);
			drawingContext.fill();
		},
		onMouseDown: function(handler) {
			jquerySelectionForUniverseCanvas.mousedown(handler);
		},
		onMouseUp: function(handler) {
			jquerySelectionForUniverseCanvas.bind('mouseleave mouseup', handler);
		},
		removeMouseUpHandlers: function() {
			jquerySelectionForUniverseCanvas.unbind('mouseleave mouseup');
		},
		position: function() {
			var canvasOffset = jquerySelectionForUniverseCanvas.offset();
			return Vector(canvasOffset.left, canvasOffset.top);
		}
	}
}