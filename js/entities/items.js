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

        this.renderable.addAnimation ("be", ["coin.png"]);

        this.renderable.setCurrentAnimation("be");
        this.anchorPoint.set(0.3, 1.5);
    },

    onCollision : function () {
        me.audio.play("cling", false);

        // add health & stress
        game.data.health += 5;
        document.querySelector('#health').textContent = game.data.health;
        game.data.stress -= 3;
        document.querySelector('#stress').textContent = game.data.stress;

        // display item name
        game.data.zeugma = 'Health Potion - Pretty self explanatory if you ask me.'
        document.querySelector('#zeugma').textContent = game.data.zeugma;

        // delete object
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.game.world.removeChild(this);

        return false;
    }
});

// water potion (blue)
game.WaterPotionEntity = game.ItemEntity.extend({
    init: function (x, y, settings) {
        this._super(game.ItemEntity, "init", [x, y, settings]);

        // set renderable
        this.renderable = game.texture0.createAnimationFromName([
            "blue_orb.png", 
        ]);

        this.renderable.addAnimation ("be", ["blue_orb.png"]);

        this.renderable.setCurrentAnimation("be");
        this.anchorPoint.set(0.3, 1.5);
    },

    onCollision : function () {
        me.audio.play("cling", false);

        // add health
        game.data.health += 2;
        document.querySelector('#health').textContent = game.data.health;
        game.data.stress -= 1;
        document.querySelector('#stress').textContent = game.data.stress;

        // display item name
        game.data.zeugma = 'Hydration Potion - It\'s just water.'
        document.querySelector('#zeugma').textContent = game.data.zeugma;

        // delete object
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.game.world.removeChild(this);

        return false;
    }
});

// slime potion (green)
game.SlimePotionEntity = game.ItemEntity.extend({
    init: function (x, y, settings) {
        this._super(game.ItemEntity, "init", [x, y, settings]);

        // set renderable
        this.renderable = game.texture0.createAnimationFromName([
            "green_orb.png", 
        ]);

        this.renderable.addAnimation ("be", ["green_orb.png"]);

        this.renderable.setCurrentAnimation("be");
        this.anchorPoint.set(0.3, 1.5);
    },

    onCollision : function () {
        me.audio.play("cling", false);

        // display item name
        game.data.zeugma = 'Slime Potion - Ew, slime.'
        document.querySelector('#zeugma').textContent = game.data.zeugma;

        // delete object
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.game.world.removeChild(this);

        return false;
    }
});

// gold potion (yellow)
game.GoldPotionEntity = game.ItemEntity.extend({
    init: function (x, y, settings) {
        this._super(game.ItemEntity, "init", [x, y, settings]);

        // set renderable
        this.renderable = game.texture0.createAnimationFromName([
            "yellow_orb.png", 
        ]);

        this.renderable.addAnimation ("be", ["yellow_orb.png"]);

        this.renderable.setCurrentAnimation("be");
        this.anchorPoint.set(0.3, 1.5);
    },

    onCollision : function () {
        me.audio.play("cling", false);

        // add health & stress
        game.data.health += 10;
        document.querySelector('#health').textContent = game.data.health;
        game.data.stress -= 6;
        document.querySelector('#stress').textContent = game.data.stress;

        // display item name
        game.data.zeugma = 'Gold Potion - Actually pee. Just kidding.'
        document.querySelector('#zeugma').textContent = game.data.zeugma;

        // delete object
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.game.world.removeChild(this);

        return false;
    }
});

// broken sword
game.BrokenSwordEntity = game.ItemEntity.extend({
    init: function (x, y, settings) {
        this._super(game.ItemEntity, "init", [x, y, settings]);

        // set renderable
        this.renderable = game.texture0.createAnimationFromName([
            "broken_sword.png", 
        ]);

        this.renderable.addAnimation ("be", ["broken_sword.png"]);

        this.renderable.setCurrentAnimation("be");
        this.anchorPoint.set(0, 1.1);
    },

    onCollision : function () {
        me.audio.play("cling", false);

        // display item name
        game.data.zeugma = 'Broken Sword - What use could you have for such a sword...'
        document.querySelector('#zeugma').textContent = game.data.zeugma;

        // delete object
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.game.world.removeChild(this);

        return false;
    }
});