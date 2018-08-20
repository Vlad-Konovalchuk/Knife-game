class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }

    // method to be executed when the scene preloads
    preload() {

    }
    create() {

        this.title = this.add.text(game.config.width / 2, game.config.height / 5 * 4, "Drop thi Knife", {
            fontFamily: 'Arial',
            fontSize: 64,
            color: '#00ff00'
        });
        console.log('Test')

    }


}