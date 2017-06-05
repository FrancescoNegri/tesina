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
        this.fengMengbo = new FengMengbo(game, 700, 100);
        this.entities.add(this.fengMengbo);
        this.player = new Player(game, 290, 100);
        this.entities.add(this.player);
        
        let prova = new SpeechBox(game, this.player, '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890', () => {
            let testo2 = new SpeechBox(game, this.fengMengbo, 'Ciao, presto diventerò cinese! \nSetti ci sta lavorando...', () => {});
        });
        //var image = new Phaser.NinePatchImage(game, game.width/2, game.height/2, 'blue_button02');
        //console.log(prova);
        //this.a = new SpeechBubble(game, this.player, 'Ciao');
        //this.b = new SpeechBubble(game, this.fengMengbo, 'Non pallale italiano!');
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
        game.physics.arcade.collide(this.entities, this.entities);
        game.physics.arcade.overlap(this.chests, this.player, (_player, _chest) => {
            _chest.openAction(this, _player);
        });

    }
}