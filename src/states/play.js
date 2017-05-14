var playState = {
    create: function() {
        game.stage.backgroundColor = '#5c94fc';
        this.player = new Player(game, 64, 0);

        this.player.body.setSize(31, 31);
    },

    render: function() {
        game.debug.spriteInfo(this.player, 10, 10);
        game.debug.spriteBounds(this.player);
    }
}