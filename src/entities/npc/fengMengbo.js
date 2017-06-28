FengMengbo = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'feng-mengbo');
    this.enable = true;
    this.cutsceneFlag = false;
    this.onCutscene = false;
    this.runSpeed = 150;
    this.scalingFactor = 4;
    //this.cursors = game.input.keyboard.createCursorKeys();

    this.animations.add('idle', [0, 1, 2, 3, 4, 5, 6], 6);
    this.animations.add('walk', [7, 8, 9, 10, 11, 12, 13, 14], 12);

    this.scale.setTo(this.scalingFactor, this.scalingFactor);
    this.anchor.setTo(0.5, 0);

    this.initPlayerBody();
    this.scale.setTo(-this.scalingFactor, this.scalingFactor);

    game.add.existing(this);
};

FengMengbo.prototype = Object.create(Phaser.Sprite.prototype);
FengMengbo.prototype.constructor = FengMengbo;

FengMengbo.prototype.update = function () {
    if (this.enable) {
        this.actions('idle');
    }
    else {
        if (!this.onCutscene) this.animations.play('idle');
    }
};

//ACTIONS
FengMengbo.prototype.actions = function (action) {
    switch (action) {
        case 'walk-left':
            this.scale.setTo(-1 * this.scalingFactor, 1 * this.scalingFactor);
            this.body.velocity.x = -this.runSpeed;
            if (this.body.velocity.y == 0) this.animations.play('walk')
            else if (this.body.velocity.y > 0) this.animations.play('jump-down')
            else this.animations.play('jump-up');
            break;

        case 'walk-right':
            this.scale.setTo(1 * this.scalingFactor, 1 * this.scalingFactor);
            this.body.velocity.x = this.runSpeed;
            if (this.body.velocity.y == 0) this.animations.play('walk')
            else if (this.body.velocity.y > 0) this.animations.play('jump-down')
            else this.animations.play('jump-up');
            break;

        case 'jump':
            this.body.velocity.y = -450;
            //this.animations.play('jump');
            break;

        case 'idle':
            //this.scale.setTo(1 * this.scalingFactor, 1 * this.scalingFactor);
            this.body.velocity.x = 0;
            if (this.body.velocity.y == 0) this.animations.play('idle')
            else if (this.body.velocity.y > 0) this.animations.play('jump-down')
            else this.animations.play('jump-up');
            break;
    }
}

FengMengbo.prototype.initPlayerBody = function () {
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 700;

    var bodyDims = { width: this.body.width / this.scalingFactor, height: this.body.height / this.scalingFactor - 3 };
    var bodyScalingFactor = { x: 6, y: 0.6 };
    //this.body.setSize(bodyDims * bodyScalingFactor.x, bodyDims * bodyScalingFactor.y, (bodyDims - (bodyDims * bodyScalingFactor.x)) / 2, (bodyDims - (bodyDims * bodyScalingFactor.y)) / 2);
    this.body.setSize(bodyDims.width * bodyScalingFactor.x, bodyDims.height * bodyScalingFactor.y, (bodyDims.width - (bodyDims.width * bodyScalingFactor.x)) / 2, bodyDims.height - (bodyDims.height * bodyScalingFactor.y));

    this.enable = true;
}

