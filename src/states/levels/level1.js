var level1State = {
    create: function () {
        //BACKGROUND
        initBackground(this);

        //MAP
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('tileset', /*il file .png */'tileset');

        this.backgroundLayer = this.map.createLayer('BackgroundLayer');
        this.groundLayer = this.map.createLayer('GroundLayer');
        this.map.setCollisionBetween(1, 1000, true, 'GroundLayer');
        this.game.physics.arcade.enable(this.groundLayer);
        this.groundLayer.resizeWorld();

        //SPRITES
        this.chests = game.add.group();
        this.chests.enableBody = true;
        this.map.createFromObjects('Chests', 498, 'chest', 0, true, false, this.chests, Chest);
        
        this.entities = game.add.group();
        this.fengMengbo = new FengMengbo(game, 73 * tileSize, 2 * tileSize);
        this.entities.add(this.fengMengbo);
        this.player = new Player(game, 290, 100);
        this.entities.add(this.player);
        
        //this.player.enable = false;
        // let prova = new SpeechBox(game, this.player, 'Wow!! Questo è un testo casuale estremamente lungo e bloccante! Wow!! Questo è un testo casuale estremamente lungo e bloccante!  Devo testare il trimming del testo per mandarlo su più righe! Speriamo funzioni come deve... (BLOCCANTE)', true, () => {
        //     let testo2 = new SpeechBox(game, this.fengMengbo, 'Ciao, presto diventerò cinese! \nSetti ci sta lavorando... (NON BLOCCANTE)', false, () => {
        //         this.player.enable = true;
        //         this.fengMengbo.kill();
        //     });
        // });
    },

    render: function () {
        if (debugMode) {
            game.debug.bodyInfo(this.player, 64, 10);
            //game.debug.spriteCoords(this.a, 64, 10);
            this.entities.forEach((entity) => { game.debug.body(entity, 'rgba(255,0,0,0.5)') });
            this.chests.forEach((chest) => { game.debug.body(chest, 'rgba(255,0,0,0.5)') });
        }
    },

    update: function () {
        handleBackgroundParallax(this);
        game.physics.arcade.collide(this.entities, this.groundLayer);
        game.physics.arcade.collide(this.chests, this.groundLayer);
        //game.physics.arcade.collide(this.entities, this.entities);
        game.physics.arcade.overlap(this.chests, this.player, (_player, _chest) => {
            _chest.openAction(this, _player);
        });

        game.physics.arcade.overlap(this.player, this.fengMengbo, () => {
            this.fengMengbo.startCutscene(this);
        })

    }
}