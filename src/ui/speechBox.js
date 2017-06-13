SpeechBox = function (game, speaker, text, isBlocking, callback) {
    this.box = {}
    this.box.offset = 5;
    this.box.width = game.width - this.box.offset * 2;
    this.box.height = 100;
    Phaser.Sprite.call(this, game, 0, game.world.height - this.box.height);

    if (typeof isBlocking === "undefined") isBlocking = true;
    if (!callback) {
        callback = () => { };
        this.hasCallback = false;
    }
    else {
        this.hasCallback = true;
    }

    this.image = new Phaser.NinePatchImage(game, 0 + this.box.offset, game.height - (this.box.height + this.box.offset), 'blue_button02');
    this.image.targetWidth = this.box.width;
    this.image.targetHeight = this.box.height;
    this.image.fixedToCamera = true;

    this.textOffest = 5;
    this.text = game.add.text(0 + this.textOffest, 0 + this.textOffest, text, { font: "24px Arial" });
    this.text.wordWrap = true;
    this.text.wordWrapWidth = this.box.width;

    if (this.text.height > this.box.height) alert('DIALOGO TROPPO LUNGO! RISOLVERE!!!!! --> non posso gestirlo');

    this.image.addChild(this.text);
    game.add.existing(this);

    this.speaker = speaker;
    this.speakerIndicator = game.add.sprite(0, 200, 'speech-bubble');
    this.speakerIndicator.frame = 3;
    this.speakerIndicator.scale.setTo(2, 2);

    if (!isBlocking) {
        //Settare un tempo minimo e poi un tempo bonus dipendente dalla lunghezza --> eventualmente premere tasto per procedere
        game.time.events.add(Phaser.Timer.SECOND * 2, () => {
            this.killSpeechBox(callback);
        }, this)
    }
    else {
        this.speaker.enable = false;
        this.speaker.body.velocity.x = 0;
        this.blockingButton = game.add.sprite(0, 0, 'x-button');
        this.image.addChild(this.blockingButton);
        this.blockingButtonOffset = 4;
        this.blockingButton.anchor.setTo(1, 1);
        this.blockingButton.x = this.box.width - this.blockingButtonOffset;
        this.blockingButton.y = this.box.height - this.blockingButtonOffset;

        let blockingKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        blockingKey.onDown.addOnce(() => { 
            game.add.audio('click').play();
            this.killSpeechBox(callback);
            if (!this.hasCallback) this.speaker.enable = true;
        });
    }
};

SpeechBox.prototype = Object.create(Phaser.Sprite.prototype);
SpeechBox.prototype.constructor = SpeechBox;

SpeechBox.prototype.update = function () {
    this.speakerIndicator.x = this.speaker.x - this.speakerIndicator.width / 2;
    this.speakerIndicator.y = this.speaker.y - this.speakerIndicator.height / 4;
};

SpeechBox.prototype.killSpeechBox = function (callback) {
    this.image.kill();
    game.time.events.add(Phaser.Timer.SECOND * 0.1, () => {
        this.speakerIndicator.kill();
        callback();
    });
}