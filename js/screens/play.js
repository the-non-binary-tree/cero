game.PlayScreen = me.Stage.extend({

    onResetEvent: function() {
      // load a level
        me.levelDirector.loadLevel("map1");

        // reset score
        game.data.score = 0;

        // add our HUD to the game world
        if (typeof this.HUD === "undefined") {
            this.HUD = new game.HUD.UIContainer();
        }
        me.game.world.addChild(this.HUD);

        // music play
        me.audio.playTrack("dst-gameforest");
        me.audio.unmuteAll();
    },

    onDestroyEvent: function() {

        // remove the HUD from world
        me.game.world.removeChild(this.HUD);

        // stop music
        me.audio.stopTrack("dst-gameforest");
    }
});
