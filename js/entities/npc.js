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
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
        this.alwaysUpdate = false;
        this.isMovingEnemy = true;
    },

    onCollision : function (response) {
        let speechBox = document.querySelector('#speech-container');
        speechBox.classList.add('fadeIn');
        speechBox.classList.remove('fadeOut');

        if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
            this.alive = false;
            this.body.setCollisionMask(me.collision.types.NO_OBJECT);

            this.renderable.setCurrentAnimation("dead");

            // delete once anim over
            var self = this;
            this.renderable.flicker(750, function () {
                me.game.world.removeChild(self);
            });
            
            me.audio.play("enemykill", false);

            game.data.score += 15;
        }

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
        this.renderable.addAnimation ("walk", [{ name: "enemies/slime1", delay: 300 }, 
            { name: "enemies/slime2", delay: 100 }, { name: "enemies/slime3", delay: 100 }, 
            { name: "enemies/slime4", delay: 100 }, { name: "enemies/slime5", delay: 400 },
            { name: "enemies/slime4", delay: 200 }, { name: "enemies/slime5", delay: 600 }, 
            { name: "enemies/slime4", delay: 50 }, { name: "enemies/slime3", delay: 50 }, ]);
        // dead anim
        this.renderable.addAnimation ("dead", ["enemies/slime_dead"]);

        // set default move & position
        this.renderable.setCurrentAnimation("walk");
        this.anchorPoint.set(0.2, -0.4);
    }
});

/*
// flying ghost 
game.FlyEnemyEntity = game.PathEnemyEntity.extend({
    init: function (x, y, settings) {
        this._super(game.PathEnemyEntity, "init", [x, y, settings]);

        this.renderable = game.texture.createAnimationFromName([
            "enemies/ghost_up", "enemies/ghost_down", "enemies/ghost_dead"
        ]);

        if (settings.animationspeed) {
            this.renderable.animationspeed = settings.animationspeed;
        }

        // walking anim
        this.renderable.addAnimation ("walk", ["enemies/ghost_up", "enemies/ghost_down"]);
        // dead anim
        this.renderable.addAnimation ("dead", ["enemies/ghost_dead"]);

        // set default anim and pos
        this.renderable.setCurrentAnimation("walk");
        this.anchorPoint.set(0.5, 1.0);
    }
}); */