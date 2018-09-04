import 'p2';
import 'pixi';
import 'phaser';
import {user} from '../Game'
let style = {
    fontWeight: 'bold',
    fill: '#fff'
};

export default class Leaders extends Phaser.State {

    preload() {
        this.friendNames = user.friends._value.map(item => {
            return item.$1.name
        });
    }
    create() {
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.backBtn = this.add
            .text(
                this.world.centerX,
                this.world.centerY - 400,
                "Back to Menu",
                style
            );
        this.backBtn.anchor.setTo(0.5, 0.5)
        this.backBtn.inputEnabled = true
        this.backBtn.events.onInputDown.add(this.toMenu, this);
        this.textGroup = this.add.group();

        for (var i = 0; i < this.friendNames.length; i++) {
            this.textGroup.add(this.make.text(this.game.world.centerX, this.world.centerY + (i + 1) * 34, `${i+1}.${this.friendNames[i]}\n`, style));
        }
        this.textGroup.children.forEach((item) => {
            // Here you can apply the same properties to every friendName.
            item.anchor.setTo(0.5, 0.5);
        });
    }
    toMenu() {
        this.state.start('Menu');
    }

}