import { UserWeapon } from "./UserWeapon";
import back from "../../assets/china.png";
// import knife1 from "../../assets/knife.png";
// import knife2 from "../../assets/knife2.png";
// import knife3 from "../../assets/knife3.png";
// import knife4 from "../../assets/knife4.png";
// import knife5 from "../../assets/knife5.png";
import arrow2 from "../../assets/arrow2.png";
import coin from "../../assets/apple.png";
import { user } from "../Game";
import { targets } from "./UserWeapon";
import level from "../../assets/level.json";

let playerScore = {
  bestScore: 0
};

let style = {
  fontWeight: "bold",
  fill: "#fff"
};

let currentLevel;
let enemyCounter;
getUserData()
export default class Play extends Phaser.State {
  // method to be executed when the scene preloads
  preload() {
    // this.getUserData();
    // console.log(UserWeapon);
    // console.log(targets);
    // console.log("levels", level);
    // this.getUserData();

    this.enemyGroup = [
      targets.wooden,
      targets.bear,
      targets.celts,
      targets.north
    ];
    this.enemy = this.enemyGroup[enemyCounter||0];
    console.log("------------------------------------------------------------------");
    console.log('curent', enemyCounter);
    console.log(this.enemyGroup);
    console.log(this.enemy);
    console.log("------------------------------------------------------------------");
    // loading assets
    this.load.image("target", this.enemy.viewPath);
    this.load.image("weapon", UserWeapon.knife || "");
    this.load.image("arrow", arrow2);
    this.load.spritesheet("coin", coin, 70, 96);
  }
  create() {
    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.score = 0;
    // console.log("Start Play ");
    this.levelGroup = [level.level1, level.level2, level.level3, level.level4];
    this.levelData = this.levelGroup[+currentLevel];
    // console.log(this.levelData);

    this.target = this.add.sprite(this.world.width / 2, 300, "target");
    this.target.anchor.setTo(0.5, 0.5);
    this.target.scale.setTo(0.7);

    this.scoreText = this.add.text(
      this.world.centerX - 250,
      45,
      `Score: ${this.score}`,
      style
    );
    this.scoreText.anchor.setTo(0.5);
    this.coinsText = this.add.text(
      this.world.centerX + 250,
      45,
      `Coins: 0`,
      style
    );
    this.coinsText.anchor.setTo(0.5);


    this.health = this.add.text(
      this.world.centerX + 250,
      70,
      `Health:${this.enemy.health}`,
      style
    );
    this.health.anchor.setTo(0.5);

    this.pauseBtn = this.add.text(
      this.world.centerX - 250,
      this.world.centerY + 450,
      "Pause",
      style
    );
    this.pauseBtn.anchor.setTo(0.5);
    this.pauseBtn.inputEnabled = true;
    this.pauseBtn.events.onInputDown.add(() => {
      this.game.paused = !this.game.paused;
    }, this);

    this.exitBtn = this.add.text(
      this.world.centerX + 250,
      this.world.centerY + 450,
      "Exit",
      style
    );
    this.exitBtn.anchor.setTo(0.5);
    this.exitBtn.inputEnabled = true;
    this.exitBtn.events.onInputDown.add(this.exit, this);

    // at the beginning of the game, both current rotation speed and new rotation speed are set to default rotation speed
    this.currentRotationSpeed = +this.levelData.rotationSpeed;
    this.newRotationSpeed = +this.levelData.rotationSpeed;

    // can the player throw a knife? Yes, at the beginning of the game
    this.canThrow = true;

    // group to store all rotating knives
    this.knifeGroup = this.add.group();

    // // adding the knife
    this.knife = this.add.sprite(
      this.world.width / 2,
      (this.world.height / 5) * 4,
      "weapon"
    );
    this.knife.anchor.setTo(0.5, 0.5);
    this.knife.scale.setTo(0.5);

    // moving the target on front
    this.target.depth = 1;
    this.target.bringToTop();

    // console.log(this.world);
    // console.log(this.game);

    // this is how we create a looped timer event
    // var timedEvent = this.time.events.add({
    //     delay: +this.levelData.changeTime,
    //     callback: this.changeSpeed,
    //     callbackScope: this,
    //     loop: true
    // });
    this.createCoin();
  }

