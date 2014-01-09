/**
 * Created by Richie on 14-1-9.
 *
 */

var lab = lab || {};

lab.BouncingSprite = cc.Sprite.extend({
    counter:0.0,
    bouncing:true,
    amplitudeX:1/100, //振幅X，值越大波动越大
    amplitudeY:1/100, //振幅Y，值越大波动越大

    onEnter:function () {
        this._super();
        this.schedule(this.bounceUpdate,0.03);
    },

    bounceUpdate:function (dt) {
        if(this.bouncing) {
            this.counter += dt;
            var sinValue = Math.sin(this.counter*10) + 1;
            var cosValue = Math.cos(this.counter*10) + 1;
            this.setScaleX(sinValue*this.amplitudeX + 1);
            this.setScaleY(cosValue*this.amplitudeY + 1);
            if(this.counter > Math.PI * 10.0) {//重现累计
                this.counter = 0.0;
            }
        }
    },

    onExit:function(){
        this.unscheduleAllCallbacks();
        this._super();
    }

});

lab.BouncingSprite.spriteWithFile = function(name,amx,amy){
    var sprite = new lab.BouncingSprite();
    sprite.init(name);
    if(amx) {
        sprite.amplitudeX = amx;
    }
    if(amy){
        sprite.amplitudeY = amy;
    }
    return sprite;
}