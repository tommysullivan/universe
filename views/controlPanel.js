function ControlPanel($, universeCanvas) {
	var cp = {
		reset: function() {
			universe.reset();
			universeCanvas.renderUniverse();
		},
		startStopToggle: function() {
			interval ? universeCanvas.stopEvolution() : universeCanvas.startEvolution();
		}
	}
	$('#resetButton').click(cp.reset);
	$('#startStopToggle').click(cp.startStopToggle);
	return cp;
}