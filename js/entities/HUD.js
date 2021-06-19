game.HUD = game.HUD || {};

game.HUD.UIContainer = me.Container.extend({
    init: function() {
        this._super(me.Container, "init");

        this.isPersistent = true;
        this.floating = true;
        this.z = Infinity;
        this.name = "HUD";

        if (!me.device.isMobile) {
            // add fullscreen btn
            this.addChild(new game.HUD.FSControl(20, 56));
        }
    }
})