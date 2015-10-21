function Universe(particles) {
	return {
		particles: function() {
			return particles;
		},
		evolve: function() {
			particles = particles.map(function(particle) {
				return particle.evolve(particles.filter(function(p) { return p != particle; }));
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