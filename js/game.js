var game = {
    //global data
    data : {
        // score
        score : 0,
        stress : 'VERY HIGH'
    },

    //Initialize the application
    onload: function() {

        // init the video
        if (!me.video.init(800, 600, {parent : "screen", scaleMethod : "flex-width", renderer : me.video.AUTO, preferWebGL1 : false, subPixel : false })) {
            alert("Your browser does not support HTML5 canvas.")
            return
        }

        // initialize the "sound engine"
        me.audio.init("mp3,ogg")

        // set all ressources to be loaded
        me.loader.preload(game.resources, this.loaded.bind(this))
    },


    //callback when everything is loaded
    loaded: function ()    {

        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new game.PlayScreen())
        /*me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.GAME_END, new game.EndTitleScreen());*/

        // set the fade transition effect
        me.state.transition("fade", "#FFFFFF", 250)

        // register our objects entity in the object pool
        me.pool.register("mainPlayer", game.PlayerEntity)
        me.pool.register("SlimeEntity", game.SlimeEnemyEntity)
        me.pool.register("FlyEntity", game.FlyEnemyEntity)
        me.pool.register("CoinEntity", game.CoinEntity)

        // load the texture atlas file
        // this will be used by object entities later
        game.texture = new me.video.renderer.Texture(
            me.loader.getJSON("texture"),
            me.loader.getImage("texture")
        )

        // switch to PLAY state
        me.state.change(me.state.PLAY)
    }
}