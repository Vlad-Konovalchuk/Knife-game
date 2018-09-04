import 'p2';
import 'pixi';
import 'phaser';
import Menu from './scenes/Menu';
import Play from './scenes/Play';
import Settings from './scenes/Settings';
import Leaders from './scenes/Leaders';
import Weapons from './scenes/Weapons';

  class Game extends Phaser.Game{
      constructor(){
          const width = 700;
          const height = 1100;
          const config = {
              height,
              width,
              backgroundColor:'#000',
              type:Phaser.CANVAS
          }
          super(config)
        //   this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE ,
        //   this.scale.pageAlignHorizontally = true,
        //   this.scale.pageAlignVertically = true,
          this.state.add('Menu',Menu);
          this.state.add('Play',Play)
          this.state.add('Settings',Settings)
          this.state.add('Leaders',Leaders)
          this.state.add('Weapons',Weapons)

          this.state.start('Menu')
     

      }
  }
function startGame(){
    new Game ()
}
startGame()
