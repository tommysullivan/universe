function Vector(x, y) {
	return {
		magnitude: function() {
			return Math.sqrt(x * x + y * y);
		},
		times: function(scalar) {
			return Vector(scalar * x, scalar * y);
		},
		divide: function(scalar) {
			return this.times(1 / scalar);
		},
		x: function() {
			return x;
		},
		y: function() {
			return y;
		},
		minus: function(otherVector) {
			return this.plus(otherVector.times(-1));
		},
		plus: function(otherVector) {
			return Vector(x + otherVector.x(), y + otherVector.y());
		},
		distanceTo: function(somePosition) {
			return this.minus(somePosition).magnitude();
		},
		unitVectorPointingAt: function(somePosition) {
			return this.minus(somePosition).divide(this.distanceTo(somePosition));
		},
		toString: function() {
			return 'Vector('+x+','+y+')';
		}
	}
}