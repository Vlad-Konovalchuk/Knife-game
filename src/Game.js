var game;
import back from '../assets/china.png';
import knife1 from '../assets/knife.png';
import knife2 from '../assets/knife2.png';
import knife3 from '../assets/knife3.png';
import knife4 from '../assets/knife4.png';
import knife5 from '../assets/knife5.png';
import item1 from '../assets/item1.png';
import arrow1 from '../assets/arr.jpg';
import arrow2 from '../assets/arrow2.png';
import coin  from '../assets/apple.png';


// global game options
var gameOptions = {

    // target rotation speed, in degrees per frame
    rotationSpeed: 3,

    // knife throwing duration, in milliseconds
    throwSpeed: 150,

    // minimum angle between two knives
    minAngle: 15,

    // max rotation speed variation, in degrees per frame
    rotationVariation: 2,

    // interval before next rotation speed variation, in milliseconds
    changeTime: 2000,

    // maximum rotation speed, in degrees per frame
    maxRotationSpeed: 6
}

// once the window loads...
window.onload = function () {

    // game configuration object
    var gameConfig = {

        // render type
        type: Phaser.CANVAS,

        // game width, in pixels
        width: 750,

        // game height, in pixels
        height: 1334,

        // game background color
        backgroundColor: '#fff68f',

        autoStart: true,


        // scenes used by the game
        scene: [Menu,
            Leaders,
            Settings,
            Collection,
            playGame
        ]
    };

    // game constructor
    game = new Phaser.Game(gameConfig);
    game.scene.start('menu')
    // pure javascript to give focus to the page/frame and scale the game
    window.focus()
    resize();
    window.addEventListener("resize", resize, false);
}
let softCurrency = 0;
let style = {
    title: {
        fontFamily: 'Arial',
        fontSize: 58,
        color: '#990000',
        letterSpacing: 3,
    },
    menu: {
        fontFamily: 'Arial',
        fontSize: 58,
        color: '#990000',
        letterSpacing: 3,
    },
    button: {
        fontFamily: 'Arial',
        fontSize: 58,
        color: '#990000',
        letterSpacing: 3,
    },
    scores: {
        fontFamily: 'Arial',
        fontSize: 58,
        color: '#990000',
        letterSpacing: 3,
    },
    gift: {
        fontFamily: 'Arial',
        fontSize: 40,
        color: '#67ff8b',
        letterSpacing: 3,
    },
    collectionTitle: {
        fontFamily: 'Arial',
        fontSize: 58,
        color: '#39a24e',
        letterSpacing: 3,
    }
};

let scores = {
    current: 0,
    best: 0
}

