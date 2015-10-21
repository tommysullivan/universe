function ImportExportController(keyboard, logger, universe, universeController, toolbarView) {
    return {
        export: function() {
            var exportJSONString = JSON.stringify(this.getExportJSON(), null, 3);
            window.prompt("Copy to clipboard: Ctrl+C, Enter", exportJSONString);
        },
        import: function() {
            var importJSONString = window.prompt("Import: Ctrl+V, Enter", '[paste your configuration here]');
            try {
                var importJSON = JSON.parse(importJSONString);
                var particleJSONs = importJSON.particles;
                universeController.reset();
                var particles = particleJSONs.map(function(particleJSON) {
                    var position = Vector(particleJSON.position.x, particleJSON.position.y);
                    var velocity = Vector(particleJSON.velocity.x, particleJSON.velocity.y);
                    universeController.addParticle(position, velocity, particleJSON.mass);
                });
            }
            catch(e) {
                alert('There was a problem importing the configuration you specified: '+e.toString());
            }
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
            logger.log(JSON.stringify(exportJSON, null, 3));
            logger.log(exportJSON);
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