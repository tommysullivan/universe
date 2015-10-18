function Vector(x, y) {
	return {
		magnitude: function() {
			return Math.sqrt(x * x + y * y);
		},
		timesScalar: function(scalar) {
			return Vector(scalar * x, scalar * y);
		},
		divideByScalar: function(scalar) {
			return this.timesScalar(1 / scalar);
		},
		x: function() {
			return x;
		},
		y: function() {
			return y;
		},
		minus: function(otherVector) {
			return this.plus(otherVector.timesScalar(-1));
		},
		plus: function(otherVector) {
			return Vector(x + otherVector.x(), y + otherVector.y());
		},
		distanceTo: function(somePosition) {
			return this.minus(somePosition).magnitude();
		},
		unitVectorPointingAt: function(somePosition) {
			return this.minus(somePosition).divideByScalar(this.distanceTo(somePosition));
		},
		toString: function() {
			return 'Vector('+x+','+y+')';
		}
	}
}