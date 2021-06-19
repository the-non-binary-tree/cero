game.PathEnemyEntity = me.Entity.extend({
    init: function (x, y, settings) {
        var width = settings.width || settings.framewidth;

        this._super(me.Entity, "init", [x, y , settings]);

        // adjust size to fit sprite
        settings.width = settings.framewidth;
        settings.height = settings.frameheight;
        settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

        // set start/end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.endX   = x + width - settings.framewidth;
        this.pos.x  = x + width - settings.framewidth;

        // enemies are not impacted by gravity
        this.body.gravityScale = 0;

        this.walkLeft = false;

        // body walking & flying speed
        this.body.force.set(settings.velX || 1, settings.velY || 0);
        this.body.setMaxVelocity(settings.velX || 1, settings.velY || 0);

        // set a "enemyObject" type
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;

        // don't update the entities when out of the viewport
        this.alwaysUpdate = false;

        // a specific flag to recognize these enemies
        this.isMovingEnemy = true;
    },


    /**
     * manage the enemy movement
     */
    update : function (dt) {

        if (this.alive)    {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.body.force.x = Math.abs(this.body.force.x);
                this.walkLeft = false;
                this.renderable.flipX(true);
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.body.force.x = -Math.abs(this.body.force.x);
                this.walkLeft = true;
                this.renderable.flipX(false);
            }

            // check & update movement
            this.body.update(dt);

        }

        // return true if we moved of if flickering
        return (this._super(me.Entity, "update", [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    /**
     * collision handle
     */
    onCollision : function (response) {
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
            // make it dead
            this.alive = false;
            //avoid further collision and delete it
            this.body.setCollisionMask(me.collision.types.NO_OBJECT);
            // set dead animation
            this.renderable.setCurrentAnimation("dead");
            // tint to red
            this.renderable.tint.setColor(255, 192, 192);
            // make it flicker and call destroy once timer finished
            var self = this;
            this.renderable.flicker(750, function () {
                me.game.world.removeChild(self);
            });
            // dead sfx
            me.audio.play("enemykill", false);
            // give some score
            game.data.score += 150;
        }

        return false;
    }

});

/**
 * An Slime enemy entity
 * follow a horizontal path defined by the box size in Tiled
 */
game.SlimeEnemyEntity = game.PathEnemyEntity.extend({
    /**
     * constructor
     */
    init: function (x, y, settings) {
        // super constructor
        this._super(game.PathEnemyEntity, "init", [x, y, settings]);

        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "enemies/slime1", "enemies/slime2", "enemies/slime3",
            "enemies/slime4", "enemies/slime5", "enemies/slime_dead",
        ]);

        // custom animation speed ?
        if (settings.animationspeed) {
            this.renderable.animationspeed = settings.animationspeed;
        }

        // move anim
        this.renderable.addAnimation ("walk", [{ name: "enemies/slime1", delay: 300 }, 
            { name: "enemies/slime2", delay: 100 }, { name: "enemies/slime3", delay: 100 }, 
            { name: "enemies/slime4", delay: 100 }, { name: "enemies/slime5", delay: 400 },
            { name: "enemies/slime4", delay: 200 }, { name: "enemies/slime5", delay: 600 }, 
            { name: "enemies/slime4", delay: 50 }, { name: "enemies/slime3", delay: 50 }, 
            { name: "enemies/slime2", delay: 50 }, 
            { name: "enemies/slime1", delay: 300 }, { name: "enemies/slime2", delay: 300 }, 
            { name: "enemies/slime1", delay: 300 }, { name: "enemies/slime2", delay: 300 }, 
            { name: "enemies/slime1", delay: 300 }, { name: "enemies/slime2", delay: 300 }, 
            { name: "enemies/slime1", delay: 300 }, { name: "enemies/slime2", delay: 300 }]);
        // dead anim
        this.renderable.addAnimation ("dead", ["enemies/slime_dead"]);

        // set default one
        this.renderable.setCurrentAnimation("walk");

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, -0.4);

    }
});

//ghost
game.FlyEnemyEntity = game.PathEnemyEntity.extend({
    init: function (x, y, settings) {
        // super constructor
        this._super(game.PathEnemyEntity, "init", [x, y, settings]);

        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "enemies/ghost_up", "enemies/ghost_down", "enemies/ghost_dead"
        ]);

        // custom animation speed ?
        if (settings.animationspeed) {
            this.renderable.animationspeed = settings.animationspeed;
        }

        // walking animatin
        this.renderable.addAnimation ("walk", ["enemies/ghost_up", "enemies/ghost_down"]);
        // dead animatin
        this.renderable.addAnimation ("dead", ["enemies/ghost_dead"]);

        // set default one
        this.renderable.setCurrentAnimation("walk");

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 1.0);
    }
});
