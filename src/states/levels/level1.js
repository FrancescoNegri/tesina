var level1State = {
    create: function () {
        //BACKGROUND
        initBackground(this);

        //MAP
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('tileset', /*il file .png */'tileset');

        this.backgroundLayer = this.map.createLayer('BackgroundLayer');

        //Il cartello deve essere creato dietro al GroundLayer
        this.asfaSign = new ASFASign(game, 6 * tileSize, 3.5 * tileSize);

        this.groundLayer = this.map.createLayer('GroundLayer');
        this.map.setCollisionBetween(1, 1000, true, 'GroundLayer');
        this.game.physics.arcade.enable(this.groundLayer);
        this.groundLayer.resizeWorld();

        //SPRITES
        // this.chests = game.add.group();
        // this.chests.enableBody = true;
        // this.map.createFromObjects('Chests', 498, 'chest', 0, true, false, this.chests, Chest);
        
        this.schillersBook = new SchillersBook(game, 36.5 * tileSize, 7.2 * tileSize);
        this.quintiliansStatue = new QuintiliansStatue(game, 33.5 * tileSize, 0.05 * tileSize);

        this.entities = game.add.group();

        this.fengMengbo = new FengMengbo(game, 73 * tileSize, 2 * tileSize);
        this.entities.add(this.fengMengbo);

        if (!playCutscene) this.player = new Player(game, 0 * tileSize, 0)
        else this.player = new Player(game, 290, 100);
        this.entities.add(this.player);
    },

    render: function () {
        if (debugMode) {
            game.debug.bodyInfo(this.player, 64, 10);
            game.debug.body(this.schillersBook, 'rgba(255,0,0,0.5)');
            game.debug.body(this.quintiliansStatue, 'rgba(255,0,0,0.5)');
            game.debug.body(this.asfaSign, 'rgba(255,0,0,0.5)');
            this.entities.forEach((entity) => { game.debug.body(entity, 'rgba(255,0,0,0.5)') });
            this.chests.forEach((chest) => { game.debug.body(chest, 'rgba(255,0,0,0.5)') });
        }
    },

    update: function () {
        handleBackgroundParallax(this);
        game.physics.arcade.collide(this.entities, this.groundLayer);
        // game.physics.arcade.collide(this.chests, this.groundLayer);
        // game.physics.arcade.overlap(this.chests, this.player, (_player, _chest) => {
        //     _chest.openAction(this, _player);
        // });

        game.physics.arcade.overlap(this.player, this.fengMengbo, () => {
            this.fengMengbo.startCutscene(this);
        })
        game.physics.arcade.overlap(this.player, this.schillersBook, () => {
            this.schillersBook.startCutscene(this);
        })
        game.physics.arcade.overlap(this.player, this.asfaSign, () => {
            this.asfaSign.startCutscene(this);
        })
        game.physics.arcade.overlap(this.player, this.quintiliansStatue, () => {
            this.quintiliansStatue.startCutscene(this);
        })

    }
}