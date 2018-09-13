import { UserWeapon } from "./UserWeapon";
import level from "../../assets/level.json";
import coin from "../../assets/apple.png";
import button from "../../assets/pauseB.png";
import { user } from "../Game";
import { targets } from "./UserWeapon";

let playerScore = {
  bestScore: 0
};
let style = {
  fontWeight: "bold",
  fill: "#fff"
};
let coins;
let legalHit;
let currentLevel;
getUserData();

export default class Play extends Phaser.State {
  preload() {
    getUserData();
    // Array of targets
    this.enemyGroup = [
      targets.wooden,
      targets.bear,
      targets.celts,
      targets.north
    ];
    this.enemy = null;
    this.levelGroup;
    this.levelData;
    // Set Level Settings
    this.levelGroup = [level.level1, level.level2, level.level3, level.level4];
    this.levelData = this.levelGroup[+currentLevel];
    // Get the current enemy
    this.enemy = Object.assign(this.enemyGroup[currentLevel]);
    console.log(this.enemy);
    // loading assets
    this.load.image("pause", button);
    this.load.image("target", this.enemy.viewPath);
    this.load.image(
      "weapon",
      UserWeapon.knife !== undefined
        ? UserWeapon.knife
        : "../../assets/knife3.png"
    );
    this.load.spritesheet("coin", coin, 70, 96);
    // this.coins = coins;
    this.coins = coins;
  }
  create() {
    getUserData();
    console.log(this.coins);
    // Set Scale MAnager for responsive
    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    // Set initial score
    this.score = 0;
    // this.coins = 0;

    // Set score text
    this.scoreText = this.add.text(
      this.world.centerX - 250,
      45,
      `Score: ${this.score}`,
      style
    );
    this.scoreText.anchor.setTo(0.5);

    this.restartBtn = this.add.text(this.world.centerX, 45, `Restart`, style);

    this.restartBtn.anchor.setTo(0.5);
    this.restartBtn.inputEnabled = true;
    this.restartBtn.events.onInputDown.add(() => {
      this.cache.destroy();
      document.location.reload(true);
    }, this);

    // Set coins text
    this.coinsText = this.add.text(
      this.world.centerX + 250,
      45,
      `Coins: ${this.coins}`,
      style
    );
    this.coinsText.anchor.setTo(0.5);

    // Set the pause button
    this.pauseBtn = this.add.text(
      this.world.centerX - 250,
      this.world.centerY + 450,
      "Pause",
      style
    );
    this.pauseBtn.anchor.setTo(0.5);
    this.pauseBtn.inputEnabled = true;
    this.pauseBtn.events.onInputDown.add(this.pauseGame, this);

    // Set the exit button
    this.exitBtn = this.add.text(
      this.world.centerX + 250,
      this.world.centerY + 450,
      "Exit",
      style
    );
    this.exitBtn.anchor.setTo(0.5);
    this.exitBtn.inputEnabled = true;
    this.exitBtn.events.onInputDown.add(this.exit, this);

    // group to store all rotating knives
    this.knifeGroup = this.add.group();

    // adding the knife
    this.knife = this.add.sprite(
      this.world.width / 2,
      (this.world.height / 5) * 4,
      "weapon"
    );
    this.knife.anchor.setTo(0.5, 0.5);
    this.knife.scale.setTo(0.5);

    //Set target settings
    this.target = this.add.sprite(this.world.width / 2, 300, "target");
    this.target.anchor.setTo(0.5, 0.5);
    this.target.scale.setTo(0.7);
    // Set health of target
    this.target.health = this.enemy.health;
    console.log(this.target.health);
    // Set health score text
    this.health = this.add.text(
      this.world.centerX + 250,
      70,
      `Health:${this.target.health}`,
      style
    );
    this.health.anchor.setTo(0.5);

    // moving the target on front
    this.target.depth = 1;
    this.target.bringToTop();

    // Create apple on target
    this.createCoin();
    // Create btn for resume game from pause
    this.resumeGame = this.add.button(
      this.game.world.centerX,
      this.game.world.centerY,
      "pause",
      this.pauseGame,
      this
    );
    this.resumeGame.anchor.setTo(0.5);
    this.resumeGame.visible = false;
    this.resumeGame.bringToTop();

    // at the beginning of the game, both current rotation speed and new rotation speed are set to default rotation speed
    this.currentRotationSpeed = +this.levelData.rotationSpeed;
    this.newRotationSpeed = +this.levelData.rotationSpeed;

    // can the player throw a knife? Yes, at the beginning of the game
    this.canThrow = true;
  }
  checkHealth() {
    console.log("CurrentLevel", currentLevel);
    // this is not a legal hit
    this.enemy.resetHealth();
    // Check size of level
    currentLevel < 3 ? currentLevel++ : (currentLevel = 0);
    console.log("You win this level");
    console.log("CurrentLevel", currentLevel);

    // Restart Game
    this.switchNextLevel();
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
    if (this.target.health <= 0) {
      this.checkHealth();
    }
  }

