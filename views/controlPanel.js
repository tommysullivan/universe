function ControlPanel(jquerySelectionForResetButton, jquerySelectionForStartStopToggle) {
	return {
		onResetClick: function(handler) {
			jquerySelectionForResetButton.click(handler);
		},
		onStartStopToggleClick: function(handler) {
			jquerySelectionForStartStopToggle.click(handler);
		},
		isStarted: function(isStarted) {
			jquerySelectionForStartStopToggle.text(isStarted ? 'Stop' : 'Start');
		}
	}
}