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
    this.callback = callback;

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
        this.gamepad = { active: false };
        //Settare un tempo minimo e poi un tempo bonus dipendente dalla lunghezza --> eventualmente premere tasto per procedere
        game.time.events.add(Phaser.Timer.SECOND * 2, () => {
            this.killSpeechBox(this.callback);
        }, this)
    }
    else {
        this.speaker.enable = false;
        this.speaker.body.velocity.x = 0;
        this.blockingButton = game.add.sprite(0, 0, 'xbox-buttons');
        this.image.addChild(this.blockingButton);
        this.blockingButtonOffset = 4;
        this.blockingButton.anchor.setTo(1, 1);
        this.blockingButton.x = this.box.width - this.blockingButtonOffset;
        this.blockingButton.y = this.box.height - this.blockingButtonOffset;
        this.blockingButton.frame = 0;

        this.gamepad = { enable: false, active: true };
        this.initGamepad();

        let blockingKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        blockingKey.onDown.addOnce(() => {
            this.keyPressed();
        });
    }
};

SpeechBox.prototype = Object.create(Phaser.Sprite.prototype);
SpeechBox.prototype.constructor = SpeechBox;

SpeechBox.prototype.update = function () {
    this.speakerIndicator.x = this.speaker.x - this.speakerIndicator.width / 2;
    this.speakerIndicator.y = this.speaker.y - this.speakerIndicator.height / 4;

    if (this.gamepad.active) {
        this.checkForGamepad();
    }
};

SpeechBox.prototype.keyPressed = function () {
    game.add.audio('click').play();
    this.killSpeechBox(this.callback);
    if (!this.hasCallback) this.speaker.enable = true;
}

SpeechBox.prototype.killSpeechBox = function (callback) {
    this.image.kill();
    game.time.events.add(Phaser.Timer.SECOND * 0.1, () => {
        this.speakerIndicator.kill();
        callback();
        this.kill();
    });
}

//GAMEPAD
SpeechBox.prototype.initGamepad = function () {

    this.gamepad.pad1 = game.input.gamepad.pad1;
}
SpeechBox.prototype.checkForGamepad = function () {
    try {
        if (game.input.gamepad.supported && game.input.gamepad.active && this.gamepad.pad1.connected) {
            this.gamepad.enable = true;
            this.updateGamepad();
        }

        else {
            this.gamepad.enable = false;
        }
    }
    catch (error) {
        console.log(error);
    }
}
SpeechBox.prototype.updateGamepad = function () {
    //BUTTONS
    if (this.gamepad.pad1.justReleased(Phaser.Gamepad.XBOX360_A, 50)) {
        this.gamepad = { active: false };
        this.keyPressed();
    }
}