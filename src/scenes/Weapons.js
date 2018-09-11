import knife1 from "../../assets/knife.png";
import knife2 from "../../assets/knife2.png";
import knife3 from "../../assets/knife3.png";
import knife4 from "../../assets/knife4.png";
import knife5 from "../../assets/knife5.png";
// ---targets
import item1 from "../../assets/targ.png";
import item2 from "../../assets/targ1.png";
import item3 from "../../assets/targ2.png";
import item4 from "../../assets/target3.jpg";
// ---
import arrow from "../../assets/arrow2.png";

class Knife {
  constructor(path) {
    this.path = path;
  }
}
const Jomolungma = new Knife("assets/knife.png");
const MontBlanc = new Knife("assets/knife3.png");
const Hoverla = new Knife("assets/knife4.png");
const Fuji = new Knife("assets/knife5.png");
const Kilimanjaro = new Knife("assets/knife2.png");

let style = {
  fontWeight: "bold",
  fill: "#fff"
};
export default class Weapons extends Phaser.State {
  // method to be executed when the scene preloads
  preload() {
    this.load.image("target", item1);
    this.load.image("target", item2);
    this.load.image("target", item3);
    this.load.image("target", item4);
    // -----------------------------
    this.load.image("weapon", knife1);
    this.load.image("weapon", knife2);
    this.load.image("weapon", knife3);
    this.load.image("weapon", knife4);
    this.load.image("weapon", knife5);
    // -----------------------------
    this.load.image("knife1", knife1);
    this.load.image("knife2", knife2);
    this.load.image("knife3", knife3);
    this.load.image("knife4", knife4);
    this.load.image("knife5", knife5);
    this.load.image("arrow", arrow);

    // Scale Manager for responsive
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }
  create() {
    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.title = this.add.text(
      this.world.centerX,
      this.world.centerY - 400,
      "Back to Menu",
      style
    );
    this.title.anchor.setTo(0.5, 0.5);
    this.title.inputEnabled = true;
    this.title.events.onInputDown.add(() => {
      this.state.start("Menu");
    }, this);
    this.knifeText = false;
    this.knifePrice = false;
    this.knifeStore = [
      {
        key: "knife1",
        class: Jomolungma.path,
        text: "Jomolungma",
        price: `100 castars`,
        path: "assets/knife.png"
      },
      {
        key: "knife2",
        text: "Kilimanjaro",
        class: Kilimanjaro.path,
        price: `100 castars`,
        path: "assets/knife2.png"
      },
      {
        key: "knife3",
        text: "Mont Blanc",
        class: MontBlanc.path,
        price: `100 castars`,
        path: "assets/knife3.png"
      },
      {
        key: "knife4",
        text: "Hoverla",
        class: Hoverla.path,
        price: `100 castars`,
        path: "assets/knife4.png"
      },
      {
        key: "knife5",
        text: "Fuji",
        class: Fuji.path,
        price: `100 castars`,
        path: "assets/knife5.png"
      }
    ];

    this.knifes = this.game.add.group();
    let knifeItem;
    this.knifeStore.forEach(el => {
      knifeItem = this.knifes.create(-1000, this.game.world.centerY, el.key);
      knifeItem.anchor.setTo(0.5);
      knifeItem.scale.setTo(0.7);
      knifeItem.customParams = {
        key: el.key,
        class: el.class,
        text: el.text,
        price: el.price
      };
    });
    this.currentKnife = this.knifes.next();
    this.currentKnife.position.set(
      this.game.world.centerX,
      this.game.world.centerY
    );

    // text
    this.showText(this.currentKnife);

    // Left Arrow for switching
    this.leftArrow = this.game.add.sprite(
      this.world.centerX - 290,
      this.world.centerY,
      "arrow"
    );
    this.leftArrow.anchor.setTo(0.5);
    this.leftArrow.scale.setTo(-0.2);
    this.leftArrow.customParams = { direction: -1 };
    // Arrow input
    this.leftArrow.inputEnabled = true;
    // this.leftArrow.input.pixelPerfectClick = true;
    this.leftArrow.events.onInputDown.add(this.switchKnife, this);

    // Right Arrow for switching
    this.rightArrow = this.game.add.sprite(
      this.world.centerX + 290,
      this.world.centerY,
      "arrow"
    );
    this.rightArrow.anchor.setTo(0.5);
    this.rightArrow.scale.setTo(0.2);
    this.rightArrow.customParams = { direction: 1 };
    // Arrow input
    this.rightArrow.inputEnabled = true;
    // this.rightArrow.input.pixelPerfectClick = true;
    this.rightArrow.events.onInputDown.add(this.switchKnife, this);
  }

  switchKnife(sprite, event) {
    this.knifeText.visible = false;

    this.knifePrice.visible = false;

    var newKnife, endX;
    if (sprite.customParams.direction > 0) {
      newKnife = this.knifes.next();
      newKnife.x = -newKnife / 2;
      endX = this.game.world.width + this.currentKnife.width / 2;
    } else {
      newKnife = this.knifes.previous();
      newKnife.x = newKnife / 2;
      endX = -this.currentKnife.width / 2;
    }

    let newKnifeMove = this.game.add.tween(newKnife);
    newKnifeMove.to({ x: this.game.world.centerX }, 500);
    newKnifeMove.onComplete.add(function() {
      this.showText(this.currentKnife);
    }, this);
    newKnifeMove.start();

    let currentKnifeMove = this.game.add.tween(this.currentKnife);
    currentKnifeMove.to({ x: endX }, 500);
    currentKnifeMove.start();

    this.currentKnife = newKnife;
  }
  showText(knife) {
    console.log("Show text");
    if (!this.knifeText && !this.knifePrice) {
      console.log("Show text - true");

      this.knifeText = this.game.add.text(
        this.game.width / 2,
        this.game.height * 0.7,
        "",
        style
      );
      this.knifeText.anchor.setTo(0.5);
      this.knifeText.inputEnabled = true;
      this.knifeText.events.onInputDown.add(this.setKnife, this);

      this.knifePrice = this.game.add.text(
        this.game.width / 2,
        this.game.height * 0.75,
        "",
        style
      );
      this.knifePrice.anchor.setTo(0.5);
      this.knifePrice.inputEnabled = true;
      this.knifePrice.events.onInputDown.add(this.setKnife, this);
    }
    this.knifeText.setText(knife.customParams.text);
    this.knifeText.visible = true;
    this.knifePrice.setText(knife.customParams.price);
    this.knifePrice.visible = true;
  }
  setKnife() {
    FBInstant.player
      .setDataAsync({
        currentKnife: this.currentKnife.customParams.class
      })
      .then(() => {
        console.log("Yepp! Weapon is set");
      })
      .catch(err => {
        console.log("Ops! Weapon does not set:(");
        console.log(err);
      });
  }
}
