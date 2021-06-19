// DC
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
        this.addChild(new game.HUD.ScoreItem(-10, -10));
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

// score display
game.HUD.ScoreItem = me.Renderable.extend({
    //constructor
    init: function(x, y) {
        this.relative = new me.Vector2d(x, y);
        this._super(me.Renderable, "init", [
            me.game.viewport.width + x,
            me.game.viewport.height + y,
            10,
            10
        ]);

        this.font = new me.BitmapText(0, 0, {
            font : "PressStart2P",
            textAlign : "right",
            textBaseline : "bottom"
        });

        // local copy of global score
        this.score = -1;

        // recalculate the object position if the canvas is resize
        me.event.subscribe(me.event.CANVAS_ONRESIZE, (function(w, h){
            this.pos.set(w, h, 0).add(this.relative);
        }).bind(this));
    },

    //update function
    update : function (/*dt*/) {
        // we don't draw anything fancy here, so just
        // return true if the score has been updated
        if (this.score !== game.data.score) {
            this.score = game.data.score
            return true
        }
        return false
    },

    //draw the score
    draw : function (renderer) {
        this.font.draw(renderer, game.data.stress, this.pos.x, this.pos.y)
    }

})