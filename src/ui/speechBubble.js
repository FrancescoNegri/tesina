SpeechBubble = function (game, speaker, text) {
    Phaser.Sprite.call(this, game, 0, 0, 'speech-bubble');
    this.speaker = speaker;
    this.completeBubble = game.add.group();

    //TODO: centrare in modo corretto il fumetto sopra allo speaker e che flippi direzione come lo speaker
    //TODO: decidere dimensione carattere e lunghezza massima dopo la quale andare a capo --> deidere anche numero di righe massimo per fumetto prima di splittare il testo
    this.maxWidth = 20;
    this.maxHeight = 4;

    this.animations.add('left', [0]);
    this.animations.add('right', [1]);
    this.scalingFactor = 6;
    this.scale.setTo(this.scalingFactor + 10, this.scalingFactor);
    game.add.existing(this);
    this.text = game.add.text(0, 0, text, { font: "24px Arial" });

    this.completeBubble.add(this);
    this.completeBubble.add(this.text);
};

SpeechBubble.prototype = Object.create(Phaser.Sprite.prototype);
SpeechBubble.prototype.constructor = SpeechBubble;

SpeechBubble.prototype.update = function () {
    this.anchor.setTo(0.12, 0.12);
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
    }
};