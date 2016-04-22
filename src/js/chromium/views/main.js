define(
    ['pixi', 'constants', 'tools', './bg', './rocket', './explosion', './bullet', './ufo'],
    function(PX, constants, tools, BgView, RocketView, ExplosionView, BulletView, UfoView){
    'use strict';

    function MainView(){
        PX.Container.call(this);

        this.bullets = [];
        this.ufos = [];
        this.explodes = [];

        this.rocketSpeed = 0;

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
        this.ufos.push(ufo);

    }
    MainView = tools.extend(MainView, PX.Container);

    MainView.prototype.update = function(position){
        this.bg.update(position);
        this.rocket.x += this.rocketSpeed * 2;
        this.rocket.x = Math.max(0, Math.min(constants.GAME_WIDTH, this.rocket.x))

        this.bullets.forEach(function(bullet, i){
            bullet.y += bullet.speed;

            if(bullet.y + bullet.height < 0){
                this.removeChild(bullet);
                this.bullets[i] = this.bullets.pop();
            }
        }.bind(this));
    }

    function hitTest(bullet, ufos){
        ufos.forEach(function(ufo, i){
            if(bullet.y > ufo.y && bullet.y< ufo.y + ufo.height && bullet.x > ufo.x && bullet.x < ufo.x + ufo.width){
                // hit it
            }
        }
    }

    MainView.prototype.change = function(keys){
        if(keys[constants.KEY_FIRE] && !this.bullet){
            let bullet = new BulletView();
            bullet.y = this.rocket.y;
            bullet.x = this.rocket.x;

            this.addChild(bullet);
            this.bullets.push(bullet);
        }

        if(keys[constants.KEY_LEFT]){
            this.rocket.tilt(-1);
            this.rocketSpeed = -2;
        }else if(keys[constants.KEY_RIGHT]){
            this.rocket.tilt(1);
            this.rocketSpeed = 2;
        }else{
            this.rocket.tilt(0);
            this.rocketSpeed = 0;
        }
    }

    return MainView;
});
