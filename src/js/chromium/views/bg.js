define(
    ['pixi', 'constants', 'tools'],
    function(PX, constants, tools){
    'use strict';

    function PlanetView(n){
        PX.Sprite.call(this,
            PIXI.Texture.fromFrame('planet_0' + n + '.png'));
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
        this.addChild(new PX.Sprite(PIXI.Texture.fromFrame('bg_0.png')));

        this.planets = [];
        for(let i = 0; i< 4; i++){
            let planet = new PlanetView(i);
            this.planets.push(planet);
            this.addChild(planet);
        }

        this.earth = new PX.Sprite(PIXI.Texture.fromFrame('earth.png'));
        this.earth.pivot.x = this.earth.width / 2;
        this.earth.pivot.y = this.earth.height / 2;
        this.earth.x = constants.GAME_WIDTH / 2;
        this.earth.y = constants.GAME_HEIGHT + 80;
        this.addChild(this.earth);

        let bgOver = new PX.Sprite(PIXI.Texture.fromFrame('bg_over.png'));
        this.addChild(bgOver);

    }
    BgView = tools.extend(BgView, PX.Container);

    BgView.prototype.update = function(time){
        this.earth.rotation += 0.005;
        this.planets.forEach(function(planet){
            let loop = (time % planet.speed) / planet.speed;
            let planetLoop = (loop + planet.start) % 1;
            planet.y = (constants.GAME_HEIGHT + planet.height * 2) * planetLoop - planet.height;
            planet.rotation = (planet.start * planetLoop * planet.direction) * 6.28;
        });
    }

    return BgView;
});
