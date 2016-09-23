///------------------------------------------------------------------------------------------------------
var Class = {
	create: function(properties) {
		var _class = function() {
			return (arguments[0] !== null && this.initialize && typeof(this.initialize) == 'function') ? this.initialize.apply(this, arguments) : this;
		};
		_class.prototype = properties;
		return _class;
	}
}