var hsv;
var i = 0;
class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
        this.hsv = hsv;
        this.i = i;
    }

    // method to be executed when the scene preloads
    preload() {
        this.load.image('back', back)
        this.load.image('coin',coin)
    }
    create() {
        console.log(back)
        console.log('menu')
        this.add.image(game.config.width + 190, game.config.height, 'back').setOrigin(1).setScale(1)
        this.title = this.add.text(game.config.width / 2, game.config.height / 2 - 500, "Drop the Knife", style.title)
            .setOrigin(0.5)

        // current score
        this.currentScore = this.add.text(game.config.width / 2, game.config.height / 2 - 300, `Score: ${scores.current}`, style.scores)
            .setOrigin(0.5)


        // best score
        this.bestScore = this.add.text(game.config.width / 2, game.config.height / 2 - 200, `BEST SCORE:${scores.best}`, style.scores)
            .setOrigin(0.5)


        // Gift Text
        this.gift = this.add.text(game.config.width / 2, game.config.height / 2 - 80, "Your daily gift", style.gift)
            .setOrigin(0.5)
            .setInteractive()
            .setStroke('#000', 16)
            .setShadow(2, 2, "#e5e545", 2, true, true);


        // Leader Bord 
        this.leaders = this.add.text(game.config.width / 2, game.config.height / 2 + 100, "Leader Board", style.menu)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => this.leaders.setStyle({
                fill: '#a36d00',
                fontSize: '58px',
                fontFamily: 'Arial'
            }))
            .on('pointerout', () => this.leaders.setStyle(style.scores));

        // options menu
        this.options = this.add.text(game.config.width / 2, game.config.height / 2 + 200, "Settings", style.menu).setInteractive();
        this.options.setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => this.options.setStyle({
                fill: '#a36d00',
                fontSize: '58px',
                fontFamily: 'Arial'
            }))
            .on('pointerout', () => this.options.setStyle(style.scores));
        this.options.on('pointerdown', function (event) {
            console.log('change to settings')
            this.scene.start('Settings');
        }, this);


        // shop menu
        this.shop = this.add.text(game.config.width / 2, game.config.height / 2 + 300, "Knife Collection", style.menu)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => this.shop.setStyle({
                fill: '#a36d00',
                fontSize: '58px',
                fontFamily: 'Arial'
            }))
            .on('pointerout', () => this.shop.setStyle(style.scores));
        this.shop.on('pointerdown', function (event) {
            console.log('change to Collection')
            this.scene.start('Collection');
        }, this);

        // Button play
        this.btn = this.add.text(game.config.width / 2, game.config.height / 2 + 400, "Play", style.button)
            .setInteractive()
            .on('pointerover', () => this.btn.setStyle({
                fill: '#a36d00',
                fontSize: '58px',
                fontFamily: 'Arial'
            }))
            .on('pointerout', () => this.btn.setStyle(style.scores));
        this.btn.setOrigin(0.5);
        this.btn.on('pointerdown', function (event) {
            console.log('change to PlayGame')
            this.scene.start('PlayGame');
        }, this);

        // this.add.image(game.config.width / 2, game.config.height/2, 'coin').setScale(0.4)

    }

    update() {
        // let self = this;
        // let top = this.hsv[this.i].color;
        // let bottom = this.hsv[359 - this.i].color;

        // this.gift.setTint(top, top, bottom, bottom);
        // this.gift.setTint(top, bottom, top, bottom);

        // this.i++;

        // if (this.i === 360) {
        //     this.i = 0;
        // }
    }


}
// PlayGame scene
class playGame extends Phaser.Scene {
    // constructor
    constructor() {
        super("PlayGame");
        this.score = scores.current;
        this.softCurrency = softCurrency;
    }

    // method to be executed when the scene preloads
    preload() {

        // loading assets
        this.load.image("target", item1);
        this.load.image("knife", knife2);
        this.load.spritesheet("coin", coin, {
            frameWidth: 70,
            frameHeight: 96
        })
    }

    // method to be executed once the scene has been created
    create() {
        console.log('PlayGame')
        this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, style.scores)
        this.coinsText = this.add.text(450, 10, `Coins: ${this.softCurrency}`, style.scores)
        // at the beginning of the game, both current rotation speed and new rotation speed are set to default rotation speed
        this.currentRotationSpeed = gameOptions.rotationSpeed;
        this.newRotationSpeed = gameOptions.rotationSpeed;

        // can the player throw a knife? Yes, at the beginning of the game
        this.canThrow = true;

        // group to store all rotating knives
        this.knifeGroup = this.add.group();

        // adding the knife
        this.knife = this.add.sprite(game.config.width / 2, game.config.height / 5 * 4, "knife");

        // adding the target
        this.target = this.add.sprite(game.config.width / 2, 400, "target");

        // moving the target on front
        this.target.depth = 1;

        // waiting for player input to throw a knife
        this.input.on("pointerdown", this.throwKnife, this);

