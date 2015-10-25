function Particle(position, velocity, mass, configuration, charge) {
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
		charge: function() {
			return charge;
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
			var newPosition = position.plus(velocity.times(configuration.timeStep()));
			var accelerationDueToGravity = this.gravitationalForceDueToParticles(otherParticles).divide(mass);
			var accelerationDueToElectrostaticForce = this.electrostaticForceDueToParticles(otherParticles).divide(mass);
			var totalAcceleration = accelerationDueToGravity.plus(accelerationDueToElectrostaticForce);
			var newVelocity = velocity.plus(totalAcceleration.times(configuration.timeStep()));
			return Particle(newPosition, newVelocity, mass, configuration, charge);
		},
		electrostaticForceDueToParticles: function(otherParticles) {
			var gravitationalForceDueToParticles = otherParticles.map(this.electrostaticForceDueTo.bind(this));
			return gravitationalForceDueToParticles.fold(
				Vector(0, 0),
				function(a, b) { return a.plus(b); }
			);
		},
		gravitationalForceDueToParticles: function(otherParticles) {
			var gravitationalForceDueToParticles = otherParticles.map(this.gravitationalForceDueTo.bind(this));
			return gravitationalForceDueToParticles.fold(
				Vector(0, 0),
				function(a, b) { return a.plus(b); }
			);
		},
		electrostaticForceDueTo: function(otherParticle) {
			var distanceBetweenParticles = position.distanceTo(otherParticle.position());
			var magnitude = configuration.electrostaticConstant() * charge * otherParticle.charge()
				/
				(distanceBetweenParticles * distanceBetweenParticles);
			var unitVector = position.unitVectorPointingAt(otherParticle.position());
			return unitVector.times(magnitude);
		},
		gravitationalForceDueTo: function(otherParticle) {
			var potentialEnergy = this.potentialEnergyDueTo(otherParticle);
			var magnitude = potentialEnergy / position.distanceTo(otherParticle.position());
			var unitVector = position.unitVectorPointingAt(otherParticle.position());
			return unitVector.times(magnitude);
		}
	}
}