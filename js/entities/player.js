game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, "init", [x, y , settings]);
        this.alwaysUpdate = true; //exit viewport

        //scrollable background
        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH, 0.1);

        // on keypress
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.A,     "left");
        me.input.bindKey(me.input.KEY.D,     "right");
        me.input.bindKey(me.input.KEY.W,     "jump", true);
        me.input.bindKey(me.input.KEY.UP,    "jump", true);
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);

        // walking & jumping speed
        this.body.setMaxVelocity(3, 15);
        this.body.setFriction(0.4, 0);

        this.dying = false;
        this.mutipleJump = 1;

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

    // player position 
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
        }

        // handle collisions against other shapes
        me.collision.check(this);

        // check if we moved (an "idle" animation would definitely be cleaner)
        if (this.body.vel.x !== 0 || this.body.vel.y !== 0 ||
            (this.renderable && this.renderable.isFlickering())
        ) {
            this._super(me.Entity, "update", [dt]);
            return true;
        }

        return false;
    },


    // collisions
    onCollision : function (response, other) {
        switch (other.body.collisionType) {
            case me.collision.types.WORLD_SHAPE:
                // Simulate a platform object
                if (other.type === "platform") {
                    if (this.body.falling &&
                        !me.input.isKeyPressed("down") &&
                        // Shortest overlap would move the player upward
                        (response.overlapV.y > 0) &&
                        // The velocity is reasonably fast enough to have penetrated to the overlap depth
                        (~~this.body.vel.y >= ~~response.overlapV.y)
                    ) {
                        // Disable collision on the x axis
                        response.overlapV.x = 0;
                        // Repond to the platform (it is solid)
                        return true;
                    }
                    // Do not respond to the platform (pass through)
                    return false;
                }

                // Custom collision response for slopes
                else if (other.type === "slope") {
                    // Always adjust the collision response upward
                    response.overlapV.y = Math.abs(response.overlap);
                    response.overlapV.x = 0;

                    // Respond to the slope (it is solid)
                    return true;
                }
                break;

            case me.collision.types.ENEMY_OBJECT:
                if (!other.isMovingEnemy) {
                    // spike or any other fixed danger
                    this.body.vel.y -= this.body.maxVel.y * me.timer.tick;
                    this.hurt();
                }
                else {
                    // a regular moving enemy entity
                    if ((response.overlapV.y > 0) && this.body.falling) {
                        // jump
                        this.body.vel.y -= this.body.maxVel.y * 1.5 * me.timer.tick;
                    }
                    else {
                        this.hurt();
                    }
                    // Not solid
                    return false;
                }
                break;

            default:
                // Do not respond to other objects (e.g. coins)
                return false;
        }

        // Make the object solid
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
})