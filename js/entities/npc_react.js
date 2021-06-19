
game.NPCReactEntity = me.Entity.extend({
    init: function (x, y, settings) {

        this._super(me.Entity, "init", [x, y , settings]);

        this.body.gravityScale = 0;
        this.walkLeft = false;
        this.alwaysUpdate = false;

        this.body.collisionType = me.collision.types.NPC_OBJECT;
    },

    onCollision : function () {
        let text = document.querySelector('#text-container');
        text.innerHTML = game.data.messages[game.data.messageNum].message;
        
        let name = document.querySelector('#npc-name');
        name.textContent = game.data.messages[game.data.messageNum].name;

        let speechBox = document.querySelector('#speech-container');
        speechBox.classList.add('fadeIn');
        speechBox.classList.remove('fadeOut');

        var self = this;
        me.game.world.removeChild(self);
        
        game.data.messageNum++;

        return false;
    }

});