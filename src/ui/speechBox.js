SpeechBox = function (game, speaker, text, callback) {
    this.box = {}
    this.box.offset = 5;
    this.box.width = game.width - this.box.offset * 2;
    this.box.height = 100;
    Phaser.Sprite.call(this, game, 0, game.world.height - this.box.height);


    this.image = new Phaser.NinePatchImage(game, 0 + this.box.offset, game.height - (this.box.height + this.box.offset), 'blue_button02');
    this.image.targetWidth = this.box.width;
    this.image.targetHeight = this.box.height;
    this.image.fixedToCamera = true;

    //Elaborare il test --> se > 75 caratteri trova spazi e manda a capo!
    if (text.length > 75) {
        console.log('lungo');
        text = [text.slice(0, 75), '\n', text.slice(75)].join('');
    }

    //TODO: cambiare gemma indicatore con fumetto

    this.textOffest = 5;
    this.text = game.add.text(0 + this.textOffest, 0 + this.textOffest, text, { font: "24px Arial" });
    this.image.addChild(this.text);
    game.add.existing(this);

    this.speaker = speaker;
    this.speakerIndicator = game.add.sprite(0, 200, 'speaker-indicator');
    this.speakerIndicator.scale.setTo(1.5, 1.5);

    //Settare un tempo minimo e poi un tempo bonus dipendente dalla lunghezza --> eventualmente premere tasto per procedere
    game.time.events.add(Phaser.Timer.SECOND * 5, () => {
        this.killSpeechBox(callback);
    }, this)
};

SpeechBox.prototype = Object.create(Phaser.Sprite.prototype);
SpeechBox.prototype.constructor = SpeechBox;

SpeechBox.prototype.update = function () {
    this.speakerIndicator.x = this.speaker.x - this.speakerIndicator.width / 2;
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