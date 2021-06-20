//DC

var game = {
    //global data
    data : {
        score : 0,
        stress : 15,
        health: 100,
        rage : 0,
        magic: 15,
        zeugma: '',
    },

    // init app
    onload: function() {
        // init video
        if (!me.video.init(800, 600, {parent : "screen", scaleMethod : "flex-width", renderer : me.video.AUTO, preferWebGL1 : false, subPixel : false })) {
            alert("Your browser does not support HTML5 canvas.")
            return
        }

        // init sound
        me.audio.init("mp3,ogg")

        me.loader.preload(game.resources, this.loaded.bind(this))
    },


    //callback when everything is loaded
    loaded: function ()    {

        // set screen objects
        me.state.set(me.state.PLAY, new game.PlayScreen())
        /*me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.GAME_END, new game.EndTitleScreen());*/

        // set fade transit
        me.state.transition("fade", "#FFFFFF", 250)

        // register our objects entity in the object pool
        me.pool.register("mainPlayer", game.PlayerEntity)
        me.pool.register("SlimeEntity", game.SlimeEnemyEntity)
        me.pool.register("FlyEntity", game.FlyEnemyEntity)
        me.pool.register("CoinEntity", game.CoinEntity)
        me.pool.register("TeethmanEntity", game.TeethmanEntity)
        me.pool.register("JoeEntity", game.JoeEntity)
        me.pool.register("NPCReactEntity", game.NPCReactEntity)

        // load texture atlas file
        // this will be used by object entities later
        game.texture = new me.video.renderer.Texture(
            me.loader.getJSON("texture"),
            me.loader.getImage("texture")
        )
        game.texture0 = new me.video.renderer.Texture(
            me.loader.getJSON("texture0"),
            me.loader.getImage("texture0")
        )

        // switch to PLAY state
        me.state.change(me.state.PLAY)
    }
}
