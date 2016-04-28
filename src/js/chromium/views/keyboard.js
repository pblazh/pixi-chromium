define(
    ['pixi', 'constants', 'tools'],
    function(PX, constants, tools){
    'use strict';


    function KeyView(name){
        PX.extras.MovieClip.call(this, ['', '_over'].map(function(n){return PIXI.Texture.fromFrame(name + n + '.png')}));
        this.pivot.x = this.width / 2;
        this.pivot.y = this.height / 2;
    }
    KeyView = tools.extend(KeyView, PX.extras.MovieClip);

    function KeyboardView(){
        PX.Container.call(this);

        this.space = new KeyView('space');
        this.left = new KeyView('arrow');
        this.down = new KeyView('arrow');
        this.right = new KeyView('arrow');
        this.up = new KeyView('arrow');

        this.space.y = this.left.y = this.right.y = this.down.y = this.space.y = 60;

        this.space.x = 90;
        this.left.x = 215;
        this.up.x = 275;
        this.up.rotation = Math.PI / 2;
        this.down.x = 275;
        this.down.rotation = -Math.PI / 2;
        this.right.x = 335;
        this.right.rotation = Math.PI;

        this.addChild(this.space);
        this.addChild(this.left);
        this.addChild(this.up);
        this.addChild(this.down);
        this.addChild(this.right);
    }
    KeyboardView = tools.extend(KeyboardView, PX.Container);
    KeyboardView.prototype.change = function(state){
        this.left.gotoAndStop(state[constants.KEY_LEFT] ? 1 : 0);
        this.right.gotoAndStop(state[constants.KEY_RIGHT] ? 1 : 0);
        this.up.gotoAndStop(state[constants.KEY_ACCELERATE] ? 1 : 0);
        this.down.gotoAndStop(state[constants.KEY_BREAK] ? 1 : 0);
        this.space.gotoAndStop(state[constants.KEY_FIRE] ? 1 : 0);
    };


    return KeyboardView;
});
