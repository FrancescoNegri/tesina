ASFASign = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'asfa-sign');

    this.scalingFactor = 2.5;
    this.scale.setTo(this.scalingFactor, this.scalingFactor);
    this.enable = true;

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 0;
    this.immovable = true;

    var bodyDims = { width: this.body.width / this.scalingFactor, height: this.body.height / this.scalingFactor - 4 };
    var bodyScalingFactor = { x: 0.1, y: 1.2 };
    this.body.setSize(bodyDims.width * bodyScalingFactor.x, bodyDims.height * bodyScalingFactor.y, (bodyDims.width - (bodyDims.width * bodyScalingFactor.x)) / 2, bodyDims.height - (bodyDims.height * bodyScalingFactor.y));

    this.closed = true;

    game.add.existing(this);
};

ASFASign.prototype = Object.create(Phaser.Sprite.prototype);
ASFASign.prototype.constructor = ASFASign;

ASFASign.prototype.update = function () {
};

ASFASign.prototype.startCutscene = function (_this) {
    if (this.enable) {
        this.enable = false;
        let _asfaSign = this;
        let _player = _this.player;

        _player.enable = false;
        _player.onCutscene = true;
        _player.body.velocity.x = 0;
        _player.scale.x = 1 * _player.scalingFactor;
        let wooSound = game.add.audio('woo');
        wooSound.play();
        game.time.events.add(Phaser.Timer.SECOND * 0, () => {
            let examineSignTween = this.game.add.tween(_player);
            examineSignTween.to({ x: _player.x }, 100, null, true);
            examineSignTween.onUpdateCallback(function () {
                _player.animations.play('idle');
            }, _player);
            examineSignTween.onComplete.addOnce(function () {
                _player.onCutscene = false;
                _player.body.velocity.x = 0;
                _player.body.velocity.y = -200;

                new SpeechBox(game, _player, 'Chi mai metterebbe un manifesto del genere in un giungla?! \nMhmhm...pare si tratti della American Society for Aesthetics.', true, () => {
                    new SpeechBox(game, _player, 'Deve trattarsi di gente molto strana...è un invito ad un dibattito sul rapporto tra videogiochi ed arte.', true, () => {
                        new SpeechBox(game, _player, "Meglio staccare questo manifesto e metterlo nello zaino. \nPrima o poi potrebbe tornarmi utile!", true, () => {
                            _asfaSign.frame = 1;
                            let successSound = game.add.audio('success');
                            successSound.play();
                            new SpeechBox(game, _player, "Complimenti! Hai ottenuto MANIFESTO APPESO!", false, () => {
                                new SpeechBox(game, _player, "Certo che di cose strane se ne incontrano in questo posto...\nQualcosa, però, mi dice che il peggio deve ancora arrivare...Meglio muoversi!", true, () => {
                                    _player.enable = true;
                                    _player.onCutscene = false;
                                })
                            })
                        })
                    });
                });
            });
            examineSignTween.start();
        }, this);
    }
}