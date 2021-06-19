// ui el stuff
game.HUD = game.HUD || {};

game.HUD.UIContainer = me.Container.extend({

    init: function() {
        this._super(me.Container, "init");
        this.floating = true;
        this.z = Infinity;
        this.isPersistent = true;

        this.name = "HUD";
        
        if (!me.device.isMobile) {
            this.addChild(new game.HUD.FSControl(20, 56));
        }
        this.addChild(new game.HUD.AudioControl(70, 55));
    }
});

// fullscreen toggle
game.HUD.FSControl = me.GUI_Object.extend({

    init: function(x, y) {
        this._super(me.GUI_Object, "init", [ x, y, {
            image: game.texture,
            region : "grow.png"
        } ]);

        this.setOpacity(0.5);
        this.anchorPoint.set(-2.2, 0.4);
    },

    // hover
    onOver : function () {
        this.setOpacity(1.0);
    },

    // un-hover
    onOut : function () {
        this.setOpacity(0.5);
    },

    onClick : function () {
        if (!me.device.isFullscreen) {
            me.device.requestFullscreen();

            this.setRegion(game.texture.getRegion("shrink.png"));
            this.anchorPoint.set(-2.2, 0.4);
        } else {
            me.device.exitFullscreen();

            this.setRegion(game.texture.getRegion("grow.png"));
            this.anchorPoint.set(-2.2, 0.4);
        }
        return false;
    }
});

// audio toggle
game.HUD.AudioControl = me.GUI_Object.extend({
   
    init: function(x, y) {
        this._super(me.GUI_Object, "init", [ x, y, {
            image: game.texture,
            region : "sound2.png"
        } ]);
        this.setOpacity(0.5);

        // default on
        this.isMute = false;

        this.anchorPoint.set(.4, .4);
    },

    // hover
    onOver : function (/* event */) {
        this.setOpacity(1.0);
    },

    // unhover
    onOut : function (/* event */) {
        this.setOpacity(0.5);
    },

    onClick : function (/* event */) {
        if (this.isMute) {
            me.audio.unmuteAll();
            this.isMute = false;

            this.setRegion(game.texture.getRegion("sound3.png"));
            this.anchorPoint.set(.4, .4);
        } else {
            me.audio.muteAll();
            this.isMute = true;

            this.setRegion(game.texture.getRegion("sound1.png"));
            this.anchorPoint.set(.4, .4);
        }
        return false;
    }
});