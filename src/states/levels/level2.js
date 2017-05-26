var level2State = {
    create: function () {
        //BACKGROUND
        initBackground(this);

        //MAP
        this.map = this.game.add.tilemap('level2');
        this.map.addTilesetImage('tileset', /*il file .png */'tileset');

        this.backgroundLayer = this.map.createLayer('BackgroundLayer');
        this.groundLayer = this.map.createLayer('GroundLayer');
        this.map.setCollisionBetween(1, 1000, true, 'GroundLayer');
        this.game.physics.arcade.enable(this.groundLayer);
        this.groundLayer.resizeWorld();

        //SPRITES
        this.chests = game.add.group();
        this.chests.enableBody = true;
        this.map.createFromObjects('Chests', 51, 'chest', 0, true, false, this.chests, Chest);

        this.player = new Player(game, 64, 100);
    },

    render: function () {
        if (debugMode) {
            game.debug.bodyInfo(this.player, 64, 10);
            game.debug.body(this.player, 'rgba(255,0,0,0.5)');
            this.chests.forEach((chest) => { game.debug.body(chest, 'rgba(255,0,0,0.5)') });
        }
    },

    update: function () {
        handleBackgroundParallax(this);
        game.physics.arcade.collide(this.player, this.groundLayer);
        game.physics.arcade.collide(this.chests, this.groundLayer);
        game.physics.arcade.overlap(this.chests, this.player, (_player, _chest) => {
            _chest.openAction(this, _player);
        });

    }
}