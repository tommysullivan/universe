function Universe(particles) {
	return {
		particles: function() {
			return particles;
		},
		particlesOtherThan: function(particle) {
			return particles.filter(function(p) { return p != particle; });
		},
		evolve: function() {
			var _this = this;
			particles = particles.map(function(particle) {
				return particle.evolve(_this.particlesOtherThan(particle));
			})
		},
		reset: function() {
			particles = [];
		},
		addParticle: function(particle) {
			particles.push(particle);
		}
	}
}