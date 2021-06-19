// general specs of npc
game.NPCEntity = me.Entity.extend({
    init: function (x, y, settings) {
        var width = settings.width || settings.framewidth;

        this._super(me.Entity, "init", [x, y , settings]);

        // mvmt speed
        this.body.force.set(settings.velX || 1, settings.velY || 0);
        this.body.setMaxVelocity(settings.velX || 1, settings.velY || 0);

        // adjust size to fit sprite
        settings.width = settings.framewidth;
        settings.height = settings.frameheight;
        settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

        // adjust position
        x = this.pos.x;
        this.startX = x;
        this.endX   = x + width - settings.framewidth;
        this.pos.x  = x + width - settings.framewidth;

        this.body.gravityScale = 0;
        this.walkLeft = false;
        this.alwaysUpdate = false;
    },

    onCollision : function (response) {
        let speechBox = document.querySelector('#speech-container');
        speechBox.classList.add('fadeIn');
        speechBox.classList.remove('fadeOut');

        return false;
    }

});

// sharp teeth person
game.TeethEntity = game.NPCEntity.extend({
    init: function (x, y, settings) {
        this._super(game.NPCEntity, "init", [x, y, settings]);

        // set renderable
        this.renderable = game.texture.createAnimationFromName([
            "enemies/slime1", "enemies/slime2", "enemies/slime3",
            "enemies/slime4", "enemies/slime5", "enemies/slime_dead",
        ]);
        if (settings.animationspeed) {
            this.renderable.animationspeed = settings.animationspeed;
        }

        // mvmt anim
        this.renderable.addAnimation ("walk", [{ name: "enemies/slime1", delay: 300 } ]);
        // dead anim
        this.renderable.addAnimation ("dead", ["enemies/slime_dead"]);

        // set default move & position
        this.renderable.setCurrentAnimation("walk");
        this.anchorPoint.set(0.2, -0.4);
    }
});