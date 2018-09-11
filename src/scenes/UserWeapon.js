// Get the current Knife
let UserWeapon;

class CurrentKnife {
  constructor(response) {
    this.knife = response.currentKnife;
  }
}
// Function where we get from Storage currentKnife and creating Class UserWeapon
async function setCurrentKnife() {
  try {
    const response = await FBInstant.player.getDataAsync(["currentKnife"]);
    UserWeapon = new CurrentKnife(response);
  } catch (error) {
    console.log(error);
  }
}
setCurrentKnife();

// Create all Settings of Targets

// Create Target Class
class Target {
  constructor(health, viewPath) {
    this.initialHealth = health;
    this.health = this.initialHealth;
    this.viewPath = viewPath;
  }
  hit() {
    this.health -= 5;
  }
  resetHealth() {
    if (this.health <= 0) {
      this.health = this.initialHealth;
    }
  }
}

// creating Targets
let wooden = new Target(10, "assets/targ.png");
let bear = new Target(20, "assets/targ1.png");
let celts = new Target(30, "assets/targ2.png");
let north = new Target(40, "assets/target3.jpg");

export const targets = {
  wooden: wooden,
  bear: bear,
  celts: celts,
  north: north
};

// Exporting all objects for game
export { UserWeapon };
