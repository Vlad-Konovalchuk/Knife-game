import back from "../../assets/china.png";
import knife1 from "../../assets/knife.png";
import knife2 from "../../assets/knife2.png";
import knife3 from "../../assets/knife3.png";
import knife4 from "../../assets/knife4.png";
import knife5 from "../../assets/knife5.png";
import item1 from "../../assets/item1.png";
import arrow2 from "../../assets/arrow2.png";
import coin from "../../assets/apple.png";
import pause from "../../assets/pause.png";

// global game options
let gameOptions = {
    // target rotation speed, in degrees per frame
    rotationSpeed: 3,

    // knife throwing duration, in milliseconds
    throwSpeed: 150,

    // minimum angle angleBetween two knives
    minAngle: 15,

    // max rotation speed variation, in degrees per frame
    rotationVariation: 2,

    // interval before next rotation speed variation, in milliseconds
    changeTime: 2000,

    // maximum rotation speed, in degrees per frame
    maxRotationSpeed: 6
};
let style = {
    fontWeight: 'bold',
    fill: '#fff'
};

export default class Play extends Phaser.State {

    // method to be executed when the scene preloads
    preload() {
        // loading assets
        this.load.image("target", item1);
        this.load.image("weapon", knife4);
        this.load.image("arrow", arrow2);
        this.load.spritesheet("coin", coin, 70, 96);
    }
    create() {
        console.log('start ');
        this.target = this.add.sprite(this.world.width / 2, 300, 'target')
        this.target.anchor.setTo(0.5, 0.5);
        this.target.scale.setTo(0.5)

        this.scoreText = this.add.text(
            10,
            10,
            `Score: 0`, style
        );
        this.coinsText = this.add.text(
            250,
            this.world.top,
            `Coins: 0`, style
        );
        // this.pauseTest = this.add.text( this.world.width / 2 + 280, (this.world.centerY / 5) * 4.5, "Pause",style)

        // this.exit = this.add.text( this.world.width / 2 - 280, (this.world.centerY / 5) * 4.5, "Exit",style)

        // at the beginning of the game, both current rotation speed and new rotation speed are set to default rotation speed
        this.currentRotationSpeed = gameOptions.rotationSpeed;
        this.newRotationSpeed = gameOptions.rotationSpeed;
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
        this.knife.scale.setTo(0.5)


        // moving the target on front
        this.target.depth = 1;

        // waiting for player input to throw a knife
        // this.input.on("pointerdown", this.throwKnife, this);
        // this.game.enabled = true;
        // this.knife.events.onDown.add( this.throwKnife, this);
        // this.game.input.onDown.add(this.throwKnife, this);
        this.world.events.onInputDown.add(this.throwKnife, this);
        // this is how we create a looped timer event
        // var timedEvent = this.time.events.add({
        //     delay: gameOptions.changeTime,
        //     callback: this.changeSpeed,
        //     callbackScope: this,
        //     loop: true
        // });
        this.createCoin();
        }
    
