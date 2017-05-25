var playState = {
    create: function () {
        //game.stage.backgroundColor = '#5c94fc';

        //BACKGROUND
        this.bg = {};
        this.bg.layer1 = this.game.add.tileSprite(0, 0, 1024, 576, 'bg_layer1');
        this.bg.layer1.fixedToCamera = true;
        this.bg.layer1.scale = {x: 3, y: 3};
        this.bg.layer2 = this.game.add.tileSprite(0, 0, 1024, 576, 'bg_layer2');
        this.bg.layer2.fixedToCamera = true;
        this.bg.layer2.scale = {x: 3, y: 3};
        this.bg.layer3 = this.game.add.tileSprite(0, 0, 1024, 576, 'bg_layer3');
        this.bg.layer3.fixedToCamera = true;
        this.bg.layer3.scale = {x: 3, y: 3};
        this.bg.layer4 = this.game.add.tileSprite(0, 0, 1024, 576, 'bg_layer4');
        this.bg.layer4.fixedToCamera = true;
        this.bg.layer4.scale = {x: 3, y: 3};
        this.bg.layer5 = this.game.add.tileSprite(0, 0, 1024, 576, 'bg_layer5');
        this.bg.layer5.fixedToCamera = true;
        this.bg.layer5.scale = {x: 3, y: 3};

        //MAP
        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('tileset', 'tiles')

        this.backgroundLayer = this.map.createLayer('BackgroundLayer');
        this.groundLayer = this.map.createLayer('GroundLayer');
        this.map.setCollisionBetween(1, 1000, true, 'GroundLayer');
        game.physics.arcade.enable(this.groundLayer);
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
        this.bg.layer2.tilePosition.x = this.bg.layer1.x * -0.05;
        this.bg.layer3.tilePosition.x = this.bg.layer1.x * -0.1;
        this.bg.layer4.tilePosition.x = this.bg.layer1.x * -0.15;
        this.bg.layer5.tilePosition.x = this.bg.layer1.x * -0.2;

        game.physics.arcade.collide(this.player, this.groundLayer);
        //game.physics.arcade.collide(this.chest1, this.groundLayer, () => { this.chest1.body.moves = false; this.chest1.body.enabled = false;});
        //game.physics.arcade.collide(this.chest1, this.player, () => { /*game.state.start('test')*/ });
        game.physics.arcade.collide(this.chests, this.groundLayer);
        game.physics.arcade.overlap(this.chests, this.player, (_player, _chest) => {
            _chest.openAction(this, _player);
        });

    }
}