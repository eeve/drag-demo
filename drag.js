var Drag = Class.create({
    initialize: function(titleBar, dragDiv, wrapperDiv, resizeBtn, Options) {
        //设置点击是否透明，默认透明60%
        titleBar = Common.$(titleBar);
        dragDiv = Common.$(dragDiv);
        wrapperDiv = Common.$(wrapperDiv);
        resizeBtn = Common.$(resizeBtn);
        this.dragArea = {
            left: 0,
            right: 1000,
            top: 0,
            bottom: 1000
        };
        if (Options) {
            this.opacity = Options.opacity ? (isNaN(parseInt(Options.opacity)) ? 100 : parseInt(Options.opacity)) : 100;
            if (Options.area) {
                if (Options.area.left && !isNaN(parseInt(Options.area.left))) {
                    this.dragArea.maxLeft = Options.area.left
                };
                if (Options.area.right && !isNaN(parseInt(Options.area.right))) {
                    this.dragArea.maxRight = Options.area.right
                };
                if (Options.area.top && !isNaN(parseInt(Options.area.top))) {
                    this.dragArea.maxTop = Options.area.top
                };
                if (Options.area.bottom && !isNaN(parseInt(Options.area.bottom))) {
                    this.dragArea.maxBottom = Options.area.bottom
                };
            }
        } else {
            this.opacity = 60;
        }
        this.placeholderDiv = null;
        this.tmpX = 0;
        this.tmpY = 0;
        this.moveable = false;
        this.dragArray = [];

        var dragObj = this;
        var dragTbl = document.getElementById("dragTable");
        var zindex = 1000;

        function dragMouseMove(e) {
            console.log('onmousemove');
            if(!dragObj.moveable) {
                return false;
            }
            
            // x = 当前位置坐标 + 浏览器滚动条距离 - 鼠标拖拽点坐标
            var x = e.x + window.pageXOffset - dragObj.tmpX;
            var y = e.y + window.pageYOffset- dragObj.tmpY;

            // 是否越界
            if(x < dragObj.dragArea.left) {
                x = dragObj.dragArea.left;
            }
            if(x > dragObj.dragArea.right) {
                x = dragObj.dragArea.right;
            }
            if(y < dragObj.dragArea.top) {
                y = dragObj.dragArea.top;
            }
            if(y > dragObj.dragArea.bottom) {
                y = dragObj.dragArea.bottom;
            }

            dragDiv.style.left = x +'px';
            dragDiv.style.top = y + 'px';
            dragDiv.style.cursor = 'move';
        }
        
        titleBar.onmousedown = function(e) {
            console.log('onmousedown');
            
            if (Common.isIE && e.button == 1 || !Common.isIE && e.button == 0) {} else {
                console.log('只能左键拖动');
                return false;
            }

            // 鼠标左键点击时，设置为可拖拽
            dragObj.moveable = true;

            // 获取鼠标在拖拽条中的点击坐标
            var mousePos = Common.getMousePosInRange(e, titleBar);

            // 鼠标点击的具体位置坐标
            dragObj.tmpX = mousePos.x;
            dragObj.tmpY = mousePos.y;

            //插入虚线框
            var dashedElement = document.createElement("div");
            dashedElement.className = dragDiv.className + ' placeholder-box';
            dashedElement.style.cssText = dragDiv.style.cssText;
            dashedElement.style.zIndex = 1;
            if (dragDiv.nextSibling) {
                dragDiv.parentNode.insertBefore(dashedElement, dragDiv.nextSibling);
            }
            else {
                dragDiv.parentNode.appendChild(dashedElement);
            }
            dragObj.placeholderDiv = dashedElement;

            // 鼠标左键一直按住，并拖动
            dragDiv.style.position = 'absolute';
            dragDiv.style.zIndex = 99999;

            Common.addListener(document, "mousemove", dragMouseMove);

            Common.addListener(document, "mouseup", function() {
                console.log('onmouseup');
                // 鼠标左键松开时，设置为不可拖拽
                dragObj.placeholderDiv.remove();
                dragObj.moveable = false;
                dragDiv.style.cursor = 'default';
                dragDiv.style.zIndex = zindex++;
                dragObj.tmpX = 0;
                dragObj.tmpY = 0;
                Common.removeListener(document, "mousemove", dragMouseMove);
            });
        }
        new Resize(dragDiv).set(resizeBtn, 'rightDown');
    },
    SetOpacity: function(dragDiv, n) {
        if (Common.isIE) {
            dragDiv.filters.alpha.opacity = n;
        } else {
            dragDiv.style.opacity = n / 100;
        }
    },
    GetZindex: function() {
        var maxZindex = 0;
        var divs = document.getElementsByTagName("div");
        for (z = 0; z < divs.length; z++) {
            maxZindex = Math.max(maxZindex, divs[z].style.zIndex);
        }
        return maxZindex;
    },
    RegDragsPos: function() {
        var arrDragDivs = new Array();
        arrDragDivs.push({
            DragId: 'body',
            PosLeft: 0,
            PosTop: 0,
            PosWidth: 1000,
            PosHeight: 1000
        });
        return arrDragDivs;
    }
});