SchillersBook = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'book');

    this.scalingFactor = 3;
    this.scale.setTo(this.scalingFactor, this.scalingFactor);
    this.enable = true;

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 0;
    this.immovable = true;

    var bodyDims = { width: this.body.width / this.scalingFactor, height: this.body.height / this.scalingFactor - 4 };
    var bodyScalingFactor = { x: 5, y: 1 };
    this.body.setSize(bodyDims.width * bodyScalingFactor.x, bodyDims.height * bodyScalingFactor.y, (bodyDims.width - (bodyDims.width * bodyScalingFactor.x)) / 2, bodyDims.height - (bodyDims.height * bodyScalingFactor.y));

    this.closed = true;

    game.add.existing(this);
};

SchillersBook.prototype = Object.create(Phaser.Sprite.prototype);
SchillersBook.prototype.constructor = SchillersBook;

SchillersBook.prototype.update = function () {
};

SchillersBook.prototype.startCutscene = function (_this) {
    if (this.enable) {
        this.enable = false;
        let _schillersBook = this;
        let _player = _this.player;

        _player.enable = false;
        _player.onCutscene = true;
        _player.body.velocity.x = 0;
        _player.scale.x = 1 * _player.scalingFactor;
        let wooSound = game.add.audio('woo');
        wooSound.play();
        game.time.events.add(Phaser.Timer.SECOND * 0, () => {
            let approachBookTween = this.game.add.tween(_player);
            approachBookTween.to({ x: _schillersBook.x - .5 * tileSize }, 500, null, true)
            approachBookTween.onUpdateCallback(function () {
                _player.animations.play('walk');
            }, _player);
            approachBookTween.onComplete.addOnce(function () {
                _player.onCutscene = false;
                _player.body.velocity.x = 0;

                new SpeechBox(game, _player, 'E questo che diavolo è? Un libro!? \nCosa ci farà un vecchio volume polversoso nel bel mezzo della giungla!?', true, () => {
                    new SpeechBox(game, _player, 'Proviamo a vedere di cosa si tratta...', true, () => {
                        _schillersBook.kill();
                        let successSound = game.add.audio('success');
                        successSound.play();
                        new SpeechBox(game, _player, "Complimenti! Hai raccolto il LIBRO MISTERIOSO!", false, () => {
                            new SpeechBox(game, _player, "Sulla copertina c'è scritto Callia (o della bellezza), di F. Schiller. \nChissà di cosa parla...", true, () => {
                                new SpeechBox(game, _player, "All'interno si vede una frase annotata che dice...\n'L'UOMO É VERAMENTE UOMO SOLO QUANDO GIOCA'", true, () => {
                                    new SpeechBox(game, _player, "Chissà cosa significa....\nMeglio andare comunque, ho pur sempre un tesoro da trovare!", true, () => {
                                        _player.enable = true;
                                        _player.onCutscene = false;
                                    })
                                })
                            })
                        })
                    });
                });
            });
            approachBookTween.start();
        }, this);
    }
}