        // this is how we create a looped timer event
        var timedEvent = this.time.addEvent({
            delay: gameOptions.changeTime,
            callback: this.changeSpeed,
            callbackScope: this,
            loop: true
        });
        this.createCoin()


    }

    // method to change the rotation speed of the target
    changeSpeed() {

        // ternary operator to choose from +1 and -1
        var sign = Phaser.Math.Between(0, 1) == 0 ? -1 : 1;

        // random number between -gameOptions.rotationVariation and gameOptions.rotationVariation
        var variation = Phaser.Math.FloatBetween(-gameOptions.rotationVariation, gameOptions.rotationVariation);

        // new rotation speed
        this.newRotationSpeed = (this.currentRotationSpeed + variation) * sign;

        // setting new rotation speed limits
        this.newRotationSpeed = Phaser.Math.Clamp(this.newRotationSpeed, -gameOptions.maxRotationSpeed, gameOptions.maxRotationSpeed);
    }
    createCoin(){
        var coinAngle = Phaser.Math.Between(0, 360);
        var radians = Phaser.Math.DegToRad(coinAngle - 90);

        this.coin = this.add.sprite(this.target.x + (this.target.width / 2) * Math.cos(radians), this.target.y + (this.target.width / 2) * Math.sin(radians), "coin");
        this.coin.angle = coinAngle;
        this.coin.startAngle = coinAngle;
        this.coin.depth = 2;
        this.coin.hit = false;
        console.log(`X and Y position of coin ${this.coin.x}, ${this.coin.y}`);
        
    }
    createTimeOut(){
        console.log('createTimeOut');
        let that = this;
        console.log(this.softCurrency);
        
        function randInt() {
            var rand = Math.random() * (+that.softCurrency);
            rand = Math.floor(rand);
            return rand;
          }
          
          function request() {
            setTimeout(()=>{
                console.log('creating coin');
              that.createCoin()
            }, randInt());
          }
          request();
    }
    // method to throw a knife
    throwKnife() {

        // can the player throw?
        if (this.canThrow) {

            // player can't throw anymore
            this.canThrow = false;

            // tween to throw the knife
            this.tweens.add({

                // adding the knife to tween targets
                targets: [this.knife],

                // y destination
                y: this.target.y + this.target.width / 2,

                // tween duration
                duration: gameOptions.throwSpeed,

                // callback scope
                callbackScope: this,

                // function to be executed once the tween has been completed
                onComplete: function (tween) {

                    // at the moment, this is a legal hit
                    var legalHit = true;

                    // getting an array with all rotating knives
                    var children = this.knifeGroup.getChildren();

                    // looping through rotating knives
                    for (var i = 0; i < children.length; i++) {

                        // is the knife too close to the i-th knife?
                        if (Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, children[i].impactAngle)) < gameOptions.minAngle) {                            
                            // this is not a legal hit
                            legalHit = false;
                            this.score = scores.current
                            this.scoreText.setText(`Score: ${this.score}`)
                        
                            // no need to continue with the loop
                            break;
                        }
                    }
                    // is this a legal hit
                    if (legalHit) {
                // ----------------------   ---------------------------------------------------------------
       
                            console.log(Math.floor(Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, 190 - this.coin.startAngle))) < Math.abs(gameOptions.minAngle));
                            
                                if(Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, 180 - this.coin.startAngle)) < gameOptions.minAngle && !this.coin.hit){

                                    console.log('In if block  - true');
                                    
                                // coin has been hit
                                this.coin.hit = !this.coin.hit;
                                this.softCurrency+=25;
                                // console.log(this.softCurrency);
                                this.coinsText.setText(`Coins: ${this.softCurrency}`)
                                // change coin frame to show one slice
                                this.coin.setFrame(1);
     
                                // add the other coin slice in the same coin posiiton
                                var slice = this.add.sprite(this.coin.x, this.coin.y, "coin", 1);
     
                                // same angle too.
                                slice.angle = this.coin.angle;
     
                                // and same origin
                                slice.setOrigin(0.5, 1);
                              
                                // tween to make coin slices fall down
                                this.tweens.add({
     
                                    // adding the knife to tween targets
                                    targets: [this.coin, slice],
     
                                    // y destination
                                    y: game.config.height + this.coin.height,
     
                                    // x destination
                                    x: {
     
                                        // running a function to get different x ends for each slice according to frame number
                                        getEnd: function(target, key, value){
                                            return Phaser.Math.Between(0, game.config.width / 2) + (game.config.width / 2 * (target.frame.name - 1));
                                        }
                                    },
     
                                    // rotation destination, in radians
                                    angle: 45,
     
                                    // tween duration
                                    duration: gameOptions.throwSpeed * 6,
     
                                    // callback scope
                                    callbackScope: this,
     
                                    // function to be executed once the tween has been completed
                                    onComplete: function(tween){
                                        // this.createCoin()
                                        this.coin.hit = !this.coin.hit;
                                        this.createTimeOut()
                                        // restart the game
                                        // this.scene.start("PlayGame")
                                    }
                                });
                            }
                        
                            
