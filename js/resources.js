game.resources = [

    /* Graphics.
     * @example
     * { name: "example", type:"image", src: "data/img/example.png" },
     */
    { name: "tileset",         type:"image",   src: "data/img/tileset.png" },
    { name: "tileset1",         type:"image",   src: "data/img/tileset1.png" },
    { name: "tileset2",         type:"image",   src: "data/img/tileset2.png" },
    { name: "tileset3",         type:"image",   src: "data/img/tileset3.png" },
    { name: "white_bg",      type:"image",   src: "data/img/white_background.png" },
    { name: "clouds",          type:"image",   src: "data/img/clouds.png" },

    // Maps
    { name: "map1",            type: "tmx",    src: "data/map/map1.tmx" },
    { name: "map2",            type: "tmx",    src: "data/map/map2.tmx" },
    { name: "map3",            type: "tmx",    src: "data/map/map3.tmx" },


    // Tilesets
    { name: "tileset",         type: "tsx",    src: "data/map/tileset.json" },
    { name: "tileset1",         type: "tsx",    src: "data/map/tileset1.tsx" },
    { name: "tileset2",         type: "tsx",    src: "data/map/tileset2.tsx" },
    { name: "tileset3",         type: "tsx",    src: "data/map/tileset3.json" },


    // Background music
    { name: "ForestWalk",  type: "audio", src: "data/bgm/" },

    // Sound effects
    { name: "cling",           type: "audio",  src: "data/sfx/" },
    { name: "die",             type: "audio",  src: "data/sfx/" },
    { name: "enemykill",       type: "audio",  src: "data/sfx/" },
    { name: "jump",            type: "audio",  src: "data/sfx/" },


    //Atlases
    // texturePacker
    { name: "texture",         type: "json",   src: "data/img/texture.json" },
    { name: "texture",         type: "image",  src: "data/img/texture.png" },

    //Bitmap font
    { name: "PressStart2P", type:"image", src: "data/fnt/PressStart2P.png" },
    { name: "PressStart2P", type:"binary", src: "data/fnt/PressStart2P.fnt"}
];
