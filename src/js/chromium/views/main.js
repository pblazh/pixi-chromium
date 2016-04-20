define(
    ['pixi', 'constants', 'tools', './bg', './rocket'],
    function(PX, constants, tools, BgView, RocketView){
    'use strict';

    function MainView(){
        PX.Container.call(this);
        this.addChild(new BgView());

        let rocket = new RocketView();
        rocket.x = 130;
        rocket.y = 370;
        this.addChild(rocket);
    }
    MainView = tools.extend(MainView, PX.Container);

    return MainView;
});
