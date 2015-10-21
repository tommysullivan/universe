function Keyboard(jquerySelectionForKeyboard) {
    return {
        onKeyPress: function(handler) {
            jquerySelectionForKeyboard.keypress(function(event) {
                handler(String.fromCharCode(event.which), event);
            });
        }
    }
}