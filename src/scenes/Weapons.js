import knife1 from "../../assets/knife.png";
import knife2 from "../../assets/knife2.png";
import knife3 from "../../assets/knife3.png";
import knife4 from "../../assets/knife4.png";
import knife5 from "../../assets/knife5.png";
import arrow from "../../assets/arrow2.png";


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
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT  ;
        this.scale.pageAlignHorizontally = true; 
        this.scale.pageAlignVertically = true;
        this.title = this.add
            .text(
                this.world.centerX,
                this.world.centerY - 400,
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
                text: 'Jomolungma',
                price:`100 castars`
            },
            {
                key: 'knife2',
                text: 'Kilimanjaro',
                price:`100 castars`
            },
            {
                key: 'knife3',
                text: 'Mont Blanc',
                price:`100 castars`
            },
            {
                key: 'knife4',
                text: 'Hoverla',
                price:`100 castars`
            },
            {
                key: 'knife5',
                text: 'HUAYNA PICCHU',
                price:`100 castars`
            }
        ]

        this.knifes = this.game.add.group();
        let knifeItem;
        this.knifeStore.forEach(el=>{
            knifeItem =  this.knifes.create(-1000,this.game.world.centerY,el.key);
            knifeItem.anchor.setTo(0.5);
            knifeItem.scale.setTo(0.7);
            knifeItem.customParams = {text:el.text,price:el.price};
        })
        this.currentKnife = this.knifes.next();
        this.currentKnife.position.set(this.game.world.centerX,this.game.world.centerY);

        // text
        this.showText(this.currentKnife)

// Left Arrow for switching
        this.leftArrow = this.game.add.sprite(this.world.centerX-290, this.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.scale.setTo(-0.2);
        this.leftArrow.customParams = { direction: -1};
        // Arrow input
        this.leftArrow.inputEnabled = true;
        // this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchKnife, this);


// Right Arrow for switching
        this.rightArrow = this.game.add.sprite(this.world.centerX+290, this.world.centerY, 'arrow');
        this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.scale.setTo(0.2);
        this.rightArrow.customParams = {direction: 1};
        // Arrow input
        this.rightArrow.inputEnabled = true;
        // this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchKnife, this);


    }

    switchKnife(sprite,event) {

        this.knifeText.visible = false;
        this.knifePrice.visible = false;
       var newKnife,endX;
       if(sprite.customParams.direction > 0){
        newKnife = this.knifes.next();
        newKnife.x= -newKnife/2;
        endX =this.game.world.width + this.currentKnife.width /2;
       }
       else {
        newKnife = this.knifes.previous()
        newKnife.x=newKnife/2;
        endX =-this.currentKnife.width/2;
       }

       let newKnifeMove = this.game.add.tween(newKnife);
       newKnifeMove.to({x:this.game.world.centerX},500);
       newKnifeMove.onComplete.add(function(){
        this.showText(this.currentKnife)
       },this)
       newKnifeMove.start();

       let currentKnifeMove = this.game.add.tween(this.currentKnife);
       currentKnifeMove.to({x:endX},500);
       currentKnifeMove.start();

       this.currentKnife = newKnife;
    }
    showText(knife){
        if(!this.knifeText && !this.knifePrice){
            this.knifeText = this.game.add.text(this.game.width /2,this.game.height*0.70,'',style);
            this.knifeText.anchor.setTo(0.5)

            this.knifePrice = this.game.add.text(this.game.width /2,this.game.height*0.75,'',style);
            this.knifePrice.anchor.setTo(0.5)

        }
        this.knifeText.setText(knife.customParams.text);
        this.knifeText.visible = true;
        this.knifePrice.setText(knife.customParams.price);
        this.knifePrice.visible = true;
    }
}