  fbSaveData() {
    FBInstant.player
      .setDataAsync({
        // enemy: enemyCounter,
        currentLevel: currentLevel,
        current: this.score,
        best: Math.max(playerScore.bestScore, this.score),
        coins: this.coins
      })
      .then(function() {
        console.log("data is set");
      });
  }
  setLeaderBoardScore() {
    FBInstant.getLeaderboardAsync("leaders")
      .then(leaderboard => {
        console.log(leaderboard.getName());
        return leaderboard.setScoreAsync(
          Math.max(playerScore.bestScore, this.score),
          `{knife: "elf", level: ${currentLevel}}`
        );
      })
      .then(() => console.log("Score saved"))
      .catch(error => console.error(error));
  }
  getLeaderBoardScore() {
    FBInstant.getLeaderboardAsync("leaders")
      .then(leaderboard => leaderboard.getEntriesAsync(10, 0))
      .then(entries => {
        console.log("TOP SCORES");
        console.log('All entries', entries);
        for (var i = 0; i < entries.length; i++) {
          console.log(
            "#" +
              entries[i].getRank() +
              " " +
              entries[i].getPlayer().getName() +
              ": " +
              entries[i].getScore()
          );
        }
      })
      .catch(error => console.error(error));
  }
  // Function for exit to main menu
  exit() {
    this.setLeaderBoardScore();
    this.getLeaderBoardScore();
    this.fbSaveData();
    user.getActualScore();
    this.state.start("Menu");
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
  switchNextLevel() {
    console.log("Start next level");
    console.log("CurrentLevel", currentLevel);
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
      this.fbSaveData();
      this.state.start("Play", true, false);
    }, this);
    knifeTweenElse.start();
  }
  shareFriends() {
    FBInstant.shareAsync({
      intent: "REQUEST",
      image: "myBase64Picture",
      text: "Hey I'm stuck on this target! Can you help me?",
      data: { myReplayData: "..." }
    });
  }
  checkHitCoin() {
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
      this.coins += 5;
      this.coinsText.setText(`Coins: ${this.coins}`);
      this.coin.destroy();
      FBInstant.player
        .setDataAsync({
          coins: this.coins
        })
        .then(function() {
          console.log("Coins are save");
        });
    }
  }
  gameOverMenu() {
    this.game.paused = true;
    this.resumeGame = null;
    const textStyle = {
      font: "bold 30px Arial",
      fill: "#ffffff",
      align: "center",
      boundsAlignH: "center", // bounds center align horizontally
      boundsAlignV: "middle" // bounds center align vertically
    };
    const text = `
      Game Over
      Share with friends and continue game 
    `;
    this.graphics = this.add.graphics(0, 0);

    this.menuText = this.add.text(0, 0, text, textStyle);
    this.menuText.anchor.setTo(0.5);
    this.shareText = this.add.text(0, 0, "Share", textStyle);
    this.shareText.inputEnabled = true;
    this.shareText.events.onInputDown.add(() => {
      FBInstant.shareAsync({
        intent: "REQUEST",
        image: "user",
        text: "Hey I'm stuck on this target! Can you help me?",
        data: { myReplayData: "msg" }
      }).then(() => {
        console.log("Success share");
        this.resumeGame = true;
        this.checkStatusContinue();
      });
    }, this);
    this.shareText.anchor.setTo(0.5);

    this.restartGame = this.add.text(0, 0, "Restart", textStyle);
    this.restartGame.inputEnabled = true;
    this.restartGame.events.onInputDown.add(() => {
      this.fbSaveData();
      this.resumeGame = false;
      this.checkStatusContinue();
    }, this);
    this.restartGame.anchor.setTo(0.5);

    this.exitText = this.add.text(0, 0, "Exit", textStyle);
    this.exitText.anchor.setTo(0.5);
    this.exitText.inputEnabled = true;
    this.exitText.events.onInputDown.add(() => {
      this.fbSaveData();
      this.exit();
    }, this);

    this.drawMenu();
  }
  drawMenu() {
    // graphics and textElement bounds/sizes must be the same
    // so your text area covers the whole rectangle
    this.graphics.lineStyle(2, 0xffffff, 1);
    this.graphics.beginFill(0xff700b, 0.5);
    this.graphics.drawRect(0, 200, 750, 750);
    this.menuText.setTextBounds(this.game.world.width / 3 + 14, 200, 750, 750);
    this.shareText.setTextBounds(this.graphics.centerX / 3 - 8, 250, 550, 750);
    this.restartGame.setTextBounds(this.graphics.centerX / 3, 330, 550, 750);
    this.exitText.setTextBounds(this.graphics.centerX / 3 - 10, 400, 750, 750);
    this.graphics.addChild(this.shareText);
    this.graphics.addChild(this.restartGame);
    this.graphics.addChild(this.menuText);
    this.graphics.addChild(this.exitText);
  }
  checkStatusContinue() {
    if (this.resumeGame == true) {
      if (this.target.health > 0) {
        this.game.paused = false;
        this.graphics.destroy(true);
        this.setNewKnife();
      } else {
        this.enemy.resetHealth();
        currentLevel = 0;
        this.state.start("Play", true, false);
      }
    } else {
      this.game.paused = false;
      this.enemy.resetHealth();
      currentLevel = 0;
      this.state.start("Play", true, false);
    }
  }
  setNewKnife() {
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
    this.enemy.hit();
    this.target.setHealth(this.target.health - 5);
    // player can now throw again
    this.canThrow = true;
    this.score++;
    //   Update text of score and health of target
    this.scoreText.setText(`Score: ${this.score}`);
    this.health.setText(`Health:${this.target.health}`);
  }
  test() {
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
        this.enemy.resetHealth();
        // this is not a legal hit
        legalHit = false;
        // no need to continue with the loop
        break;
      }
    }
  }
  // method to throw a knife
  throwKnife() {
    // at the moment, this is a legal hit
    legalHit = true;
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
        this.test();
        this.setLeaderBoardScore();
        this.getLeaderBoardScore();
        // is this a legal hit
        if (legalHit && this.enemy.health > 0) {
          // Check if player hit the coin(apple)
          this.checkHitCoin();

          // Set the new knife on screen
          this.setNewKnife();
        } else if (!legalHit) {
          // Reset the healt of previous target
          this.enemy.resetHealth();
          // Start game over menu
          this.gameOverMenu();
        } else if (!this.target.health > 0) {
          console.log("CurrentLevel", currentLevel);

          // this is not a legal hit
          this.enemy.resetHealth();
          // Check size of level
          currentLevel < 3 ? currentLevel++ : (currentLevel = 0);
          console.log("You win this level");
          console.log("CurrentLevel", currentLevel);
          // Restart Game
          this.switchNextLevel();
        }
      }, this);
      knifeThrow.start();
    }
  }
  pauseGame() {
    this.game.paused = !this.game.paused;
    if (this.game.paused) {
      this.resumeGame.visible = true;
    } else {
      this.resumeGame.visible = false;
    }
  }
}

async function getUserData() {
  try {
    let response = await FBInstant.player.getDataAsync([
      "best",
      "currentLevel",
      "current",
      "coins"
    ]);
    console.log("Response", response);
    if (response.best !== undefined && response.currentLevel !== undefined) {
      if (response.currentLevel > 3) {
        return (currentLevel = 0);
      }
      playerScore.bestScore = response.best;
      currentLevel = response.currentLevel;
      coins = response.coins !== undefined ? response.coins : 0;
    } else {
      console.log("Problems");
      currentLevel = 0;
    }
  } catch (error) {
    console.log(error);
  }
}
