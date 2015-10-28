function ImportExportController(keyboard, logger, universe, universeController, toolbarView) {
    return {
        export: function() {
            var exportJSONString = JSON.stringify(this.getExportJSON(), null, 3);
            var blob = new Blob([exportJSONString], {type: "application/json;charset=utf-8"});
            saveAs(blob, "universe.json");
        },
        importFile: function(fileSelectedEvent) {
            var reader = new FileReader();
            var _this = this;
            reader.onload = function(fileLoadedEvent) {
                var universeJSONString = fileLoadedEvent.target.result;
                var universeJSON = JSON.parse(universeJSONString);
                _this.import(universeJSON.particles);
            };
            reader.readAsText(fileSelectedEvent.target.files[0]);
        },
        import: function(particlesJSON) {
            universeController.reset();
            var particles = particlesJSON.map(function(particleJSON) {
                var position = Vector(particleJSON.position.x, particleJSON.position.y);
                var velocity = Vector(particleJSON.velocity.x, particleJSON.velocity.y);
                universeController.addParticle(position, velocity, particleJSON.mass, particleJSON.charge);
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
                        mass: p.mass(),
                        charge: p.charge()
                    }
                })
            };
        },
        activate: function() {
            keyboard.onKeyPress(this.processKeyPress.bind(this));
            toolbarView.onLogButtonClick(this.logState.bind(this));
            toolbarView.onExportButtonClick(this.export.bind(this));
            toolbarView.onImportFileChosen(this.importFile.bind(this));
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
                case 'i': toolbarView.triggerImportFileButtonClick(); break;
            }
        }
    }
}