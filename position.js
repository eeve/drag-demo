var elUtils = {
	currentStyle: function(el) {
        return el.currentStyle || document.defaultView.getComputedStyle(el, null);
    },
    getPosition: function(el) {
        var _x = 0,
            _y = 0;
        do {
            _x += el.offsetLeft;
            _y += el.offsetTop;
        } while (el = el.offsetParent);
        return { x: _x, y: _y };
    }
}

var Position = Class.create({
	initialize: function(dom) {
		this.el = dom;
		console.log(111, this);
	},
	// 宽度及相对于body的坐标位置
	frame: function() {
		var styles = elUtils.currentStyle(this.el);
		var width = styles.width;
		var height = styles.height;
		var pos = elUtils.getPosition(this.el);
		return {
			width: parseFloat(width),
			height: parseFloat(height),
			x: pos.x,
			y: pos.y
		}
	},
	// 中心点，相对于body
	origin: function(frame) {
		frame = frame || this.frame();
		return {
			x: Math.round(frame.x + frame.width * 0.5),
			y: Math.round(frame.y + frame.height * 0.5)
		}
	},
	// 中心点，相对于自身
	originSelf: function(frame) {
		frame = frame || this.frame();
		return {
			x: Math.round(frame.width * 0.5),
			y: Math.round(frame.height * 0.5)
		}
	},
	// x与y的取值范围
	pointRange: function(frame) {
		var frame = frame || this.frame();
		var leftX = frame.x;
		var rightX = frame.x + frame.width;
		var topY = frame.y;
		var bottomY = frame.y + frame.height;
		return {
			minX: leftX,
			maxX: rightX,
			minY: topY,
			maxY: bottomY
		};
	},
	contains: function(point) {
		var range = this.pointRange();
		return (point.x >= range.minX && point.x <= range.maxX) && (point.y >= range.minY && point.y <= range.maxY);
	}
});