function Canvas(canvasJQuerySelection) {
    function getDrawingContext() {
        return canvasJQuerySelection[0].getContext("2d");
    }
    return {
        drawCircle: function(position, radius, fillStyle) {
            var drawingContext = getDrawingContext();
            drawingContext.fillStyle = fillStyle;
            drawingContext.beginPath();
            drawingContext.arc(position.x(), position.y(), radius, 0, 2 * Math.PI);
            drawingContext.fill();
        },
        clear: function() {
            getDrawingContext().clearRect(0, 0, this.width(), this.height());
        },
        background: function(background) {
            getDrawingContext().drawImage(background,0,0, this.width(), this.height());
        },
        width: function(val) {
            return canvasJQuerySelection.attr('width', val);
        },
        height: function(val) {
            return canvasJQuerySelection.attr('height', val);
        },
        position: function() {
            var offset = canvasJQuerySelection.offset();
            return Vector(offset.left, offset.top);
        },
        onMouseDrag: function(handler) {
            var _this = this;
            canvasJQuerySelection.mousedown(function(mousePressEvent) {
                canvasJQuerySelection.bind('mouseleave mouseup', function(mouseReleaseEvent) {
                    var canvasPosition = _this.position();
                    var mousePressPosition = Vector(mousePressEvent.pageX, mousePressEvent.pageY).minus(canvasPosition);
                    var mouseReleasePosition = Vector(mouseReleaseEvent.pageX, mouseReleaseEvent.pageY).minus(canvasPosition);
                    handler(mousePressPosition, mouseReleasePosition);
                    canvasJQuerySelection.unbind('mouseleave mouseup');
                });
            });
        }
    }
}