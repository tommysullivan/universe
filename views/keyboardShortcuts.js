function KeyboardShortcuts($, controlPanel, massControl) {
	var smallChange = 3;
	var bigChange = 20;	

	function changeMass(n) {
		massControl.setMass(massControl.getMass() + n);
	}

	function onKeyPress(event) {
		switch(String.fromCharCode(event.which)) {
			case 's': controlPanel.startStopToggle(); break;
			case '-': changeMass(-1 * smallChange); break;
			case '=': changeMass(smallChange); break;
			case '_': changeMass(-1 * bigChange); break;
			case '+': changeMass(bigChange); break;
			case 'r': controlPanel.reset();
		}
	}

	$('body').keypress(onKeyPress);
}