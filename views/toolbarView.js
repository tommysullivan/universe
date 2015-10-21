function ToolbarView($resetButton, $startStopToggle, $timestepButton, $logButton, $exportButton, $importButton) {
	function bindClick($i) {
		return $i.click.bind($i);
	}
	return {
		onResetClick: bindClick($resetButton),
		onStartStopToggleClick: bindClick($startStopToggle),
		isStarted: function(isStarted) {
			$startStopToggle.text(isStarted ? '(S)top' : '(S)tart');
		},
		onTimestepButtonClick: bindClick($timestepButton),
		onLogButtonClick: bindClick($logButton),
		onExportButtonClick: bindClick($exportButton),
		onImportButtonClick: bindClick($importButton)
	}
}