FengMengbo.prototype.startCutscene = function (_this) {
    let _fengMengbo = this;
    let _player = _this.player;
    if (!this.cutsceneFlag) {
        this.cutsceneFlag = true;
        _player.onCutscene = true;
        _player.enable = false;

        let interactionTween = this.game.add.tween(_player);
        interactionTween.to({ x: this.x - 2 * tileSize }, 3 * Math.abs(_fengMengbo.x - _player.x), null, true);
        interactionTween.onUpdateCallback(function () {
            _player.animations.play('walk');
        }, _player)
        interactionTween.onComplete.addOnce(function () {
            _player.onCutscene = false;
            _player.body.velocity.x = 0;

            let wooSound = game.add.audio('woo');
            wooSound.play();

            _fengMengbo.body.velocity.y = -200;

            const CHINA_MOD = false;

            if (CHINA_MOD) {
                new SpeechBox(game, _fengMengbo, 'FeLmo! Chi esseLe tu!? Io non vedeLe mai stLanieLi in giLo da queste paLti...', true, () => {
                    new SpeechBox(game, _player, 'Sono un esploratore, come può ben vedere dal mio abbigliamento! E lei chi sarebbe invece?', true, () => {
                        new SpeechBox(game, _fengMengbo, "Mio nome è Feng Mengbo, non dice nulla? Io esseLe un famoso aLtista cinese e veniLe in questi posti isolati per ceLcaLe ispiLazione!", true, () => {
                            new SpeechBox(game, _fengMengbo, "Devi sapeLe che mia opeLa d'aLte più famosa è in città di New YoLk, in museo MOMA!\nTu, che esseLe esploLatoLe e viaggiaLe tanto, esseLe mai stato a New YoLk?", true, () => {
                                new SpeechBox(game, _player, "No, mi dispiace, la città non fa per me...\n", true, () => {
                                    new SpeechBox(game, _player, "Preferisco decisamente luoghi esotici e pieni di pericoli!\nMi è giunta voce che in questa giungla sia nascosto un tesoro, potrebbe indicarmi la strada?", true, () => {
                                        new SpeechBox(game, _fengMengbo, "CeLatamente, tu doveLe pLoseguire sempLe dLitto, ma attento a non peLdeLe! OLa io doveLe andaLe, ho avuto idea geniale peL mio nuovo capolavoLo! Addio esploLatoLe!!", true, () => {
                                            _fengMengbo.body.velocity.y = -150;
                                            let exitTween = this.game.add.tween(_fengMengbo);
                                            exitTween.to({ x: _fengMengbo.x + 10 * tileSize }, 1600, null, true);
                                            exitTween.onUpdateCallback(function () {
                                                _fengMengbo.onCutscene = true;
                                                _fengMengbo.scale.setTo(_fengMengbo.scalingFactor, _fengMengbo.scalingFactor);
                                                _fengMengbo.animations.play('walk');
                                            }, _fengMengbo);
                                            exitTween.onComplete.addOnce(() => {
                                                _fengMengbo.kill();
                                                _player.enable = true;
                                                _player.onCutscene = false;
                                            }, _fengMengbo);

                                            let fengRunSound = game.add.audio('feng-run');
                                            fengRunSound.play();

                                            exitTween.start();
                                        })
                                    })
                                })
                            })
                        });
                    });
                });
            }
            else {
                new SpeechBox(game, _fengMengbo, 'Altolà! Chi sei!? Non si vedono mai degli stranieri in giro da queste parti...', true, () => {
                    new SpeechBox(game, _player, 'Sono un esploratore, come può ben vedere dal mio abbigliamento! E lei chi sarebbe invece?', true, () => {
                        new SpeechBox(game, _fengMengbo, "Il mio nome è Feng Mengbo, non ti dice nulla? Sono un famoso artista cinese e vengo in questi posti solitari per cercare l'ispirazione!", true, () => {
                            new SpeechBox(game, _fengMengbo, "Devi sapere che una mia opera d'arte è perfino in esposizione a New York, al MOMA!\nTu, che sei un esploratore e viaggi tanto, ci sei mai stato?", true, () => {
                                new SpeechBox(game, _player, "No, mi dispiace, la città non fa per me...\n", true, () => {
                                    new SpeechBox(game, _player, "Preferisco decisamente luoghi esotici e pieni di pericoli!\nMi è giunta voce che in questa giungla sia nascosto un tesoro, potrebbe indicarmi la strada?", true, () => {
                                        new SpeechBox(game, _fengMengbo, "Certo, devi proseguire sempre dritto, attento a non perderti! Ora devo andare, ho avuto un'idea geniale per il mio nuovo capolavoro! Addio esploratore!!", true, () => {
                                            _fengMengbo.body.velocity.y = -150;
                                            let exitTween = this.game.add.tween(_fengMengbo);
                                            exitTween.to({ x: _fengMengbo.x + 10 * tileSize }, 1600, null, true);
                                            exitTween.onUpdateCallback(function () {
                                                _fengMengbo.onCutscene = true;
                                                _fengMengbo.scale.setTo(_fengMengbo.scalingFactor, _fengMengbo.scalingFactor);
                                                _fengMengbo.animations.play('walk');
                                            }, _fengMengbo);
                                            exitTween.onComplete.addOnce(() => {
                                                _fengMengbo.kill();
                                                _player.enable = true;
                                                _player.onCutscene = false;
                                            }, _fengMengbo);

                                            let fengRunSound = game.add.audio('feng-run');
                                            fengRunSound.play();

                                            exitTween.start();
                                        })
                                    })
                                })
                            })
                        });
                    });
                });
            }
        });

        interactionTween.start();
    }
}

