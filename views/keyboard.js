function Keyboard(jquerySelectionForKeyboard) {
    return {
        onKeyPress: function(handler) {
            jquerySelectionForKeyboard.keypress(function(event) {
                handler(String.fromCharCode(event.which), event);
            });
        },
        onArrowKey: function(handler) {
            jquerySelectionForKeyboard.keydown(function(event) {
                if(event.keyCode > 36 && event.keyCode < 41) handler(event);
            });
        }
    }
}
Keyboard.LEFT = 37;
Keyboard.UP = 38;
Keyboard.RIGHT = 39;
Keyboard.DOWN = 40;