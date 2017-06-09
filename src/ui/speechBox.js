SpeechBox = function (game, speaker, isBlocking, text, callback) {
    this.box = {}
    this.box.offset = 5;
    this.box.width = game.width - this.box.offset * 2;
    this.box.height = 100;
    Phaser.Sprite.call(this, game, 0, game.world.height - this.box.height);


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
        game.time.events.add(Phaser.Timer.SECOND * 5, () => {
            this.killSpeechBox(callback);
        }, this)
    }
    else {
        let blockingKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        blockingKey.onDown.add(() => { this.killSpeechBox(callback) });
    }
};

SpeechBox.prototype = Object.create(Phaser.Sprite.prototype);
SpeechBox.prototype.constructor = SpeechBox;

SpeechBox.prototype.update = function () {
    this.speakerIndicator.x = this.speaker.x - this.speakerIndicator.width / 2;
    this.speakerIndicator.y = this.speaker.y - this.speakerIndicator.height / 4;
    /*this.anchor.setTo(0.12, 0.12);
    this.animations.play('right');
    this.x = this.speaker.x;
    this.y = this.speaker.y - this.height / 2;



    if (this.speaker.scale.x > 0) {
        this.scale.setTo(this.scalingFactor + 10, this.scalingFactor);
        this.text.x = this.x + this.text.width / 2 + 2;
        this.text.y = this.y + this.text.height / 2 + 20;
    }
    else if (this.speaker.scale.x < 0) {
        this.scale.setTo(-this.scalingFactor, this.scalingFactor);
    }*/
};

SpeechBox.prototype.killSpeechBox = function (callback) {
    this.image.kill();
    this.speakerIndicator.kill();
    callback();
}