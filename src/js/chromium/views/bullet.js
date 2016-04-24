define(
    ['pixi', 'constants', 'tools'],
    function(PX, constants, tools){
    'use strict';

    function BulletView(){
        PX.extras.MovieClip.call(this, [0, 1, 2, 3, 4].map(function(n){return PIXI.Texture.fromFrame('shoot_0' + n + '.png')}));
        this.speed = -5;
        this.animationSpeed = 0.2;
        this.loop = false;
        this.play();
    }
    BulletView = tools.extend(BulletView, PX.extras.MovieClip);

    return BulletView;
});