// ------------------------------------------------------------------------------
                        // player can now throw again
                        this.canThrow = true;
                        this.score++;
                        this.scoreText.setText(`Score: ${this.score}`)
                        // adding the rotating knife in the same place of the knife just landed on target
                        var knife = this.add.sprite(this.knife.x, this.knife.y, "knife");

                        // impactAngle property saves the target angle when the knife hits the target
                        knife.impactAngle = this.target.angle;

                        // adding the rotating knife to knifeGroup group
                        this.knifeGroup.add(knife);

                        // bringing back the knife to its starting position
                        this.knife.y = game.config.height / 5 * 4;
                    }

                    // in case this is not a legal hit
                    else {
                        // tween to throw the knife
                        this.tweens.add({

                            // adding the knife to tween targets
                            targets: [this.knife],

                            // y destination
                            y: game.config.height + this.knife.height,

                            // rotation destination, in radians
                            rotation: 5,

                            // tween duration
                            duration: gameOptions.throwSpeed * 4,

                            // callback scope
                            callbackScope: this,

                            // function to be executed once the tween has been completed
                            onComplete: function (tween) {
                                // restart the game
                                this.scene.start("PlayGame")
                            },
                        });
                    }
                }
            });
        }
    }

    // method to be executed at each frame. Please notice the arguments.
    update(time, delta) {

        // rotating the target
        this.target.angle += this.currentRotationSpeed;

        // getting an array with all rotating knives
        var children = this.knifeGroup.getChildren();

        // looping through rotating knives
        for (var i = 0; i < children.length; i++) {

            // rotating the knife
            children[i].angle += this.currentRotationSpeed;

            // turning knife angle in radians
            var radians = Phaser.Math.DegToRad(children[i].angle + 90);

            // trigonometry to make the knife rotate around target center
            children[i].x = this.target.x + (this.target.width / 2) * Math.cos(radians);
            children[i].y = this.target.y + (this.target.width / 2) * Math.sin(radians);
        }

        // adjusting current rotation speed using linear interpolation
        this.currentRotationSpeed = Phaser.Math.Linear(this.currentRotationSpeed, this.newRotationSpeed, delta / 1000);

           // if the coin has not been hit...
           if(!this.coin.hit){
 
            // adjusting coin rotation
            this.coin.angle += this.currentRotationSpeed;
 
            // turning coin angle in radians
            var radians = Phaser.Math.DegToRad(this.coin.angle - 90);
 
            // adjusting coin position
            this.coin.x = this.target.x + (this.target.width / 2) * Math.cos(radians);
            this.coin.y = this.target.y + (this.target.width / 2) * Math.sin(radians);
        }
    }
}

// pure javascript to scale the game
function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    } else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}


class Leaders extends Phaser.Scene {
    constructor() {
        super('Leaders')
    }
    preload() {

    }
    create() {
        console.log('Leader')
        this.title = this.add.text(game.config.width / 2, game.config.height / 2 - 500, "Sings", style.menu);
        this.title.setOrigin(0.5);
        this.link = this.add.text(game.config.width / 2, game.config.height / 2 - 200, "Otheres", style.menu).setInteractive();
        this.link.setOrigin(0.5);
        this.soundOn = this.add.text(game.config.width / 2, game.config.height / 2, "S/", style.menu).setInteractive();
        this.soundOn.setOrigin(1);
        this.soundOff = this.add.text(game.config.width / 2 + 300, game.config.height / 2, "Sound Off", style.menu).setInteractive();
        this.soundOff.setOrigin(1);
    }
}

