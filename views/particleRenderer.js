function ParticleRenderer(configuration, canvas) {
    return {
        render: function(particle, cameraPosition, zoom) {
            var radius = particle.mass() * configuration.massDensityFactor() * zoom;
            if(radius<0.5) {
                radius = 0.5;
                color = configuration.tinyParticleColor();
            }
            var drawPosition = particle.position()
                .times(configuration.modelToViewSpaceFactor())
                .times(zoom)
                .minus(cameraPosition);
            var charge = particle.charge();
            var color = charge < 0
                ? configuration.negativeColor()
                : charge > 0
                    ? configuration.positiveColor()
                    : configuration.particleColor();
            canvas.drawCircle(drawPosition, radius, color);
        }
    }
}