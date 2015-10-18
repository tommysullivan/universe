function MassControl(jquerySelectionForMassTextInput) {
	return {
		getMass: function() {
			return parseInt(jquerySelectionForMassTextInput.val());
		},
		setMass: function(newMass) {
			jquerySelectionForMassTextInput.val(newMass);
		}
	}
}