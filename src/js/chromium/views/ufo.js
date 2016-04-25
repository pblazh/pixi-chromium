define(
    ['pixi', 'constants', 'tools'],
    function(PX, constants, tools){
    'use strict';

    function UfoView(){
        PX.Sprite.call(this, PIXI.Texture.fromFrame('ufo_0' + Math.floor(Math.random() * 3) + '.png'));

        this.pivot.x = this.width/2;
        this.pivot.y = this.height/2;

        let direction = Math.random() > 0.5 ? 1 : -1;
        this.speed = (0.02 + Math.random() * 0.05) * direction;
        this.angle = 0;
        this.speedY = 0;
        this.speedX = 0;
    }

    UfoView = tools.extend(UfoView, PX.Sprite);

    UfoView.prototype.move = function(distance){
        this.angle += this.speed;
        this.speedX = Math.cos(this.angle) * 5;
        this.speedY = 1 + Math.sin(this.angle) * 1;

        this.rotation = this.speedX / 10;
        this.x += this.speedX;
        this.y += this.speedY;
    }

    return UfoView;
});
