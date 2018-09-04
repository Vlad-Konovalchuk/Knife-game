import 'p2';
import 'pixi';
import 'phaser';
import Menu from './scenes/Menu';
import Play from './scenes/Play';
import Settings from './scenes/Settings';
import Leaders from './scenes/Leaders';
import Weapons from './scenes/Weapons';
import userData from './User'
let user = null;
class Game extends Phaser.Game {
    constructor() {
        const width = 700;
        const height = 1100;
        const config = {
            height,
            width,
            backgroundColor: '#000',
            type: Phaser.CANVAS
        }
        super(config)
        //   this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE ,
        //   this.scale.pageAlignHorizontally = true,
        //   this.scale.pageAlignVertically = true,
        this.state.add('Menu', Menu);
        this.state.add('Play', Play);
        this.state.add('Settings', Settings);
        this.state.add('Leaders', Leaders);
        this.state.add('Weapons', Weapons);

        this.state.start('Menu');
    }

}

class User {
    constructor(userInstant) {
        this.playerName = userInstant.player.getName();
        this.playerPic = userInstant.player.getPhoto();
        this.friends = userInstant.player.getConnectedPlayersAsync()
    }
    show() {
        console.log('al list', this.friends);
        console.log('q', this.friends._value);

    }

}


async function getFB() {
    try {
        await FBInstant.initializeAsync()
        FBInstant.startGameAsync().then(function () {
            console.log('Game Start');
            user = new User(FBInstant);
            new Game()
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    user
};


getFB()