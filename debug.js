FIXME:"Fix bug with current points"

TODO:"Create target health"
TODO:"Create advertisment"
TODO:"Create money"


// // global game options
// let gameOptions = {
//   // target rotation speed, in degrees per frame
//   rotationSpeed: 5,

//   // knife throwing duration, in milliseconds
//   throwSpeed: 150,

//   // minimum angle angleBetween two knives
//   minAngle: 19,

//   // max rotation speed variation, in degrees per frame
//   rotationVariation: 2,

//   // interval before next rotation speed variation, in milliseconds
//   changeTime: 2000,

//   // maximum rotation speed, in degrees per frame
//   maxRotationSpeed: 9
// };

// ---------------------------------------------------------------------


  // // change coin frame to show one slice
            // this.coin.setFrame(1);

            // // add the other coin slice in the same coin posiiton
            // var slice = this.add.sprite(this.coin.x, this.coin.y, "coin", 1);

            // // same angle too.
            // slice.angle = this.coin.angle;

            // // and same origin
            // slice.anchor.setTo(0.5, 1);

            // // tween to make coin slices fall down
            // let sliceCoin = this.game.add.tween(this.coin, slice);
            // sliceCoin.to(
            //   {
            //     y: this.game.height + this.coin.height,
            //     // x destination
            //     x: {
            //       // running a function to get different x ends for each slice according to frame number
            //       getEnd: function(target, key, value) {
            //         return (
            //           Phaser.Math.Between(0, this.world.width / 2) +
            //           (this.world.width / 2) * (target.frame - 1)
            //         );
            //       }
            //     }
            //   },
            //   +this.levelData.throwSpeed * 6,
            //   Phaser.Easing.Linear.None,
            //   false,
            //   2000
            // );
            // sliceCoin.onComplete.add(function coinTweenCallback(tween) {
            //   this.state.start("Play");
            // }, this);
            // sliceCoin.start();




        // in case this is not a legal hit
        // else {
        //   this.enemy.resetHealth();
        //   if (currentLevel < 3) {
        //     currentLevel++;
        //   } else {
        //     currentLevel = 0;
        //   }

        //   let knifeTweenElse = this.game.add.tween(this.knife);
        //   knifeTweenElse.to(
        //     {
        //       y: this.world.centerY + this.knife.height
        //     },
        //     +this.levelData.throwSpeed * 2,
        //     null,
        //     false
        //   );
        //   knifeTweenElse.onComplete.add(function(tween) {
        //     this.fbSaveData();
        //     // this.state.destroy()
        //     this.state.start("Menu", true, false);
        //   }, this);
        //   knifeTweenElse.start();
        // }