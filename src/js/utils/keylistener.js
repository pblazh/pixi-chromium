define(['signals', 'constants'], function(signals, constants){
    'use strict';

    // listen key for the keyevent and convert them into game specific events
    const KEYCODE_LEFT = 37,
          KEYCODE_RIGHT = 39,
          KEYCODE_UP = 38,
          KEYCODE_DOWN = 40,
          KEYCODE_SPACE = 32;

    const LOOKUP = {
        [KEYCODE_LEFT]: constants.KEY_LEFT,
        [KEYCODE_RIGHT]: constants.KEY_RIGHT,
        [KEYCODE_UP]: constants.KEY_ACCELERATE,
        [KEYCODE_DOWN]: constants.KEY_BREAK,
        [KEYCODE_SPACE]: constants.KEY_FIRE,
    }

    let onKeyDown = (listener) =>
        (ev) => {
            if(LOOKUP[ev.keyCode]){
                listener.keydown.dispatch(LOOKUP[ev.keyCode]);
            }
        }

    let onKeyUp = (listener) =>
        (ev) => {
            if(LOOKUP[ev.keyCode]){
                listener.keyup.dispatch(LOOKUP[ev.keyCode]);
            }
        }

    function KeyListener(){
        this.keydown = new signals.Signal();
        this.keyup = new signals.Signal();
    }

    return function(){
        let kl = new KeyListener();

        let downListener = onKeyDown(kl);
        let upListener = onKeyUp(kl);

        window.addEventListener('keydown', downListener);
        window.addEventListener('keyup', upListener);

        kl.destroy = () => {
            window.removeEventListener('keydown', downListener);
            window.removeEventListener('keyup', upListener);
        };

        return kl;
    };

});
