window.onload = function() {
    new Drag("titleBar1", "dragDiv1", 'dragTable', 'resize1');
    new Drag("titleBar2", "dragDiv2", 'dragTable', 'resize2');
    new Drag("titleBar3", "dragDiv3", 'dragTable', 'resize3');
    new Drag("titleBar4", "dragDiv4", 'dragTable', 'resize4');
    new Drag("titleBar5", "dragDiv5", 'dragTable', 'resize5');
    
    var doms = document.querySelectorAll('.drag-box');
    var pos = [];
    for (var i = doms.length - 1; i >= 0; i--) {
    	var dom = doms[i];
    	pos.push(Common.getElementPos(dom));
    	console.log(Common.CurrentStyle(dom).width);
    }
    console.log(pos);

	var d1 = document.getElementById('dragDiv1');
	var p1 = new Position(d1);
	var frame = p1.frame();
	console.log(frame);
	console.log(p1.origin());
	console.log(p1.originSelf());

	console.log('range', p1.pointRange());
	console.log('contains', p1.contains({x: 1346, y: 30}))
}