    // method to change the rotation speed of the target
    changeSpeed() {
        // ternary operator to choose from +1 and -1
        console.log('start1');
        var sign = Phaser.Math.angleBetween(0, 1) == 0 ? -1 : 1;
        console.log('sign:', sign);
        console.log('gameOptions.rotationVariation:', gameOptions.rotationVariation);
        // random number angleBetween -gameOptions.rotationVariation and gameOptions.rotationVariation
        var variation = Phaser.RandomDataGenerator.between(
            -gameOptions.rotationVariation,
            gameOptions.rotationVariation
        );
        console.log('variation:', variation);
        // new rotation speed
        this.newRotationSpeed = (this.currentRotationSpeed + variation) * sign;

        console.log('currentRotationSpeed0:', this.currentRotationSpeed);
        // setting new rotation speed limits
        this.newRotationSpeed = Phaser.Math.clamp(
            this.newRotationSpeed,
            -gameOptions.maxRotationSpeed,
            gameOptions.maxRotationSpeed
        );
        console.log(this.newRotationSpeed);
    }
    createCoin() {
        var coinAngle = Phaser.Math.angleBetween(0, 360, 0, 360);
        var radians = Phaser.Math.degToRad(coinAngle - 90);
        console.log('currentRotationSpeed1:', this.currentRotationSpeed);

        let coinX = this.target.x + (this.target.width / 2) * Math.cos(radians);
        let coinY = this.target.y + (this.target.width / 2) * Math.sin(radians);

        this.coin = this.add.sprite(
            coinX,
            coinY,
            "coin"
        );
        this.coin.scale.setTo(0.5);
        this.coin.anchor.setTo(0.5, 0.5);
        this.coin.angle = coinAngle;
        this.coin.startAngle = coinAngle;
        this.coin.depth = 2;
        this.coin.hit = false;
    }
    // createTimeOut() {
    //     let that = this;
    //     function randInt() {
    //       var rand = Math.random() * +that.softCurrency;
    //       rand = Math.floor(rand);
    //       return rand;
    //     }
    //     function request() {
    //         setTimeout(() => {
    //             that.createCoin();
    //         }, 60000);
    //     }
    //     request();
    // }
    // method to throw a knife
    throwKnife() {
        console.log('thrrow');
        
        // can the player throw?
        if (this.canThrow) {
            // player can't throw anymore
            this.canThrow = false;
            console.log('thrrow1');
    let knifeThrow = this.game.add.tween(this.knife)
    knifeThrow.to({y:this.target.y + this.target.width / 2}, gameOptions.throwSpeed,null,false)
    knifeThrow.onComplete(function throwCallback(tween){
            // at the moment, this is a legal hit
         var legalHit = true;
         console.log('throw2');
         
         // getting an array with all rotating knives
         var children = this.knifeGroup.children;

         // looping through rotating knives
         for (var i = 0; i < children.length; i++) {
             // is the knife too close to the i-th knife?
             if (
                 Math.abs(
                     Phaser.Math.getShortestAngle(
                      this.target.angle,
                 )
                 ) < gameOptions.minAngle
          ) {
              // this is not a legal hit
              legalHit = false;
              // this.score = scores.current;
              // this.scoreText.setText(`Score: ${this.score}`);

                 // no need to continue with the loop
                 break;
             }

         }
         // is this a legal hit
      if (legalHit) {
             // ----------------------   ---------------------------------------------------------------
             console.log(this.coin.hit);

             // console.log(Math.floor(Math.abs(Phaser.Math.getShortestAngle(this.target.angle, 190 - this.coin.startAngle))) < Math.abs(gameOptions.minAngle));

              if (
                     Math.abs(
                      Phaser.Math.getShortestAngle(
                          this.target.angle,
                          180 - this.coin.startAngle
                      )
                  ) < gameOptions.minAngle &&
                  !this.coin.hit
                 ) {
                     // console.log('In if block  - true');
                     // coin has been hit
                     this.coin.hit = !this.coin.hit;
                     this.softCurrency += 25;
                  // console.log(this.softCurrency);
                  this.coinsText.setText(`Coins: ${this.softCurrency}`);
                     // change coin frame to show one slice
                  this.coin.setFrame(1);

                  // add the other coin slice in the same coin posiiton
                  var slice = this.add.sprite(this.coin.x, this.coin.y, "coin", 1);

                  // same angle too.
                  slice.angle = this.coin.angle;

                  // and same origin
                     slice.setOrigin(0.5, 1);

                  // tween to make coin slices fall down
                //   this.tweens.add({
                //       // adding the knife to tween targets
                //       targets: [this.coin, slice],

                //       // y destination
                //       y: this.world.centerY + this.coin.height,

                //       // x destination
                //       x: {
                //           // running a function to get different x ends for each slice according to frame number
                //           getEnd: function (target, key, value) {
                //               return (
                //                   Phaser.Math.angleBetween(0, this.world.width / 2) +
                //                   (this.world.width / 2) * (target.frame.name - 1)
                //               );
                //           }
                //       },
                //       // rotation destination, in radians
                //       angle: 45,

                //       // tween duration
                //       duration: gameOptions.throwSpeed * 6,

                //       // callback scope
                //       callbackScope: this,

                //       // function to be executed once the tween has been completed
                //       onComplete: function (tween) {
                //           this.createTimeOut();
                //       }
                //   });
              }
              // ------------------------------------------------------------------------------
              // player can now throw again
              this.canThrow = true;
              this.score++;
              this.scoreText.setText(`Score: ${this.score}`);
              // adding the rotating knife in the same place of the knife just landed on target
              var knife = this.add.sprite(this.knife.x, this.knife.y, "knife");

              // impactAngle property saves the target angle when the knife hits the target
              knife.impactAngle = this.target.angle;

                 // adding the rotating knife to knifeGroup group
              this.knifeGroup.add(knife);

              // bringing back the knife to its starting position
              this.knife.y = (this.world.centerY / 5) * 4;
          }

          // in case this is not a legal hit
             else {
            //   tween to throw the knife
              this.tweens.add({
                  // adding the knife to tween targets
                  targets: [this.knife],

                  // y destination
                     y: this.world.centerY + this.knife.height,

                     // rotation destination, in radians
                     rotation: 5,

                  // tween duration
                  duration: gameOptions.throwSpeed * 4,

                  // callback scope
                     callbackScope: this,

                  // function to be executed once the tween has been completed
                  onComplete: function (tween) {
                      // restart the game
                      this.scene.start("PlayGame");
                  }
              });
          }
      }
    ,this)
   
            // tween to throw the knife
    // this.world.add.tween({
    //      // adding the knife to tween targets
    //         targets: [this.knife],

    //      // y destination
    //         y: this.target.y + this.target.width / 2,

    //         // tween duration
    //         duration: gameOptions.throwSpeed,

    //         // callback scope
    //         callbackScope: this,

    //            // function to be executed once the tween has been completed
    //         onComplete: function (tween) {
    //                // at the moment, this is a legal hit
    //             var legalHit = true;
    //             console.log('throw2');
                
    //             // getting an array with all rotating knives
    //             var children = this.knifeGroup.children;

    //             // looping through rotating knives
    //             for (var i = 0; i < children.length; i++) {
    //                 // is the knife too close to the i-th knife?
    //                 if (
    //                     Math.abs(
    //                         Phaser.Math.getShortestAngle(
    //                          this.target.angle,
    //                     )
    //                     ) < gameOptions.minAngle
    //              ) {
    //                  // this is not a legal hit
    //                  legalHit = false;
    //                  // this.score = scores.current;
    //                  // this.scoreText.setText(`Score: ${this.score}`);

    //                     // no need to continue with the loop
    //                     break;
    //                 }

    //             }
    //             // is this a legal hit
    //          if (legalHit) {
    //                 // ----------------------   ---------------------------------------------------------------
    //                 console.log(this.coin.hit);

    //                 // console.log(Math.floor(Math.abs(Phaser.Math.getShortestAngle(this.target.angle, 190 - this.coin.startAngle))) < Math.abs(gameOptions.minAngle));

    //                  if (
    //                         Math.abs(
    //                          Phaser.Math.getShortestAngle(
    //                              this.target.angle,
    //                              180 - this.coin.startAngle
    //                          )
    //                      ) < gameOptions.minAngle &&
    //                      !this.coin.hit
    //                     ) {
    //                         // console.log('In if block  - true');
    //                         // coin has been hit
    //                         this.coin.hit = !this.coin.hit;
    //                         this.softCurrency += 25;
    //                      // console.log(this.softCurrency);
    //                      this.coinsText.setText(`Coins: ${this.softCurrency}`);
    //                         // change coin frame to show one slice
    //                      this.coin.setFrame(1);

    //                      // add the other coin slice in the same coin posiiton
    //                      var slice = this.add.sprite(this.coin.x, this.coin.y, "coin", 1);

    //                      // same angle too.
    //                      slice.angle = this.coin.angle;

    //                      // and same origin
    //                         slice.setOrigin(0.5, 1);

    //                      // tween to make coin slices fall down
    //                      this.tweens.add({
    //                          // adding the knife to tween targets
    //                          targets: [this.coin, slice],

    //                          // y destination
    //                          y: this.world.centerY + this.coin.height,

    //                          // x destination
    //                          x: {
    //                              // running a function to get different x ends for each slice according to frame number
    //                              getEnd: function (target, key, value) {
    //                                  return (
    //                                      Phaser.Math.angleBetween(0, this.world.width / 2) +
    //                                      (this.world.width / 2) * (target.frame.name - 1)
    //                                  );
    //                              }
    //                          },
    //                          // rotation destination, in radians
    //                          angle: 45,

    //                          // tween duration
    //                          duration: gameOptions.throwSpeed * 6,

    //                          // callback scope
    //                          callbackScope: this,

    //                          // function to be executed once the tween has been completed
    //                          onComplete: function (tween) {
    //                              this.createTimeOut();
    //                          }
    //                      });
    //                  }
    //                  // ------------------------------------------------------------------------------
    //                  // player can now throw again
    //                  this.canThrow = true;
    //                  this.score++;
    //                  this.scoreText.setText(`Score: ${this.score}`);
    //                  // adding the rotating knife in the same place of the knife just landed on target
    //                  var knife = this.add.sprite(this.knife.x, this.knife.y, "knife");

    //                  // impactAngle property saves the target angle when the knife hits the target
    //                  knife.impactAngle = this.target.angle;

    //                     // adding the rotating knife to knifeGroup group
    //                  this.knifeGroup.add(knife);

    //                  // bringing back the knife to its starting position
    //                  this.knife.y = (this.world.centerY / 5) * 4;
    //              }

    //              // in case this is not a legal hit
    //                 else {
    //                  // tween to throw the knife
    //                  // this.tweens.add({
    //                  //     // adding the knife to tween targets
    //                  //     targets: [this.knife],

    //                  //     // y destination
    //                     //     y: this.world.centerY + this.knife.height,

    //                     //     // rotation destination, in radians
    //                     //     rotation: 5,

    //                  //     // tween duration
    //                  //     duration: gameOptions.throwSpeed * 4,

    //                  //     // callback scope
    //                     //     callbackScope: this,

    //                  //     // function to be executed once the tween has been completed
    //                  //     onComplete: function (tween) {
    //                  //         // restart the game
    //                  //         this.scene.start("PlayGame");
    //                  //     }
    //                  // });
    //              }
    //          }
    //      });
        }}
        
    // method to be executed at each frame. Please notice the arguments.
    update(time) {

        // rotating the target
        this.target.angle += this.currentRotationSpeed;

        // getting an array with all rotating knives
        var children = this.knifeGroup.children;
        // // looping through rotating knives
        // for (var i = 0; i < children.length; i++) {
        //     // rotating the knife
        //     children[i].angle += this.currentRotationSpeed;

        //     // turning knife angle in radians
        //     var radians = Phaser.Math.degToRad(children[i].angle + 90);

        //     // trigonometry to make the knife rotate around target center
        //     children[i].x =
        //         this.target.x + (this.target.width / 2) * Math.cos(radians);
        //     children[i].y =
        //         this.target.y + (this.target.width / 2) * Math.sin(radians);
        // }

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
}





