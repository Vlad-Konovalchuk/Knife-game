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
      backgroundColor: "#000",
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

class User {
  constructor(response) {
    this.playerName = response[0];
    this.playerPic = response[1];
    this.friends = response[2].map(item => {
      return item.$1.name;
    });
    this.current = response[3].current;
    this.best = response[3].best;
  }
  async getActualScore() {
    const response = await FBInstant.player.getDataAsync(["current", "best"]);
    console.log("Actual Store", response);
    this.current = response.current;
    this.best = response.best;
  }
}

async function getFB() {
  try {
    await FBInstant.initializeAsync();
    await FBInstant.startGameAsync();
    const response = await Promise.all([
      FBInstant.player.getName(),
      FBInstant.player.getPhoto(),
      FBInstant.player.getConnectedPlayersAsync(),
      FBInstant.player.getDataAsync(["current", "best"])
    ]);

    console.log(response);
    user = new User(response);
    new Game();
  } catch (error) {
    console.log(error);
  }
}

export { user };

getFB();
