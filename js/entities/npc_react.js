
game.NPCReactEntity = me.Entity.extend({
    init: function (x, y, settings) {

        this._super(me.Entity, "init", [x, y , settings]);

        this.body.gravityScale = 0;
        this.walkLeft = false;
        this.alwaysUpdate = false;
    },

    onCollision : function () {
        let text = document.querySelector('#text-container');
        text.textContent = game.data.messages[game.data.messageNum];

        let speechBox = document.querySelector('#speech-container');
        speechBox.classList.add('fadeIn');
        speechBox.classList.remove('fadeOut');

        var self = this;
        me.game.world.removeChild(self);
        
        game.data.messageNum++;

        return false;
    }

});