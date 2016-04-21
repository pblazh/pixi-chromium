define(
    ['pixi', 'constants', 'tools'],
    function(PX, constants, tools){
    'use strict';

    function PlanetView(){
        PX.Sprite.call(this,
            PIXI.Texture.fromFrame('planet_0' + Math.floor(Math.random() * 3) + '.png'));
        this.x = Math.random() * constants.GAME_WIDTH;
        this.pivot.x = Math.random();
        this.pivot.y = Math.random();
        this.start = Math.random();
        this.speed = Math.random() * 200 + 400;
        this.direction = Math.random() > 0.5 ? 1 : -1;
    }
    PlanetView = tools.extend(PlanetView, PX.Sprite);

    function BgView(){
        PX.Container.call(this);
        this.addChild(new PX.Sprite(PIXI.Texture.fromFrame('bg.png')));

        this.planets = [];
        for(let i = 0; i< 5; i++){
            let planet = new PlanetView();
            this.planets.push(planet);
            this.addChild(planet);
        }

    }
    BgView = tools.extend(BgView, PX.Container);

    BgView.prototype.update = function(time){
        this.planets.forEach(function(planet){
            let loop = (time % planet.speed) / planet.speed;
            let planetLoop = (loop + planet.start) % 1;
            planet.y = (constants.GAME_HEIGHT + planet.height * 2) * planetLoop - planet.height;
            planet.rotation = (planet.start * planetLoop * planet.direction) * 6.28;
        });
    }

    return BgView;
});
