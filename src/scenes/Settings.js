import knife1 from "../../assets/knife.png";
import knife2 from "../../assets/knife2.png";
import knife3 from "../../assets/knife3.png";
import knife4 from "../../assets/knife4.png";
import knife5 from "../../assets/knife5.png";
import arrow2 from "../../assets/arrow2.png";


let title;
let style = {
    fontWeight: 'bold',
    fill: '#fff'
};
export default class Settings extends Phaser.State {
    // method to be executed when the scene preloads
    preload() {
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT  ;
        this.scale.pageAlignHorizontally = true; 
        this.scale.pageAlignVertically = true;

    }
    create() {
        this.title = this.add
            .text(
                this.world.centerX,
                this.world.centerY - 200,
                "Back to Menu",
                style
            );
        this.title.anchor.setTo(0.5, 0.5)
        this.title.inputEnabled = true
        this.title.events.onInputDown.add(() => {
            this.state.start('Menu')
        }, this);


        // Link to other games
        this.linkToGames = this.add
            .text(
                this.world.centerX,
                this.world.centerY - 80,
                'Other Games',
                style
            )
        this.linkToGames.anchor.setTo(0.5, 0.5);
        this.linkToGames.inputEnabled = true

        // switch on-off sound
        this.sound = this.add
            .text(
                this.world.centerX,
                this.world.centerY - 40,
                'Sound On/Off',
                style
            )
        this.sound.anchor.setTo(0.5, 0.5);
        this.sound.inputEnabled = true





        



    }

    linkHandle() {
        console.log('Other Games');
    }
    soundToggle() {
        console.log('Sound');

    }
}