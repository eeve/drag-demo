var Resize = Class.create({
    initialize: function(obj) {
        this.obj = obj;
        this.resizeelm = null;
        this.fun = null; //记录触发什么事件的索引 
        this.original = []; //记录开始状态的数组 
        this.width = null;
        this.height = null;
        this.fR = Common.BindAsEventListener(this, this.resize);
        this.fS = Common.Bind(this, this.stop);
    },
    set: function(elm, direction) {
        if (!elm) return;
        this.resizeelm = elm;
        Common.addListener(this.resizeelm, 'mousedown', Common.BindAsEventListener(this, this.start, this[direction]));
        return this;
    },
    start: function(e, fun) {
        this.fun = fun;
        this.original = [parseInt(Common.CurrentStyle(this.obj).width), parseInt(Common.CurrentStyle(this.obj).height), parseInt(Common.CurrentStyle(this.obj).left), parseInt(Common.CurrentStyle(this.obj).top)];
        this.width = (this.original[2] || 0) + this.original[0];
        this.height = (this.original[3] || 0) + this.original[1];
        Common.addListener(document, "mousemove", this.fR);
        Common.addListener(document, 'mouseup', this.fS);
    },
    resize: function(e) {
        this.fun(e);
        Common.llq.IE ? (this.resizeelm.onlosecapture = function() {
            this.fS()
        }) : (this.resizeelm.onblur = function() {
            this.fS()
        })
    },
    stop: function() {
        Common.removeListener(document, "mousemove", this.fR);
        Common.removeListener(document, "mousemove", this.fS);
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    },
    down: function(e) {
        e.clientY > this.original[3] ? Common.Css(this.obj, {
            top: this.original[3] + 'px',
            height: e.clientY - this.original[3] + 'px'
        }) : this.turnUp(e);
    },
    right: function(e) {
        e.clientX > this.original[2] ? Common.Css(this.obj, {
            left: this.original[2] + 'px',
            width: e.clientX - this.original[2] + "px"
        }) : this.turnLeft(e);
    },
    rightDown: function(e) {
        this.right(e);
        this.down(e);
    },
    turnUp: function(e) {
        Common.Css(this.obj, {
            top: e.clientY + 'px',
            height: this.original[3] - e.clientY + 'px'
        });
    },
    turnLeft: function(e) {
        Common.Css(this.obj, {
            left: e.clientX + 'px',
            width: this.original[2] - e.clientX + 'px'
        });
    }
});