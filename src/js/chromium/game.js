define(['constants'], function(constants){
    'use strict';

    function Game(view){
        this.score = 0;
        this.view = view;

        this.rocket = this.view.getRocket();
        this.bullets = [];
        this.ufos = [];
        this.bombs = [];

        this.addUfo();

        this.isRunning = true;
    }

    Game.prototype.update = function(position){
        if(!this.isRunning){
            return;
        }
        this.view.update(position);

        this.rocket.move(position);
        keepInside(this.rocket);

        this.bullets.forEach((bullet, i) => {
            bullet.move(position);

            if(isOutside(bullet)){
                removeBullet(this, bullet);
            }else{
                checkBullet(this, bullet);
            }
        });

        this.ufos.forEach((ufo) => {
            ufo.move(position);
            keepInside(ufo);

            if(Math.random() > 0.995){
                this.addBomb(ufo);
            }
            if(isInside(ufo, this.rocket) || isBelow(ufo)){
                destroyGame(this);
            }
        });

        this.bombs.forEach((bomb) => {
            bomb.move(position);

            if(isBelow(bomb)){
                removeBomb(this, bomb);
            }else if(isInside(bomb, this.rocket)){
                destroyGame(this);
            }
        });
    }

    function destroyGame(self){
        self.view.explode(self.rocket);
        self.ufos.forEach((ufo) => self.view.explode(ufo));
        self.bullets.forEach((bullet) => self.view.explode(bullet));
        self.bombs.forEach((bomb) => self.view.explode(bomb));
        self.isRunning = false;
    }

    function checkBullet(self, bullet){
        let deadUfo = hitUfo(bullet, self.ufos);
        if(deadUfo >= 0){
            let ufo = self.ufos.splice(deadUfo, 1)[0];
            self.view.explode(ufo);
            self.view.removeChild(bullet);

            setTimeout(self.addUfo.bind(self), 500);
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

    function isBelow(ufo){
        return ufo.y  >= constants.GAME_HEIGHT;
    }

    function isInside(inside, outside){
        return inside.y > outside.y
        && inside.y < outside.y + outside.height
        && inside.x > outside.x
        && inside.x < outside.x + outside.width;
    }

    Game.prototype.change = function(keys){
        if(keys[constants.KEY_FIRE] && !this.bullet){
            this.shoot();
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

    Game.prototype.addUfo = function(){
        let ufo = this.view.addUfo();
        this.ufos.push(ufo);
        return ufo;
    }

    Game.prototype.addBomb = function(ufo){
        if(!this.bombs.length && ufo.y < constants.GAME_HEIGHT/2){
            let bomb = this.view.addBomb(ufo);
            this.bombs.push(bomb);
        }
    }

    Game.prototype.shoot = function(){
        let bullet = this.view.addBullet(this.rocket.x - 10, this.rocket.y);
        this.bullets.push(bullet);
        return bullet;
    };

    return Game;
});
