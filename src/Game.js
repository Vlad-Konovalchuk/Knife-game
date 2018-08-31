import 'p2';
import 'pixi';
import 'phaser';
import Menu from './scenes/Menu';
import Play from './scenes/Play';

  class Game extends Phaser.Game{
      constructor(){
          const width = '100%';
          const height = '100%';
          const config = {
              height,
              width,
              backgroundColor:'#00ff00',
              type:Phaser.CANVAS
          }
          super('100%','100%',Phaser.AUTO)
        //   this.input.addPointer()
          this.state.add('Menu',Menu);
          this.state.add('Play',Play)
          this.state.start('Menu')
      }
  }
  new Game ()