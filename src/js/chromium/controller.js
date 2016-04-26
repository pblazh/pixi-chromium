define(
    ['signals', 'constants', '../utils/keylistener'],
    function(signals, constants, keylistener){
    'use strict';

    function Controller(){
        this.dirty = true;
        this.isRunning = false;
        this.keys = {};
        this.updated = new signals.Signal();
    }

    Controller.prototype.onKeyDown= function(key){
        this.dirty = true;
        this.keys[key] = true;
    };
    Controller.prototype.onKeyUp= function(key){
        this.dirty = true;
        this.keys[key] = false;
    };

    Controller.prototype.stop = function(){
        this.isRunning = false;
        clearInterval(this.interval);
        this.kListener.destroy();
    };

    Controller.prototype.update = function(){
        if(this.dirty){
            this.updated.dispatch(this.keys);
        }
        this.dirty = false;
        clearInterval(this.interval);
        if(this.isRunning){
            this.interval = setTimeout( this.update.bind(this), 100);
        }
    };

    Controller.prototype.start = function(){
        this.kListener = keylistener();
        this.kListener.keydown.add(this.onKeyDown.bind(this));
        this.kListener.keyup.add(this.onKeyUp.bind(this));
        this.isRunning = true;
        this.interval = setTimeout( this.update.bind(this), 100);
    };

    return Controller;
});
