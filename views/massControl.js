function MassControl($) {
	return {
		getMass: function() {
			return parseInt($('#mass').val());
		},
		setMass: function(newMass) {
			$('#mass').val(newMass);
		}
	}
}