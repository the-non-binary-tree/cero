// display for items
game.ItemEntity = me.Entity.extend({
    init: function (x, y, settings) {
        var width = settings.width || settings.framewidth;

        this._super(me.Entity, "init", [x, y , settings]);

        this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;

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

// health potion (red)
game.HealthPotionEntity = game.ItemEntity.extend({
    init: function (x, y, settings) {
        this._super(game.ItemEntity, "init", [x, y, settings]);

        // set renderable
        this.renderable = game.texture.createAnimationFromName([
            "coin.png", 
        ]);

        //flip if player facing left
        if (settings.flip === true) {
            this.renderable.flipX(true);
            console.log(settings.flip);
        } else {
            this.renderable.flipX(false);
        }

        this.renderable.addAnimation ("be", ["coin.png"]);

        this.renderable.setCurrentAnimation("be");
        this.anchorPoint.set(0.3, 1.5);
    },

    onCollision : function () {

        // do something when collide
        me.audio.play("cling", false);

        // subtract health
        game.data.health += 5;
        document.querySelector('#health').textContent = game.data.health;

        // display item name
        game.data.zeugma = 'Health Potion - Pretty self explanatory if you ask me.'
        document.querySelector('#zeugma').textContent = game.data.zeugma;

        // delete object
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.game.world.removeChild(this);

        return false;
    }
});
