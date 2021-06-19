game.CoinEntity = me.Sprite.extend({
    
    init: function (x, y, settings) {
        this._super(me.Sprite, "init", [
            x, y ,
            Object.assign({
                image: game.texture,
                region : "coin.png"
            }, settings)
        ]);

        this.body = new me.Body(this, new me.Ellipse(this.width / 2, this.height / 2, this.width, this.height));
        this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;

        this.anchorPoint.set(.1, .4);
    },

    // player touch
    onCollision : function (/*response*/) {

        // do something when collide
        me.audio.play("cling", false);
        // give some score
        game.data.score += 5;

        // delete object
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);

        me.game.world.removeChild(this);

        return false;
    }
});