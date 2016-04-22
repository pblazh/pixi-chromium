define(
    ['pixi', 'constants', 'tools'],
    function(PX, constants, tools){
    'use strict';

    function BulletView(){
        PX.extras.MovieClip.call(this, [0, 1, 2, 3, 4].map(function(n){return PIXI.Texture.fromFrame('shoot_0' + n + '.png')}));
        this.speed = -5;
        this.pivot.x = 5;
        this.animationSpeed = 0.25;
        this.loop = false;
        this.play();
    }
    BulletView = tools.extend(BulletView, PX.extras.MovieClip);
    // BulletView.prototype.update = function(time){
    //     this.y -= 5;
    //     if( this.currentFrame < this.totalFrames - 1){
    //         PX.extras.MovieClip.prototype.update.call(this, time);
    //     }
    // };

    return BulletView;
});
