import knife1 from "../../assets/knife.png";
import knife2 from "../../assets/knife2.png";
import knife3 from "../../assets/knife3.png";
import knife4 from "../../assets/knife4.png";
import knife5 from "../../assets/knife5.png";
import arrow from "../../assets/arrow2.png";


let title;
let style = {
    fontWeight: 'bold',
    fill: '#fff'
};
export default class Weapons extends Phaser.State {
    // method to be executed when the scene preloads
    preload() {
        this.load.image("knife1", knife1);
        this.load.image("knife2", knife2);
        this.load.image("knife3", knife3);
        this.load.image("knife4", knife4);
        this.load.image("knife5", knife5);
        this.load.image("arrow", arrow);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

    }
    create() {
        this.title = this.add
            .text(
                this.world.centerX,
                this.world.centerY - 350,
                "Back to Menu",
                style
            );
        this.title.anchor.setTo(0.5, 0.5)
        this.title.inputEnabled = true
        this.title.events.onInputDown.add(() => {
            this.state.start('Menu')
        }, this);



        this.knifeStore = [{
                key: 'knife1',
                text: 'Jomolungma'
            },
            {
                key: 'knife2',
                text: 'Kilimanjaro'
            },
            {
                key: 'knife3',
                text: 'Mont Blanc'
            },
            {
                key: 'knife4',
                text: 'Hoverla'
            },
            {
                key: 'knife5',
                text: 'HUAYNA PICCHU'
            }
        ]

        this.knifes = this.game.add.group();
        let knifeItem;
        this.knifeStore.forEach(el=>{
            knifeItem =  this.knifes.create(-1000,this.game.world.centerY,el.key);
            knifeItem.anchor.setTo(0.5);
            knifeItem.scale.setTo(0.7);
            knifeItem.customParam = {text:el.text};
        })
        this.currentKnife = this.knifes.next();
        this.currentKnife.position.set(this.game.world.centerX,this.game.world.centerY);

// Left Arrow for switching
        this.leftArrow = this.game.add.sprite(60, this.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.scale.setTo(-0.2);
        this.leftArrow.customParams = { direction: -1};
        // Arrow input
        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchKnife, this);


// Right Arrow for switching
        this.rightArrow = this.game.add.sprite(310, this.world.centerY, 'arrow');
        this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.scale.setTo(0.2);
        this.rightArrow.customParams = {direction: 1};
        // Arrow input
        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchKnife, this);


    }

    switchKnife(sprite,event) {
        console.log('Asd');
       var newKnife,endX;
       if(sprite.customParams.direction > 0){
        newKnife = this.knifes.next();
        endX =this.game.world.width + this.currentKnife.width /2;
       }
       else {
        newKnife = this.knifes.previous()
        endX =-this.currentKnife.width/2;
       }

       this.currentKnife.x = endX;
       newKnife.x = this.game.world.centerX;
    //    let newKnifeMove = this.game.add.tween(newKnife);
    //    newKnifeMove.to({x:this.game.world.centerX},640);
    //    newKnifeMove.start();

    //    let currentKnifeMove = this.game.add.tween(newKnife);
    //    currentKnifeMove.to({x:endX},640);
    //    currentKnifeMove.start();

       this.currentKnife = newKnife;
    }
}