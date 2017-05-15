var playState = {
    create: function() {
        game.stage.backgroundColor = '#5c94fc';
        
        //MAP
        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('tileset', 'tiles')

        this.backgroundLayer = this.map.createLayer('BackgroundLayer');
        this.groundLayer = this.map.createLayer('GroundLayer');
        this.map.setCollisionBetween(1, 64, true, 'GroundLayer');
        game.physics.arcade.enable(this.groundLayer);
        this.groundLayer.resizeWorld();

        //PLAYER
        this.player = new Player(game, 64, 0);
    },

    render: function() {
        game.debug.spriteInfo(this.player, 10, 10);
        game.debug.bodyInfo(this.player, 10, 120);
    },

    update: function() {
        game.physics.arcade.collide(this.player, this.groundLayer);
    }
}