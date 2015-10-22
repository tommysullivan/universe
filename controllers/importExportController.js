function ImportExportController(keyboard, logger, universe, universeController, toolbarView) {
    return {
        export: function() {
            var exportJSONString = JSON.stringify(this.getExportJSON(), null, 3);
            window.prompt("Copy to clipboard: Ctrl+C, Enter", exportJSONString);
        },
        import: function(particlesJSONArray) {
            if(particlesJSONArray==undefined) {
                var importJSONString = window.prompt("Import: Ctrl+V, Enter", '[paste your configuration here]');
                try {
                    var importJSON = JSON.parse(importJSONString);
                    particlesJSONArray = importJSON.particles;
                }
                catch(e) {
                    alert('There was a problem importing the configuration you specified: '+e.toString());
                    return;
                }
            }
            universeController.reset();
            var particles = particlesJSONArray.map(function(particleJSON) {
                var position = Vector(particleJSON.position.x, particleJSON.position.y);
                var velocity = Vector(particleJSON.velocity.x, particleJSON.velocity.y);
                universeController.addParticle(position, velocity, particleJSON.mass);
            });
        },
        getExportJSON: function() {
            return {
                particles: universe.particles().map(function(p) {
                    return {
                        position: {
                            x: p.position().x(),
                            y: p.position().y()
                        },
                        velocity: {
                            x: p.velocity().x(),
                            y: p.velocity().y()
                        },
                        mass: p.mass()
                    }
                })
            };
        },
        activate: function() {
            keyboard.onKeyPress(this.processKeyPress.bind(this));
            toolbarView.onLogButtonClick(this.logState.bind(this));
            toolbarView.onExportButtonClick(this.export.bind(this));
            toolbarView.onImportButtonClick(this.import.bind(this));
        },
        logState: function() {
            var exportJSON = this.getExportJSON();
            var kineticPotentialTotalEnergyTriplets = universe.particles().map(function(p) {
                var k = p.kineticEnergy();
                var potential = p.potentialEnergyDueToMany(universe.particlesOtherThan(p));
                var sum = k + potential;
                return {
                    kineticEnergy: k,
                    potentialEnergy: potential,
                    totalEnergy: sum
                };
            });
            var totalEnergyOfSystem = kineticPotentialTotalEnergyTriplets.fold(
                0,
                function(a, b) { return a + b.totalEnergy; }
            );
            logger.log(kineticPotentialTotalEnergyTriplets);
            logger.log(JSON.stringify(exportJSON, null, 3));
            logger.log(exportJSON);
            logger.log('totalEnergyOfSystem = '+totalEnergyOfSystem);
        },
        processKeyPress: function(char) {
            switch(char) {
                case 'l': this.logState(); break;
                case 'x': this.export(); break;
                case 'i': this.import(); break;
            }
        }
    }
}