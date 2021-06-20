//DC

var game = {
    //global data
    data : {
        score : 0,
        stress : 'VERY HIGH',
        rage : 0,
        health: 0,
        messageNum: 0,
        messages: [
            {
                message: 'You seem to be a little too carefree today. It’s making me nervous. Don’t you remember? If you let yourself enjoy the present, you’re not going to be prepared when something horrible happens in the future. Come on, think! What are you forgetting to worry about?',
                name: 'Teethman',
            },
            {
                message: 'There’s so much you have to face today. Your roommate seems to be in a bad mood, she just has that look. It must be because of you. What about that doctor’s appointment you have to make? You know your doctor hates you. Your to-do list is 50 items long. It’s too much, it’s TOO MUCH! Just go back to sleep.',
                name: 'Teethman',
            },
            {
                message: 'Your boss gave you a suggestion at work yesterday. Let’s replay how exactly it went. Did she sound annoyed? What if her non-annoyance was fake? She’s definitely going to fire you. Or if she doesn’t, she’s just pitying you. You can’t face her anymore. Just imagine what she’s saying behind your back. You can’t be too annoying, but you can’t be cold when talking to her either. Don’t ask me if I’m crazy, YOU’RE crazy. It’s your fault I’m like this.',
                name: 'Teethman',
            },
            {
                message: '',
                name: '',
            },
        ],
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
        me.pool.register("NPCReactEntity", game.NPCReactEntity)

        // load texture atlas file
        // this will be used by object entities later
        game.texture = new me.video.renderer.Texture(
            me.loader.getJSON("texture"),
            me.loader.getImage("texture")
        )

        // switch to PLAY state
        me.state.change(me.state.PLAY)
    }
}
