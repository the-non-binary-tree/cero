game.CoinEntity = me.Sprite.extend({
    
    init: function (x, y, settings) {
        this._super(me.Sprite, "init", [
            x, y ,
            Object.assign({
                image: game.texture,
                region : "coin.png"
            }, settings)
        ]);
        this.settings = settings;

        this.body = new me.Body(this, new me.Ellipse(this.width / 2, this.height / 2, this.width, this.height));
        this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;

        this.anchorPoint.set(.1, -0);
    },

    // player touch
    onCollision : function (/*response*/) {

        // do something when collide
        me.audio.play("cling", false);

        // subtract health
        game.data.health += 5;
        document.querySelector('#health').textContent = game.data.health;

        // display item name
        game.data.zeugma = 'Health Potion'
        document.querySelector('#zeugma').textContent = game.data.zeugma;

        // delete object
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.game.world.removeChild(this);

        return false;
    }
});