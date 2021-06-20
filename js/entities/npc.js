// display for npcs
game.NPCEntity = me.Entity.extend({
    init: function (x, y, settings) {
        var width = settings.width || settings.framewidth;

        this._super(me.Entity, "init", [x, y , settings]);

        this.body.collisionType = me.collision.types.NPC_OBJECT;

        // adjust size to fit sprite
        settings.width = settings.framewidth;
        settings.height = settings.frameheight;
        settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

        // adjust position
        x = this.pos.x;
        this.startX = x;
        this.endX   = x + width - settings.framewidth;
        this.pos.x  = x + width - settings.framewidth;
    },
});

// npc num1
game.TeethmanEntity = game.NPCEntity.extend({
    init: function (x, y, settings) {
        this._super(game.NPCEntity, "init", [x, y, settings]);

        // set renderable
        this.renderable = game.texture.createAnimationFromName([
            "teethman1.png", "teethman1.1.png", "teethman1.2.png",
            "teethman1.3.png", 
        ]);
        if (settings.animationspeed) {
            this.renderable.animationspeed = settings.animationspeed;
        }

        //flip if player facing left
        if (settings.flip === true) {
            this.renderable.flipX(true);
            console.log(settings.flip)
        } else {
            this.renderable.flipX(false);
        }

        // mvmt anim
        this.renderable.addAnimation ("blink", [{ name: "teethman1.png", delay: 3000 }, 
            { name: "teethman1.1.png", delay: 100 }, { name: "teethman1.2.png", delay: 100 },
            { name: "teethman1.3.png", delay: 100 }, { name: "teethman1.1.png", delay: 100 },
            { name: "teethman1.png", delay: 100 }, { name: "teethman1.1.png", delay: 100 },
            { name: "teethman1.2.png", delay: 100 }, { name: "teethman1.3.png", delay: 100 },
            { name: "teethman1.3.png", delay: 100 }, { name: "teethman1.1.png", delay: 100 },
        ]);
        // dead anim
        this.renderable.addAnimation ("dead", ["teethman1.png"]);

        // set default move & position
        this.renderable.setCurrentAnimation("blink");
        this.anchorPoint.set(0.2, 1.1);
    }
});