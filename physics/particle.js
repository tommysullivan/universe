function Particle(position, velocity, mass) {
	var gravitationalConstant = 10;
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
			var _this = this;
			var gravitationalForceVectorsDueToOtherParticles = otherParticles.map(function(otherParticle) {
				return _this.gravitationalForceDueTo(otherParticle);
			});

			var sumGravitationalForceVector = gravitationalForceVectorsDueToOtherParticles.fold(
				Vector(0, 0),
				function(a, b) {
					return a.plus(b);
				}
			);

			var newPosition = position.plus(velocity);
			var accelerationDueToGravity = sumGravitationalForceVector.divideByScalar(mass);
			var newVelocity = velocity.plus(accelerationDueToGravity);
			return Particle(newPosition, newVelocity, mass);
		},
		gravitationalForceDueTo: function(otherParticle) {
			var distance = position.distanceTo(otherParticle.position());
			var magnitude = -1 * gravitationalConstant * this.mass() * otherParticle.mass() / (distance * distance);
			var unitVector = position.unitVectorPointingAt(otherParticle.position());
			return unitVector.timesScalar(magnitude);
		},
		toString: function() {
			return 'Particle(position='+position.toString()+',velocity='+velocity.toString()+')';
		}
	}
}