class Settings extends Phaser.Scene {
    constructor() {
        super('Settings')
    }
    preload() {

    }
    create() {
        console.log('Settings')
        this.title = this.add.text(game.config.width / 2, game.config.height / 2 - 500, "Settings", style.menu);
        this.title.setOrigin(0.5);
        this.link = this.add.text(game.config.width / 2, game.config.height / 2 - 200, "Other Games", style.menu).setInteractive();
        this.link.setOrigin(0.5);
        this.soundOn = this.add.text(game.config.width / 2, game.config.height / 2, "Sound On /", style.menu).setInteractive();
        this.soundOn.setOrigin(1);
        this.soundOff = this.add.text(game.config.width / 2 + 300, game.config.height / 2, "Sound Off", style.menu).setInteractive();
        this.soundOff.setOrigin(1);

        this.exit = this.add.text(game.config.width / 2, game.config.height / 2 + 500, "Exit", style.menu).setInteractive();
        this.exit.setOrigin(0.5);
        this.exit.on('pointerdown', function (event) {
            console.log('change to menu')
            this.scene.start('menu');
        }, this);

    }
}
class Collection extends Phaser.Scene {
    constructor() {
        super('Collection')
    }
    preload() {
        this.load.image('knife1', knife1);
        this.load.image('knife2', knife2);
        this.load.image('knife3', knife3);
        this.load.image('knife4', knife4);
        this.load.image('knife5', knife5);
        this.load.image('leftArrow', arrow1);
        this.load.image('rightArrow', arrow2);

    }
    create() {
        var self = this;
        this.add.image(game.config.width + 190, game.config.height, 'back').setOrigin(1).setScale(1)
        this.collectionTitle = this.add.text(game.config.width / 2, 300, 'Choose Weapon', style.collectionTitle)
            .setOrigin(0.5)
        this.backBtn = this.add.text(game.config.width / 2, 50, 'Back to menu', style.title)
            .setOrigin(0.5)
            .setInteractive()
        this.backBtn.on('pointerdown', function (event) {
            console.log('change to menu')
            this.scene.start('menu');
        }, this);
        this.rightArrow = this.add.sprite(game.config.width / 2 + 280, game.config.height / 2, 'rightArrow');
        this.rightArrow.setScale(0.3)
        this.rightArrow.customParams = {
            direction: 1
        }
        this.rightArrow.setInteractive();
        this.leftArrow = this.add.sprite(game.config.width / 2 - 280, game.config.height / 2, 'rightArrow');
        this.leftArrow.setScale(-0.3)
        this.leftArrow.customParams = {
            direction: -1
        };
        this.leftArrow.setInteractive()

        let knifeData = [{
                key: 'knife1',
                text: 'Areos',
                price: 100,
            },
            {
                key: 'knife2',
                text: 'Winter',
                price: 179,
            },
            {
                key: 'knife3',
                text: 'Scalpel',
                price: 200,
            },
            {
                key: 'knife4',
                text: 'Hunting Knife',
                price: 321,
            },
            {
                key: 'knife5',
                text: 'Bayonets',
                price: 142,
            }
        ]
        this.knifes = this.add.group();
        // Creating group of knifes
        this.knifesNames = this.add.group();
        // Creating basic structure for creating knife "slider"
        let i = 0;
        let indexedKnife;
        for (let element of knifeData) {
            indexedKnife = this.knifes.create(-1000, game.config.height / 2, element.key);
            // textKnife = this.add.text(200, game.config.height / 2 + 100, knifeData[0].text,style.title)

            indexedKnife.customParams = {
                text: element.text,
                price: element.price,
                count: i
            }
            // This will keep track of the current knife in the knifes group.
            this.knifes.next = (i) => {
                return this.knifes.children.entries[i];
            };

            // Grab the current knife index
            this.currentKnifeIndex = 0;

            this.currentKnife = this.knifes.next(this.currentKnifeIndex);
            this.currentKnife.x = game.config.width / 2;
            this.showText(this.currentKnife);

        }
        this.leftArrow.on('pointerdown', function (pointer) {
            self.switchKnife(this, self);
        })
        this.rightArrow.on('pointerdown', function (pointer) {
            self.switchKnife(this, self);
        })



    }
    update() {

    }
    switchKnife(sprite, self) {
        var newKnife, endX;
        if (self.isMoving) {
            return false;
        } else {
            if (sprite.customParams.direction > 0) {
                console.log('right');
                if (self.currentKnifeIndex >= self.knifes.children.size - 1) {
                    // This will run on the last sprite.
                    self.currentKnifeIndex = 0;
                    newKnife = self.knifes.children.entries[self.currentKnifeIndex];
                    var newKnifeMovement = this.tweens.add({
                        targets: newKnife,
                        x: self.sys.canvas.width / 2,
                        duration: 1000,
                        ease: 'Power2',
                        onComplete: onCompleteHandle,
                        completeDelay: 500
                    });
                    var currentAnimalMovement = this.tweens.add({
                        targets: self.currentKnife,
                        x: 960 + self.currentKnife.width / 2,
                        duration: 1000,
                        ease: 'Power2',
                        onStart: function () {
                            self.currentKnife.x = -1000;
                        },
                        onComplete: onCompleteHandle,
                        completeDelay: 500
                    });
                    newKnife.x = -newKnife.width / 2;
                    endX = 960 + self.currentKnife.width / 2;

                    self.currentKnife = newKnife;
                    self.showText(self.currentKnife);
                } else {
                    self.currentKnifeIndex++;
                    newKnife = self.knifes.next(self.currentKnifeIndex);
                    // In order to have the animation look seamless, we will set the
                    // x of the newAnimal to be where we want it to start
                    endX = 960 + self.currentKnife.width / 2;
                    if (newKnife.x !== 960 + self.currentKnife.width / 2) {
                        // Now that positioning is done, we will add in a tween animation.
                        var newKnifeMovement = this.tweens.add({
                            targets: newKnife,
                            x: self.sys.canvas.width / 2,
                            duration: 1000,
                            ease: 'Power2',
                            onComplete: onCompleteHandle,
                            completeDelay: 500
                        });
                        // Tween for current animal
                        var currentKnifeMovement = this.tweens.add({
                            targets: self.currentKnife,
                            x: endX,
                            duration: 1000,
                            ease: 'Power2',
                            onStart: function () {
                                self.currentKnife.x = -1000;
                            },
                            completeDelay: 500
                        });
                    }

                    self.currentKnife = newKnife;
                    self.showText(self.currentKnife);
                }

            } else {
                if (self.currentKnifeIndex === 0) {
                    self.currentKnifeIndex = self.knifes.children.size - 1;
                    newKnife = self.knifes.next(self.currentKnifeIndex);
                    self.showText(newKnife);
                    endX = -self.currentKnife.width / 2;
                    newKnife.x = 960 + self.currentKnife.width / 2;
                    // Now that positioning is done, we will add in a tween animation.
                    var newKnifeMovement = this.tweens.add({
                        targets: newKnife,
                        x: self.sys.canvas.width / 2,
                        duration: 1000,
                        ease: 'Power2',
                        completeDelay: 500,
                        onComplete: onCompleteHandle
                    });
                    // Tween for current animal
                    var currentKnifeMovement = this.tweens.add({
                        targets: self.currentKnife,
                        x: endX,
                        duration: 1000,
                        ease: 'Power2',
                        completeDelay: 500
                    });
                    self.currentKnife = newKnife;
                } else {
                    if (self.currentKnifeIndex > 0) {
                        self.currentKnifeIndex--;
                    }
                    newKnife = self.knifes.next(self.currentKnifeIndex);
                    self.showText(newKnife);
                    newKnife.x = 960 + self.currentKnife.width / 2;
                    endX = -self.currentKnife.width / 2;
                    // Now that positioning is done, we will add in a tween animation.
                    var newKnifeMovement = this.tweens.add({
                        targets: newKnife,
                        x: self.sys.canvas.width / 2,
                        duration: 1000,
                        ease: 'Power2',
                        completeDelay: 500,
                        onComplete: onCompleteHandle
                    });
                    self.showText(newKnife);
                    // Tween for current animal
                    var currentKnifeMovement = this.tweens.add({
                        targets: self.currentKnife,
                        x: endX,
                        duration: 1000,
                        ease: 'Power2',
                        completeDelay: 500
                    });
                    self.currentKnife = newKnife;
                }
            }


        }

        function onCompleteHandle(tween, targets, myImage) {
            self.isMoving = false;
        }

    }
    showText(knife) {
        if (!this.knifeText && !this.knifePrice) {
            this.knifePrice = this.add.text(
                game.config.width / 2,
                game.config.height / 2 + 300,
                // One thing to keep in mind is that align only works with multi-line text, so we won't use it.
                knife.customParams.price, {
                    fontFamily: 'Arial',
                    fontSize: '60px',
                    color: '#af0d00'
                }
            );
            console.log('price end');
            this.knifePrice.setOrigin(0.5);
            console.log(knife.customParams.price)

            this.knifeText = this.add.text(
                game.config.width / 2,
                game.config.height / 2 + 200,
                // One thing to keep in mind is that align only works with multi-line text, so we won't use it.
                knife.customParams.text, {
                    fontFamily: 'Arial',
                    fontSize: '60px',
                    color: '#af0d00'
                }
            );
            this.knifeText.setOrigin(0.5);
            console.log('price start');


        } else {
            this.knifePrice.setText(knife.customParams.price)
            this.knifeText.setText(knife.customParams.text);
            this.knifeText.visible = true;
            this.knifePrice.visible = true;
        }
    }
}