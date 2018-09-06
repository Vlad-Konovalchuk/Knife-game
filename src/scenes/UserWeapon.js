import knife1 from "../../assets/knife.png";
import knife2 from "../../assets/knife2.png";
import knife3 from "../../assets/knife3.png";
import knife4 from "../../assets/knife4.png";
import knife5 from "../../assets/knife5.png";

async function getUserData() {
  let response = await FBInstant.player.getDataAsync(["currentKnife"]);
}
let UserWeapon = {
  knife: response
};

export default UserWeapon;

class Target {
    constructor(health,viewPath){
        this.health = health;
        this.viewPath = viewPath;
    }
    hit(){
        this.health-=this.health/2;
    }
}

let wooden = new Target(10,'assets/target.png');
let bear = new Target(23,'assets/item2.png');
let celts = new Target(34,'assets/item3.png')
let north = new Target(42,'assets/item1.png')


export let targets = {
    wooden,
    bear,
    celts,
    north
}