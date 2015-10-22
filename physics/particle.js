function Particle(position, velocity, mass, configuration) {
	return {
		mass: function() {
			return mass;
		},
		position: function() {
			return position;
		},
		velocity: function() {
			return velocity;
		},
		kineticEnergy: function() {
			var speed = this.velocity().magnitude();
			return this.mass() * speed * speed / 2;
		},
		potentialEnergyDueToMany: function(otherParticles) {
			return otherParticles.map(this.potentialEnergyDueTo.bind(this)).fold(0, function(a,b) { return a + b});
		},
		potentialEnergyDueTo: function(otherParticle) {
			return -1 * configuration.gravitationalConstant() * this.mass() * otherParticle.mass()
				/
				position.distanceTo(otherParticle.position());
		},
		evolve: function(otherParticles) {
			var newPosition = position.plus(velocity);
			var accelerationDueToGravity = this.gravitationalForceDueToParticles(otherParticles).divide(mass);
			var newVelocity = velocity.plus(accelerationDueToGravity);
			return Particle(newPosition, newVelocity, mass, configuration);
		},
		gravitationalForceDueToParticles: function(otherParticles) {
			var gravitationalForceDueToParticles = otherParticles.map(this.gravitationalForceDueTo.bind(this));
			return gravitationalForceDueToParticles.fold(
				Vector(0, 0),
				function(a, b) { return a.plus(b); }
			);
		},
		gravitationalForceDueTo: function(otherParticle) {
			var potentialEnergy = this.potentialEnergyDueTo(otherParticle);
			var magnitude = potentialEnergy / position.distanceTo(otherParticle.position());
			var unitVector = position.unitVectorPointingAt(otherParticle.position());
			return unitVector.times(magnitude);
		},
		toString: function() {
			return 'Particle(position='+position.toString()+',velocity='+velocity.toString()+')';
		}
	}
}