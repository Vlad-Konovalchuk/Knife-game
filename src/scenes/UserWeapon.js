// import knife1 from "../../assets/knife.png";
// import knife2 from "../../assets/knife2.png";
// import knife3 from "../../assets/knife3.png";
// import knife4 from "../../assets/knife4.png";
// import knife5 from "../../assets/knife5.png";
// import item1 from "../../assets/item1.png";
// import item2 from "../../assets/item2.png";
// import item3 from "../../assets/item3.png";
// import item4 from "../../assets/target.png";
// Get the current Knife
let UserWeapon = null;

class CurrentKnife {
  constructor(response) {
    this.knife = response.currentKnife;
  }
}
// Function where we get from Storage currentKnife and creating Class UserWeapon
async function setCurrentKnife() {
  try {
    const response = await FBInstant.player.getDataAsync(["currentKnife"]);
    console.log("UserWeapon", response);
    UserWeapon = new CurrentKnife(response);
  } catch (error) {
    console.log(error);
  }
}
setCurrentKnife();

// Create Target Class
class Target {
  constructor(health, viewPath) {
    this.health = health;
    this.viewPath = viewPath;
  }
  hit() {
    this.health -= (this.health / 2);
  }
}

// creating Targets
let wooden = new Target(10, "assets/targ1.png");
let bear = new Target(23, "assets/targ1.png");
let celts = new Target(34, "assets/targ3.jpg");
let north = new Target(42, "assets/targ.png");
const targets = {
    wooden:wooden,
    bear:bear,
    celts:celts,
    north:north
  };
  
// Exporting all objects for game
export {UserWeapon}
export {targets}