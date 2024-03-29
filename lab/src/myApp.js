/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var MyLayer = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    sprite:null,

    init:function () {

        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.Director.getInstance().getWinSize();

        // add a "close" icon to exit the progress. it's an autorelease object
//        var closeItem = cc.MenuItemImage.create(
//            s_CloseNormal,
//            s_CloseSelected,
//            function () {
//                cc.log("close");
//            },this);

        var closeNormalSprite = lab.BouncingSprite.spriteWithFile(s_CloseNormal);
        var closeSelectedSprite = lab.BouncingSprite.spriteWithFile(s_CloseSelected);

        var closeItem = cc.MenuItemSprite.create(closeNormalSprite,closeSelectedSprite);
        closeItem.setCallback(function() { cc.log("close"); }, this);
        closeItem.setAnchorPoint(cc.p(0.5, 0.5));

        var menu = cc.Menu.create(closeItem);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu, 1);
        closeItem.setPosition(cc.p(size.width - 200, 200));

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        this.helloLabel = cc.LabelTTF.create("Hello World", "Impact", 38);
        // position the label on the center of the screen
        this.helloLabel.setPosition(cc.p(size.width / 2, size.height - 40));
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 5);

        // add "Helloworld" splash screen"
        this.sprite = cc.Sprite.create(s_HelloWorld);
        this.sprite.setAnchorPoint(cc.p(0.5, 0.5));
        this.sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.sprite.setScale(size.height/this.sprite.getContentSize().height);
        this.addChild(this.sprite, 0);
    }
});

//弹性效果sprite
var GTSprite = cc.Sprite.extend({
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

GTSprite.spriteWithFile = function(name){
    var sprite = new GTSprite();
    sprite.init(name);
    return sprite;
}

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});