  // method to change the rotation speed of the target
  changeSpeed() {
    // ternary operator to choose from +1 and -1
    var sign = Phaser.Math.angleBetween(0, 1) == 0 ? -1 : 1;
    // random number angleBetween - +this.levelData.rotationVariation and +this.levelData.rotationVariation
    var variation = Phaser.RandomDataGenerator.between(
      -+this.levelData.rotationVariation,
      +this.levelData.rotationVariation
    );
    // new rotation speed
    this.newRotationSpeed = (this.currentRotationSpeed + variation) * sign;

    // setting new rotation speed limits
    this.newRotationSpeed = Phaser.Math.clamp(
      this.newRotationSpeed,
      -+this.levelData.maxRotationSpeed,
      +this.levelData.maxRotationSpeed
    );
  }
  // Create the coin(apple now) on the target
  createCoin() {
    var coinAngle = Phaser.Math.angleBetween(0, 360, 0, 360);
    var radians = Phaser.Math.degToRad(coinAngle - 90);

    let coinX = this.target.x + (this.target.width / 2) * Math.cos(radians);
    let coinY = this.target.y + (this.target.width / 2) * Math.sin(radians);

    this.coin = this.add.sprite(coinX, coinY, "coin");
    this.coin.scale.setTo(0.5);
    this.coin.anchor.setTo(0.5, 0.5);
    this.coin.angle = coinAngle;
    this.coin.startAngle = coinAngle;
    this.coin.depth = 2;
    this.coin.hit = false;
    this.coin.angle = coinAngle;
    // saving coin start angle
    this.coin.startAngle = coinAngle;

    // coin depth is the same as target depth
    this.coin.depth = 1;
  }
  // method to throw a knife
  throwKnife() {
    // can the player throw?
    if (this.canThrow) {
      // player can't throw anymore
      this.canThrow = false;

      let knifeThrow = this.game.add.tween(this.knife);
      knifeThrow.to(
        {
          y: this.target.y + this.target.width / 2
        },
        +this.levelData.throwSpeed * 2
      );
      knifeThrow.onComplete.add(function throwCallback(tween) {
        // at the moment, this is a legal hit
        var legalHit = true;
        // getting an array with all rotating knives
        var children = this.knifeGroup.children;

        // looping through rotating knives
        for (var i = 0; i < children.length; i++) {
          // is the knife too close to the i-th knife?
          if (
            Math.abs(
              Phaser.Math.getShortestAngle(
                this.target.angle,
                children[i].impactAngle
              )
            ) < +this.levelData.minAngle
          ) {
            // this is not a legal hit
            legalHit = false;
            // no need to continue with the loop
            break;
          }
        }
        this.enemy.hit();
          console.log("After hit the target",this.enemy.health);
          // player can now throw again
          this.canThrow = true;
          this.score++;
          //   playerScore.score.push(this.score);
          this.scoreText.setText(`Score: ${this.score}`);
          this.health.setText(`Score: ${this.enemy.health}`);

        // is this a legal hit
        if (legalHit && this.enemy.health > 0.9) {
          console.log('Go next', 'legalhit ---', legalHit);
          console.log('health---', this.enemy.health);
          console.log("COMPARE", legalHit && this.enemy.health > 0);
          
          
          
          // this.enemy.hit();
          // console.log(this.enemy.health);
          // // player can now throw again
          // this.canThrow = true;
          // this.score++;
          // //   playerScore.score.push(this.score);
          // this.scoreText.setText(`Score: ${this.score}`);
            // is the knife close enough to the coin? And the appls is still to be hit?
            if (
              Math.abs(
                Phaser.Math.getShortestAngle(
                  this.target.angle,
                  180 - this.coin.startAngle
                )
              ) < +this.levelData.minAngle &&
              !this.coin.hit
            ) {
              // coin has been hit
              this.coin.hit = true;
              this.coin.destroy();
            }

            // adding the rotating knife in the same place of the knife just landed on target
            var knife = this.add.sprite(
              this.world.width / 2,
              (this.world.height / 5) * 4,
              "weapon"
            );

            // impactAngle property saves the target angle when the knife hits the target
            knife.impactAngle = this.target.angle;

            // adding the rotating knife to knifeGroup group
            this.knifeGroup.add(knife);

            // bringing back the knife to its starting position
            this.knife.y = (this.world.height / 5) * 4;
          
        }
        // in case this is not a legal hit
        else {
          if (currentLevel < 3) {
            currentLevel++;
            enemyCounter++
          } else {
            currentLevel = 0;
            enemyCounter = 0
          }
          console.log(`Start ${this.currentLevel}  Level`);

          let knifeTweenElse = this.game.add.tween(this.knife);
          knifeTweenElse.to(
            {
              y: this.world.centerY + this.knife.height
            },
            +this.levelData.throwSpeed * 2,
            null,
            false
          );
          knifeTweenElse.onComplete.add(function(tween) {
            FBInstant.player
              .setDataAsync({
                enemy:enemyCounter,
                currentLevel: currentLevel,
                current: this.score,
                best: Math.max(playerScore.bestScore, this.score)
              })
              .then(function() {});
            // restart the game
            this.state.start("Play");
          }, this);
          knifeTweenElse.start();
        }
      }, this);
      knifeThrow.start();
    }
  }
  // method to be executed at each frame. Please notice the arguments.
  update(time) {
    if (this.game.input.activePointer.isDown) {
      this.throwKnife();
    }
    // rotating the target
    this.target.angle += this.currentRotationSpeed;
    // getting an array with all rotating knives
    var children = this.knifeGroup.children;
    // looping through rotating knives
    for (var i = 0; i < children.length; i++) {
      children[i].anchor.setTo(0.5, 0.5);
      children[i].scale.setTo(0.5);
      // rotating the knife
      children[i].angle += this.currentRotationSpeed;
      // turning knife angle in radians
      var radians = Phaser.Math.degToRad(children[i].angle + 90);
      // trigonometry to make the knife rotate around target center
      children[i].x =
        this.target.x + (this.target.width / 2) * Math.cos(radians);
      children[i].y =
        this.target.y + (this.target.width / 2) * Math.sin(radians);
    }

    // // adjusting current rotation speed using linear interpolation
    let del = 0.3;
    this.currentRotationSpeed = Phaser.Math.linear(
      this.currentRotationSpeed,
      this.newRotationSpeed,
      del
    );
    // // if the coin has not been hit...
    if (!this.coin.hit) {
      // adjusting coin rotation
      this.coin.angle += this.currentRotationSpeed;
      // turning coin angle in radians
      var radians = Phaser.Math.degToRad(this.coin.angle - 90);
      // adjusting coin position
      this.coin.x = this.target.x + (this.target.width / 2) * Math.cos(radians);
      this.coin.y = this.target.y + (this.target.width / 2) * Math.sin(radians);
    }
  }
  exit() {
    // FBInstant.player
    //   .setDataAsync({
    //     current:this.score,
    //     best: Math.max(playerScore.bestScore,this.score)
    //   })
    //   .then(function() {
    //     console.log("data is set");
    //   });
    FBInstant.player
      .setDataAsync({
        current: this.score,
        best: Math.max(playerScore.bestScore, this.score)
      })
      .then(function() {
        console.log("data is set");
      });
    user.getActualScore();
    this.state.start("Menu", true, true);
  }
  async getUserData() {
    let response = await FBInstant.player.getDataAsync([
      "best",
      "currentLevel",
      "enemy"
    ]);
    console.log("Response", response);
    if (response.best !== undefined) {
      playerScore.bestScore = response.best;
    }
    if (response.currentLevel !== undefined && currentLevel <= 3) {
      currentLevel = response.currentLevel;
      console.log("All Good", currentLevel);
    } else {
      currentLevel = 0;
      console.log("All Bad", currentLevel);
    }
    if(response.enemy <= 3 && response.enemy !== undefined){
      enemyCounter = response.enemy
      console.log("Enemy: ", response.enemy);
      
    }
    else{
      console.log('Enemy undefenid');
      enemyCounter = 0
    }
  }
}


async function  getUserData() {
  let response = await FBInstant.player.getDataAsync([
    "best",
    "currentLevel",
    "enemy"
  ]);
  console.log("Response", response);
  if (response.best !== undefined) {
    playerScore.bestScore = response.best;
  }
  if (response.currentLevel !== undefined && currentLevel <= 3) {
    currentLevel = response.currentLevel;
    console.log("All Good", currentLevel);
  } else {
    currentLevel = 0;
    console.log("All Bad", currentLevel);
  }
  if(response.enemy <= 3 && response.enemy !== undefined){
    enemyCounter = response.enemy
    console.log("Enemy: ", response.enemy);
    
  }
  else{
    console.log('Enemy undefenid');
    enemyCounter = 0
  }
  console.log(response);
  
}