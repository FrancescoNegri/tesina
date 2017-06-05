const initBackground = (_this) => {
    _this.bg = {};
    _this.bg.layer1 = _this.game.add.tileSprite(0, 0, 1024, 576, 'bg_layer1');
    _this.bg.layer1.fixedToCamera = true;
    _this.bg.layer1.scale = { x: 3, y: 3 };
    _this.bg.layer2 = _this.game.add.tileSprite(0, 0, 1024, 576, 'bg_layer2');
    _this.bg.layer2.fixedToCamera = true;
    _this.bg.layer2.scale = { x: 3, y: 3 };
    _this.bg.layer3 = _this.game.add.tileSprite(0, 0, 1024, 576, 'bg_layer3');
    _this.bg.layer3.fixedToCamera = true;
    _this.bg.layer3.scale = { x: 3, y: 3 };
    _this.bg.layer4 = _this.game.add.tileSprite(0, 0, 1024, 576, 'bg_layer4');
    _this.bg.layer4.fixedToCamera = true;
    _this.bg.layer4.scale = { x: 3, y: 3 };
    _this.bg.layer5 = _this.game.add.tileSprite(0, 0, 1024, 576, 'bg_layer5');
    _this.bg.layer5.fixedToCamera = true;
    _this.bg.layer5.scale = { x: 3, y: 3 };
}

const handleBackgroundParallax = (_this) => {
    _this.bg.layer2.tilePosition.x = _this.bg.layer1.x * -0.05;
    _this.bg.layer3.tilePosition.x = _this.bg.layer1.x * -0.1;
    _this.bg.layer4.tilePosition.x = _this.bg.layer1.x * -0.15;
    _this.bg.layer5.tilePosition.x = _this.bg.layer1.x * -0.2;
}

var playCutscene = false;