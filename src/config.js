const scaleIndex = 3.5;
const tileSize = 64;
const debugMode = false;
const fullScreen = true;
const audioFlag = true;
var playCutscene = true;

const goFullScreen = () => {
    if (!game.scale.isFullScreen) {
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        if (fullScreen) game.scale.startFullScreen(false);
    }
    else {
        game.scale.stopFullScreen();
    }
}