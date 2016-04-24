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

        addUfo(this);

    }
    MainView = tools.extend(MainView, PX.Container);

    MainView.prototype.update = function(position){
        this.bg.update(position);
        this.rocket.update();
        this.rocket.x += this.rocket.speed * 5;
        this.rocket.x = Math.max(0, Math.min(constants.GAME_WIDTH, this.rocket.x))

        this.ufos.forEach(function(ufo, i){
            ufo.y += ufo.speedY;
        });
        this.bullets.forEach(function(bullet, i){
            bullet.y += bullet.speed;

            if(bullet.y + bullet.height < 0){
                this.removeChild(bullet);
                this.bullets[i] = this.bullets.pop();
            }

            checkBullet(this, bullet);
        }.bind(this));
    }

    function addUfo(self){
        let ufo = new UfoView();
        ufo.x = Math.random() * (constants.GAME_WIDTH - ufo.width);
        ufo.y = -150;
        self.addChild(ufo);
        self.ufos.push(ufo);
    }

    function checkBullet(self, bullet){
        let deadUfo = hitUfo(bullet, self.ufos);
        if(deadUfo >= 0){
            let ufo = self.ufos.splice(deadUfo, 1)[0];
            self.removeChild(ufo);
            self.removeChild(bullet);
            let explosion = new ExplosionView();
            explosion.x = bullet.x - explosion.width / 2;
            explosion.y = bullet.y - explosion.height / 2;
            self.explodes.push(explosion);
            self.addChild(explosion);
            addUfo(self);
        }
    }
    function hitUfo(bullet, ufos){
        let ret = -1 ;
        ufos.forEach(function(ufo, i){
            if(isInside(bullet, ufo)){
                ret = i;
            }
        });
        return ret;
    }
    function isInside(bullet, ufo){
        return bullet.y > ufo.y
        && bullet.y < ufo.y + ufo.height
        && bullet.x > ufo.x
        && bullet.x < ufo.x + ufo.width;
    }

    MainView.prototype.change = function(keys){
        if(keys[constants.KEY_FIRE] && !this.bullet){
            let bullet = new BulletView();
            bullet.y = this.rocket.y;
            bullet.x = this.rocket.x - 10;

            this.addChild(bullet);
            this.bullets.push(bullet);
        }

        if(keys[constants.KEY_LEFT]){
            this.rocket.acceleration = -0.1;
        }else if(keys[constants.KEY_RIGHT]){
            this.rocket.acceleration = 0.1;
        }else{
            this.rocket.acceleration = 0;
        }
    }

    return MainView;
});
