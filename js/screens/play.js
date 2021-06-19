// DC

game.PlayScreen = me.Stage.extend({
    onResetEvent: function() {
      // load a level
        me.levelDirector.loadLevel("map1");

        // reset the score
        game.data.score = 0;

        // add our HUD to the game world
        if (typeof this.HUD === "undefined") {
            this.HUD = new game.HUD.UIContainer();
        }
        me.game.world.addChild(this.HUD);

        // music play
        me.audio.playTrack("dst-gameforest");
        me.audio./*un*/muteAll();
    },

    onDestroyEvent: function() {

        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);

        // remove the joypad if initially added
        if (this.virtualJoypad && me.game.world.hasChild(this.virtualJoypad)) {
            me.game.world.removeChild(this.virtualJoypad);
        }

        // stop some music
        me.audio.stopTrack("dst-gameforest");
    }
});
