var level1State = {
    create: function () {
        //BACKGROUND
        initBackground(this);

        //MAP
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('tileset', /*il file .png */'tileset');

        this.backgroundLayer = this.map.createLayer('BackgroundLayer');

        //Cartello dietro
        this.asfaSign = new ASFASign(game, 122 * tileSize, 2.6 * tileSize);

        this.groundLayer = this.map.createLayer('GroundLayer');
        this.map.setCollisionBetween(1, 1000, true, 'GroundLayer');
        this.game.physics.arcade.enable(this.groundLayer);
        this.groundLayer.resizeWorld();

        //SPRITES
        //this.chests = game.add.group();
        // this.chests.enableBody = true;
        // this.map.createFromObjects('Chests', 498, 'chest', 0, true, false, this.chests, Chest);

        this.interactors = game.add.group();
        this.quintiliansStatue = new QuintiliansStatue(game, 36 * tileSize, 5 * tileSize);
        this.schillersBook = new SchillersBook(game, 78 * tileSize, 3.14 * tileSize);
        this.fengMengbo = new FengMengbo(game, 160 * tileSize, 3 * tileSize);
        this.chest = new Chest(game, 198 * tileSize, 1.7 * tileSize);

        this.entities = game.add.group();

        this.interactors.add(this.quintiliansStatue);
        this.interactors.add(this.schillersBook);
        this.interactors.add(this.chest);

        if (!playCutscene) this.player = new Player(game, 1 * tileSize, 0)
        else this.player = new Player(game, 290, 100);

        this.entities.add(this.fengMengbo);
        this.entities.add(this.player);
    },

    render: function () {
        if (debugMode) {
            game.debug.bodyInfo(this.player, 64, 10);
            this.entities.forEach((entity) => { game.debug.body(entity, 'rgba(255,0,0,0.5)') });
            this.interactors.forEach((interactor) => { game.debug.body(interactor, 'rgba(255,0,0,0.5)') });
            //this.chests.forEach((chest) => { game.debug.body(chest, 'rgba(255,0,0,0.5)') });
        }
    },

    update: function () {
        handleBackgroundParallax(this);
        game.physics.arcade.collide(this.entities, this.groundLayer);
        // game.physics.arcade.collide(this.chests, this.groundLayer);
        // game.physics.arcade.overlap(this.chests, this.player, (_player, _chest) => {
        //     _chest.openAction(this, _player);
        // });

        game.physics.arcade.overlap(this.player, this.interactors, (_player, _interactor) => {
            _interactor.startCutscene(this);
        })
        game.physics.arcade.overlap(this.player, this.asfaSign, (_player, _asfaSign) => {
            _asfaSign.startCutscene(this);
        })
        game.physics.arcade.overlap(this.player, this.fengMengbo, (_player, _fengMengbo) => {
            _fengMengbo.startCutscene(this);
        })

    }
}