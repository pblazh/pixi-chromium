define(
    ['pixi', 'constants', 'tools'],
    function(PX, constants, tools){
    'use strict';

    function ExplosionView(){
        PX.extras.MovieClip.call(this, [0, 1, 2, 3, 4].map(function(n){return PIXI.Texture.fromFrame('explode_0' + n + '.png')}));
        this.animationSpeed = 0.25;
        this.play();
    }
    ExplosionView = tools.extend(ExplosionView, PX.extras.MovieClip);


    return ExplosionView;
});
