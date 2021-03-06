define(
    ['pixi', 'constants', 'tools', './bg', './rocket', './explosion', './bullet', './ufo', './bomb', './score', './totalscore'],
    function(PX, constants, tools, BgView, RocketView, ExplosionView, BulletView, UfoView, BombView, ScoreView, TotalScoreView){
    'use strict';

    function Gamefield(){
        PX.Container.call(this);

        this.bg = new BgView();
        this.addChild(this.bg);

        this.rocket = new RocketView();
        this.rocket.x = constants.GAME_WIDTH / 2;
        this.rocket.y = 410;
        this.addChild(this.rocket);

    }
    Gamefield = tools.extend(Gamefield, PX.Container);

    Gamefield.prototype.update = function(position){
        this.bg.update(position);
    }

    Gamefield.prototype.getRocket = function(){
        return this.rocket;
    }

    Gamefield.prototype.addUfo = function(){
        let ufo = new UfoView();
        ufo.x = Math.random() * (constants.GAME_WIDTH - ufo.width);
        ufo.y = -ufo.height;
        this.addChild(ufo);
        return ufo;
    }

    Gamefield.prototype.addBomb = function(ufo){
        let bomb = new BombView();
        bomb.x = ufo.x;
        bomb.y = ufo.y + ufo.height / 2;
        this.addChild(bomb);
        return bomb;
    }

    Gamefield.prototype.addBullet = function(){
        let bullet = new BulletView();
        bullet.x = this.rocket.x - 8;
        bullet.y = this.rocket.y  - 8;
        this.addChild(bullet);
        return bullet;
    }

    Gamefield.prototype.addScore = function(x, y, score){
        let scoreView = new ScoreView(score);
        scoreView.x = x;
        scoreView.y = y;
        this.addChild(scoreView);
        return scoreView;
    }

    Gamefield.prototype.addTotalScore = function(score){
        let scoreView = new TotalScoreView(score);
        scoreView.x = constants.GAME_WIDTH / 2;
        scoreView.y = constants.GAME_HEIGHT / 2;
        this.addChild(scoreView);
        return scoreView;
    }

    Gamefield.prototype.explode = function(what){
        let explosion = new ExplosionView();
        explosion.x = what.x;
        explosion.y = what.y;
        this.addChild(explosion);
        setTimeout(()=> this.removeChild(what), 100);
    }

    return Gamefield;
});
