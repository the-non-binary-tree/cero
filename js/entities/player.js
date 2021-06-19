game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, "init", [x, y , settings]);
        this.alwaysUpdate = true;

        // walking & jumping speed
        this.body.setMaxVelocity(3, 18);
        this.body.setFriction(0.4, 0);

        this.dying = false;
        this.mutipleJump = 1;

        // scrollable screen
        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH, 0.1);

        // onkeydown
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X,     "jump", true);
        me.input.bindKey(me.input.KEY.UP,    "jump", true);
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);
        me.input.bindKey(me.input.KEY.DOWN,  "down");

        me.input.bindKey(me.input.KEY.A,     "left");
        me.input.bindKey(me.input.KEY.D,     "right");
        me.input.bindKey(me.input.KEY.W,     "jump", true);
        me.input.bindKey(me.input.KEY.S,     "down");

        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "character/redSquare1", "character/redSquare2", "character/redSquare3",
            "character/redSquare4",
        ]);

        // mvmt anim
        this.renderable.addAnimation ("walk",  [{ name: "character/redSquare1", delay: 200 }, { name: "character/redSquare2", delay: 200 }, { name: "character/redSquare3", delay: 200 }, { name: "character/redSquare4", delay: 200 }, { name: "character/redSquare3", delay: 200 }, { name: "character/redSquare2", delay: 200 } ]);
        this.renderable.setCurrentAnimation("walk");

        this.anchorPoint.set(.5, 0.4);
    },

    // position update
    update : function (dt) {

        if (me.input.isKeyPressed("left"))    {
            this.body.force.x = -this.body.maxVel.x;
            this.renderable.flipX(true);
        } else if (me.input.isKeyPressed("right")) {
            this.body.force.x = this.body.maxVel.x;
            this.renderable.flipX(false);
        } else {
            this.body.force.x = 0;
        }

        if (me.input.isKeyPressed("jump")) {
            this.body.jumping = true;
            if (this.multipleJump <= 2) {
                this.body.force.y = -this.body.maxVel.y * this.multipleJump++;
                me.audio.stop("jump");
                me.audio.play("jump", false);
            }
        }
        else {

            this.body.force.y = 0;

            // reset mjump
            if (!this.body.falling && !this.body.jumping) {
                this.multipleJump = 1;
            }
            else if (this.body.falling && this.multipleJump < 2) {
                this.multipleJump = 2;
            }
        }

        this.body.update(dt);

        // check if exit viewport by falling
        if (!this.inViewport && (this.pos.y > me.video.renderer.getHeight())) {
            // reset
            me.game.world.removeChild(this);
            me.game.viewport.fadeIn("#fff", 150, function(){
                me.audio.play("die", false);
                me.levelDirector.reloadLevel();
                me.game.viewport.fadeOut("#fff", 150);
            });
            return true;
        }

        // handle collisions against other shapes
        me.collision.check(this);
        if (this.body.vel.x !== 0 || this.body.vel.y !== 0 ||
            (this.renderable && this.renderable.isFlickering())
        ) {
            this._super(me.Entity, "update", [dt]);
            return true;
        }

        return false;
    },

    onCollision : function (response, other) {
        switch (other.body.collisionType) {
            case me.collision.types.WORLD_SHAPE:
                // platform sim
                if (other.type === "platform") {
                    if (this.body.falling &&
                        !me.input.isKeyPressed("down") &&
                        (response.overlapV.y > 0) &&
                        // check velocity fast enough
                        (~~this.body.vel.y >= ~~response.overlapV.y)
                    ) {
                        // is solid
                        response.overlapV.x = 0;
                        return true;
                    }
                    // pass thru
                    return false;
                }

                // custom collision response for slopes
                else if (other.type === "slope") {
                    // adjust response upward
                    response.overlapV.y = Math.abs(response.overlap);
                    response.overlapV.x = 0;
                    return true;
                }
                break;

            case me.collision.types.ENEMY_OBJECT:
                if (!other.isMovingEnemy) {
                    this.body.vel.y -= this.body.maxVel.y * me.timer.tick;
                    this.hurt();
                }
                else {
                    if ((response.overlapV.y > 0) && this.body.falling) {
                        // jump
                        this.body.vel.y -= this.body.maxVel.y * 1.5 * me.timer.tick;
                    }
                    else {
                        this.hurt();
                    }
                    return false;
                }
                break;

            default:
                // other objects: no resp
                return false;
        }
        return true;
    },

    hurt : function () {
        var sprite = this.renderable;

        if (!sprite.isFlickering()) {

            // tint to red and flicker
            sprite.tint.setColor(255, 192, 192);
            sprite.flicker(750, function () {
                // clear the tint once the flickering effect is over
                sprite.tint.setColor(255, 255, 255);
            });

            // flash the screen
            me.game.viewport.fadeIn("#FFFFFF", 75);
            me.audio.play("die", false);
        }
    }
});
