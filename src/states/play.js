var playState = {
    create: function () {
        game.stage.backgroundColor = '#5c94fc';

        //MAP
        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('tileset', 'tiles')

        this.backgroundLayer = this.map.createLayer('BackgroundLayer');
        this.groundLayer = this.map.createLayer('GroundLayer');
        this.map.setCollisionBetween(1, 64, true, 'GroundLayer');
        game.physics.arcade.enable(this.groundLayer);
        this.groundLayer.resizeWorld();

        //SPRITES

        this.chests = game.add.group();
        this.chests.enableBody = true;
        this.map.createFromObjects('Chests', 51, 'chest', 0, true, false, this.chests, Chest);

        this.player = new Player(game, 64, 380);
    },

    render: function () {
        if (debugMode) {
            game.debug.bodyInfo(this.player, 10, 10);
            game.debug.body(this.player, 'rgba(255,0,0,0.5)');
            this.chests.forEach((chest) => { game.debug.body(chest, 'rgba(255,0,0,0.5)') });
        }
    },

    update: function () {
        game.physics.arcade.collide(this.player, this.groundLayer);
        //game.physics.arcade.collide(this.chest1, this.groundLayer, () => { this.chest1.body.moves = false; this.chest1.body.enabled = false;});
        //game.physics.arcade.collide(this.chest1, this.player, () => { /*game.state.start('test')*/ });
        game.physics.arcade.collide(this.chests, this.groundLayer);
        game.physics.arcade.overlap(this.chests, this.player, (_player, _chest) => {
            _chest.openAction(this, _player);
        });

    }
}