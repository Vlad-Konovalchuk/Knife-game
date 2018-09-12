import { user } from "../Game";

let style = {
  fontWeight: "bold",
  fill: "#fff"
};

export default class Menu extends Phaser.State {
  // method to be executed when the scene preloads
  preload() {
    this.load.crossOrigin = "anonymous";
    // this.load.image("profile", user.playerPic);
  }
  create() {
    // user.getActualScore()
    console.log(this.cache); 
    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    let title = this.add.text(
      this.world.centerX,
      this.world.centerY - 300,
      "DROP THE KNIFE",
      style
    );
    title.anchor.setTo(0.5, 0.5);
    this.userName = this.add.text(
      this.world.centerX,
      this.world.centerY - 250,
      `Welcome User`,
      style
    );
    this.userName.anchor.setTo(0.5);
    // this.userLogo = this.add.image(
    //   this.world.centerX,
    //   this.world.centerY - 190,
    //   "profile"
    // );
    // this.userLogo.anchor.set(0.5);
    // this.userLogo.width = 100;
    // this.userLogo.height = 100;

    // current score
    this.currentScore = this.add
      .text(
        this.world.centerX,
        this.world.centerY - 80,
        `Score:2`,
        style
      )
      .anchor.setTo(0.5, 0.5);
    // best score
    this.bestScore = this.add
      .text(
        this.world.centerX,
        this.world.centerY - 40,
        `BEST SCORE:10`,
        style
      )
      .anchor.setTo(0.5, 0.5);

    // Gift Text
    this.gift = this.add
      .text(this.world.centerX, this.world.centerY, "Your daily gift", style);
      this.gift.anchor.setTo(0.5, 0.5);
    console.log(this.game);
    console.log(this.game.world);
    // Leader Bord
    this.leaders = this.add.text(
      this.world.centerX,
      this.world.centerY + 40,
      "Leader Board",
      style
    );
    this.leaders.anchor.setTo(0.5, 0.5);
    this.leaders.inputEnabled = true;
    this.leaders.events.onInputDown.add(this.toLeaderBoard, this);

    // options menu
    this.options = this.add.text(
      this.world.centerX,
      this.world.centerY + 80,
      "Settings",
      style
    );
    this.options.anchor.setTo(0.5, 0.5);
    this.options.inputEnabled = true;
    this.options.events.onInputDown.add(this.toSettings, this);
      this.options.padding.set(10, 16);
    // shop menu
    this.shop = this.add.text(
      this.world.centerX,
      this.world.centerY + 120,
      "Knife Collection",
      style
    );
    this.shop.anchor.setTo(0.5, 0.5);
    this.shop.inputEnabled = true;
    this.shop.events.onInputDown.add(this.toShop, this);
    this.shop.padding.set(10, 16);
    // Button play
    this.btn = this.add.text(
      this.world.centerX,
      this.world.centerY + 160,
      "Play",
      style
    );
    this.btn.anchor.setTo(0.5, 0.5);
    this.btn.inputEnabled = true;
    this.btn.events.onInputDown.add(this.startGame, this);
    this.btn.padding.set(10, 16);
  }
  reset(){
    console.log('Reset------------------------------------------------');
    this.state.restart()
  }
  startGame() {
    this.state.start("Play",true,false);
  }
  toSettings() {
    this.state.start("Settings",true,false);
  }
  toShop() {
    this.state.start("Weapons",true,false);
  }
  toLeaderBoard() {
    this.state.start("Leaders",true,false);
  }
}
