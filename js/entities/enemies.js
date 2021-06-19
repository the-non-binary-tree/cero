game.PathEnemyEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, "init", [x, y , settings]);
        this.alwaysUpdate = true; //exit viewport

        // on keypress
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.A,     "left");
        me.input.bindKey(me.input.KEY.D,     "right");
        me.input.bindKey(me.input.KEY.W,     "jump", true);
        me.input.bindKey(me.input.KEY.UP,    "jump", true);
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);

        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "character/redSquare1", "character/redSquare2", "character/redSquare3",
            "character/redSquare4",
        ]);

        // define a basic walking animation
        this.renderable.addAnimation ("walk",  [{ name: "character/redSquare1", delay: 200 }, { name: "character/redSquare2", delay: 200 }, { name: "character/redSquare3", delay: 200 }, { name: "character/redSquare4", delay: 200 }, { name: "character/redSquare3", delay: 200 }, { name: "character/redSquare2", delay: 200 } ]);
        // set as default
        this.renderable.setCurrentAnimation("walk");

        // change renderable position
        this.anchorPoint.set(.5, 0.5);
    },
})