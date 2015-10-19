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
		evolve: function(otherParticles) {
			var gravitationalForceVectorsDueToOtherParticles = otherParticles.map(this.gravitationalForceDueTo.bind(this));
			var sumGravitationalForceVector = gravitationalForceVectorsDueToOtherParticles.fold(
				Vector(0, 0),
				function(a, b) { return a.plus(b); }
			);
			var newPosition = position.plus(velocity);
			var accelerationDueToGravity = sumGravitationalForceVector.divideByScalar(mass);
			var newVelocity = velocity.plus(accelerationDueToGravity);
			return Particle(newPosition, newVelocity, mass, configuration);
		},
		gravitationalForceDueTo: function(otherParticle) {
			var distance = position.distanceTo(otherParticle.position());
			var magnitude = -1 * configuration.gravitationalConstant() * this.mass() * otherParticle.mass() / (distance * distance);
			var unitVector = position.unitVectorPointingAt(otherParticle.position());
			return unitVector.timesScalar(magnitude);
		},
		toString: function() {
			return 'Particle(position='+position.toString()+',velocity='+velocity.toString()+')';
		}
	}
}