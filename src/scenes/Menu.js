
let title;
let style = {
    fontWeight: 'bold',
    fill: '#fff'
};
export default class Menu extends Phaser.State {
    // method to be executed when the scene preloads
    preload() {

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
       
    }
    create() {
        //   console.log(back);
        // this.add
        //   .image(this.world.centerX + 40, this.world.centerY, "back")
        //   .setOrigin(1)
        //   .setScale(1);

        //   const menuConfig = [
        //     {template: '', is_interactive: false, handler: null}
        //   ]

        //   function addMenuItem(menuItem) {
        //     this.title = this.add
        //     .text(
        //       this.world.centerX / 2,
        //       this.world.centerY-1500,
        //       "Drop the Knife",
        //       style.title
        //     )
        //     .setOrigin(0.5);
        //   }
        let title = this.add
            .text(
                this.world.centerX,
                this.world.centerY - 200,
                "DROP THE KNIFE",
                style
            );
        title.anchor.setTo(0.5, 0.5)
       
        // current score
        this.currentScore = this.add
            .text(
                this.world.centerX,
                this.world.centerY - 80,
                `Score: 0`,
                style
            ).anchor.setTo(0.5, 0.5);

        // best score
        this.bestScore = this.add
            .text(
                this.world.centerX,
                this.world.centerY - 40,
                `BEST SCORE:0`,
                style
            ).anchor.setTo(0.5, 0.5);

        // Gift Text
        this.gift = this.add
            .text(
                this.world.centerX,
                this.world.centerY,
                "Your daily gift",
                style
            ).anchor.setTo(0.5, 0.5);

        // Leader Bord
        this.leaders = this.add
            .text(
                this.world.centerX,
                this.world.centerY + 40,
                "Leader Board",
                style
            ).anchor.setTo(0.5, 0.5);

        // options menu
        this.options = this.add
            .text(
                this.world.centerX,
                this.world.centerY + 80,
                "Settings",
                style
            )
            this.options.anchor.setTo(0.5, 0.5)
            this.options.inputEnabled = true
            this.options.events.onInputDown.add(this.toSettings, this);

        // shop menu
        this.shop = this.add
            .text(
                this.world.centerX,
                this.world.centerY + 120,
                "Knife Collection",
                style
            );
            this.shop.anchor.setTo(0.5, 0.5);
            this.shop.inputEnabled = true;
            this.shop.events.onInputDown.add(this.toShop, this);
        // Button play
        this.btn = this.add
            .text(
                this.world.centerX,
                this.world.centerY + 160,
                "Play",
                style
            );
            this.btn.anchor.setTo(0.5, 0.5);
            this.btn.inputEnabled = true;
            this.btn.events.onInputDown.add(this.startGame, this);
    }   

    startGame() {
        // console.log(item);
        this.state.start('Play')

    }
    toSettings(item) {
        // console.log(item);
        this.state.start('Settings')

    }
    toShop(){
        this.state.start('Weapons')
    }
}