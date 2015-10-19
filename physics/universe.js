function Universe(particles) {
	return {
		particles: function() {
			return particles;
		},
		evolve: function() {
			return Universe(particles.map(function(particle) {
				return particle.evolve(particles.filter(function(p) { return p != particle; }));
			}));
		},
		reset: function() {
			particles.length = 0;
		},
		toString: function() {
			return 'Universe(' + particles.map(function(p, i) {
				return 'p'+i+'='+p.toString();
			}).join(',')+')';
		}
	}
}