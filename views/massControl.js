function MassControl($massTextInput) {
	return {
		getMass: function() {
			return parseInt($massTextInput.val());
		},
		setMass: function(newMass) {
			$massTextInput.val(newMass);
		}
	}
}