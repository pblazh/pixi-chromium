define(
    ['pixi', 'constants', 'tools'],
    function(PX, constants, tools){
    'use strict';

    function ExplosionView(){
        PX.extras.MovieClip.call(this, [0, 1, 2, 3, 4].map(function(n){return PIXI.Texture.fromFrame('explode_0' + n + '.png')}));
        this.pivot.x = this.width/2;
        this.pivot.y = this.height/2;
        this.animationSpeed = 0.25;
        this.loop = false;
        this.play();
        this.onComplete = function(){
            if(this.parent){
                this.stop();
                this.parent.removeChild(this);
            }
        };
    }
    ExplosionView = tools.extend(ExplosionView, PX.extras.MovieClip);


    return ExplosionView;
});
