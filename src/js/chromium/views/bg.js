define(
    ['pixi', 'constants', 'tools'],
    function(PX, constants, tools){
    'use strict';

    function PlanetView(){
        PX.Sprite.call(this,
            PIXI.Texture.fromFrame('planet_0' + Math.floor(Math.random() * 3) + '.png'));
    }
    PlanetView = tools.extend(PlanetView, PX.Sprite);

    function BgView(){
        PX.Container.call(this);
        this.addChild(new PX.Sprite(PIXI.Texture.fromFrame('bg.png')));
        this.addChild(new PlanetView());
    }
    BgView = tools.extend(BgView, PX.Container);

    return BgView;
});
