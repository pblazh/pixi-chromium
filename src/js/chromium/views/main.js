define(
    ['pixi', 'constants', 'tools', './bg', './rocket', './explosion', './bullet', './ufo'],
    function(PX, constants, tools, BgView, RocketView, ExplosionView, BulletView, UfoView){
    'use strict';

    function MainView(){
        PX.Container.call(this);
        this.bg = new BgView();
        this.addChild(this.bg);

        this.rocket = new RocketView();
        this.rocket.x = constants.GAME_WIDTH / 2;
        this.rocket.y = 410;
        this.addChild(this.rocket);

        this.addChild(new ExplosionView());

        let ufo = new UfoView();
        ufo.x = 50;
        ufo.y = 50;
        this.addChild(ufo);

        let bullet = new BulletView();
        bullet.y = this.rocket.y;
        bullet.x = this.rocket.x;
        this.addChild(bullet);
    }
    MainView = tools.extend(MainView, PX.Container);

    MainView.prototype.update = function(position){
        this.bg.update(position);
        this.rocket.x += this.rocket.speedX * 2;
        this.rocket.x = Math.max(0, Math.min(constants.GAME_WIDTH, this.rocket.x))
    }

    MainView.prototype.change = function(keys){
        this.rocket.update(keys);
    }

    return MainView;
});
