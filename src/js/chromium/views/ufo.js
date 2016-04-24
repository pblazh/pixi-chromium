define(
    ['pixi', 'constants', 'tools'],
    function(PX, constants, tools){
    'use strict';

    function UfoView(){
        PX.Sprite.call(this, PIXI.Texture.fromFrame('ufo_0' + Math.floor(Math.random() * 3) + '.png'));
        this.speedY = 3;
        this.speedX = 1;
    }

    UfoView = tools.extend(UfoView, PX.Sprite);

    return UfoView;
});
