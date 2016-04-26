define(['signals', 'constants'], function(signals, constants){
    'use strict';

    function Game(view){
        this.isRunning = true;
        this.score = 0;
        this.view = view;

        this.rocket = this.view.getRocket();
        this.bullets = [];
        this.ufos = [];
        this.bombs = [];

        addUfo(this);
        this.complete = new signals.Signal();
    }

    Game.prototype.update = function(position){
        if(!this.isRunning){
            return;
        }
        this.view.update(position);

        this.rocket.move(position);
        keepInside(this.rocket);

        this.bullets.forEach((bullet) => {
            bullet.move(position);

            if(isOutside(bullet)){
                removeBullet(this, bullet);
            }else{
                checkIfBulletHit(this, bullet);
            }
        });

        this.ufos.forEach((ufo) => {
            ufo.move(position);
            keepInside(ufo);

            if(Math.random() > 0.995){
                addBomb(this, ufo);
            }
            if(isInside(ufo, this.rocket) || isBelowBottom(ufo)){
                destroyGame(this);
            }
        });

        this.bombs.forEach((bomb) => {
            bomb.move(position);

            if(isBelowBottom(bomb)){
                removeBomb(this, bomb);
            }else if(isInside(bomb, this.rocket)){
                destroyGame(this);
            }
        });
    }


    Game.prototype.change = function(keys){
        if(keys[constants.KEY_FIRE] && !this.bullet){
            shoot(this);
        }

        if(keys[constants.KEY_LEFT]){
            this.rocket.accelerateX(-0.1);
        }else if(keys[constants.KEY_RIGHT]){
            this.rocket.accelerateX(0.1);
        }else{
            this.rocket.accelerateX(0);
        }

        if(keys[constants.KEY_ACCELERATE]){
            this.rocket.accelerateY(-0.1);
        }else if(keys[constants.KEY_BREAK]){
            this.rocket.accelerateY(0.1);
        }else{
            this.rocket.accelerateY(0);
        }
    }
    function destroyGame(self){
        self.view.explode(self.rocket);
        self.ufos.forEach((ufo) => self.view.explode(ufo));
        self.bullets.forEach((bullet) => self.view.explode(bullet));
        self.bombs.forEach((bomb) => self.view.explode(bomb));
        self.isRunning = false;
        self.view.addTotalScore(self.score);
        self.complete.dispatch(self.score);
    }

    function checkIfBulletHit(self, bullet){
        let deadUfo = hitUfo(bullet, self.ufos);
        if(deadUfo >= 0){
            let ufo = self.ufos.splice(deadUfo, 1)[0];
            self.view.explode(ufo);
            self.view.removeChild(bullet);

            setTimeout(()=>addUfo(self), 500);
            self.score++;
            setTimeout(function(){
                this.view.addScore(ufo.x, ufo.y, this.score);
            }.bind(self), 300);
        }
    }

    function removeBullet(self, bullet){
        let index = self.bullets.indexOf(bullet);
        self.view.removeChild(bullet);
        if(self.bullets.length > 1){
            self.bullets[index] = self.bullets.pop();
        }else{
            self.bullets.length = 0;
        }
    }

    function removeBomb(self, bomb){
        let index = self.bombs.indexOf(bomb);
        self.view.removeChild(bomb);
        if(self.bombs.length > 1){
            self.bombs[index] = self.bombs.pop();
        }else{
            self.bombs.length = 0;
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

    function keepInside(what){
        what.x = Math.max(0, Math.min(constants.GAME_WIDTH, what.x))
        what.y = Math.max(0, Math.min(constants.GAME_HEIGHT, what.y))
    }
    function isOutside(bullet){
        return bullet.y + bullet.height < 0;
    }

    function isBelowBottom(ufo){
        return ufo.y  >= constants.GAME_HEIGHT;
    }

    function isInside(inside, outside){
        return inside.y > outside.y
        && inside.y < outside.y + outside.height
        && inside.x > outside.x
        && inside.x < outside.x + outside.width;
    }

    function addUfo(self){
        let ufo = self.view.addUfo();
        self.ufos.push(ufo);
        return ufo;
    }

     function addBomb(self, ufo){
        if(!self.bombs.length && ufo.y < constants.GAME_HEIGHT/2){
            let bomb = self.view.addBomb(ufo);
            self.bombs.push(bomb);
        }
    }

    function shoot(self){
        let bullet = self.view.addBullet();
        self.bullets.push(bullet);
        return bullet;
    };

    return Game;
});
