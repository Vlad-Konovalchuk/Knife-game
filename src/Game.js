import "p2";
import "pixi";
import "phaser";
import Menu from "./scenes/Menu";
import Play from "./scenes/Play";
import Settings from "./scenes/Settings";
import Leaders from "./scenes/Leaders";
import Weapons from "./scenes/Weapons";

let user = null;

class Game extends Phaser.Game {
  constructor() {
    const width = 700;
    const height = 1100;
    const config = {
      height,
      width,
      backgroundColor: "#922d20",
      type: Phaser.CANVAS
    };
    super(config);
    this.state.add("Menu", Menu);
    this.state.add("Play", Play);
    this.state.add("Settings", Settings);
    this.state.add("Leaders", Leaders);
    this.state.add("Weapons", Weapons);

    this.state.start("Menu");
  }
}



async function getFB() {
  try {
    new Game();
  } catch (error) {
    console.log(error);
  }
}

export { user };

getFB();
