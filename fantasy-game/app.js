//Part 1: Create hero from user input
const heroName = document.getElementById("character-name");
const heroHP = document.getElementById("character-hp");
const attackDamage = document.getElementById("attack-damage");
const profileImg = document.querySelectorAll(".profile-img");
const createButton = document.getElementById("create-character");

let hero = {};
let userProfileImg = "";

function createHero(name, hp, attackdamage, img) {
  if (!name || !hp || !attackdamage || !img) {
    alert("Husk å fylle inn alle feltene og velg et profilbilde");
    return;
  }

  hero = {
    name: name,
    hp: hp,
    attackdamage: attackdamage,
    img: img,
  };

  saveToLocalStorage("Hero", hero);
  return hero;
}
profileImg.forEach((image) => {
  image.addEventListener("click", () => {
    userProfileImg = image.getAttribute("src");
  });
});

function saveToLocalStorage(type, character) {
  localStorage.setItem(type, JSON.stringify(character));
}

//Generate random nemy
const createEnemyButton = document.getElementById("generate-enemy");

let enemy = {};

function generateEnemy() {
  const enemyNamesArray = ["Goblin", "Ork", "Drage"];
  const randomEnemyName =
    enemyNamesArray[Math.floor(Math.random() * enemyNamesArray.length)];

  const enemyImgArray = [
    "./assets/dragon.jpg",
    "./assets/monster.jpg",
    "./assets/swamp-monster.jpg",
  ];
  let randomEnemyImg =
    enemyImgArray[Math.floor(Math.random() * enemyImgArray.length)];

  let enemyRandomHP = getRandomNumber(50, 150);
  let enemyRandomAttack = getRandomNumber(10, 40);

  enemy = {
    name: randomEnemyName,
    img: randomEnemyImg,
    hp: enemyRandomHP,
    attackdamage: enemyRandomAttack,
  };

  saveToLocalStorage("Enemy", enemy);

  displayEnemy();
  return enemy;
}

function displayEnemy() {
  let enemyImg = document.getElementById("enemy-img");
  let enemyName = document.getElementById("enemy-name");
  let enemyHP = document.getElementById("enemy-hp");
  let enemyAttackDamage = document.getElementById("enemy-attack");

  enemyImg.src = enemy.img;
  enemyName.innerHTML = `Fiende: ${enemy.name}`;
  enemyHP.innerHTML = `HP: ${enemy.hp}`;
  enemyAttackDamage.innerHTML = `Angrepsstyrke: ${enemy.attackdamage}`;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//Fight!
const startButton = document.getElementById("start-fight");
const textResult = document.getElementById("battle-result");

let heroScore = "";
let enemyScore = "";

function calculateScore() {
  let localHero = getFromLocalStorage("Hero");
  let localEnemy = getFromLocalStorage("Enemy");

  heroScore = localHero.hp - localEnemy.attackdamage;
  enemyScore = localEnemy.hp - localHero.attackdamage;

  displayCharacter(localEnemy, enemyScore, "Fienden", "enemy-fight");
  displayCharacter(localHero, heroScore, "Helten", "char");
  showResult();
}

function getFromLocalStorage(type) {
  let item = localStorage.getItem(type);
  item = JSON.parse(item);
  return item;
}

function displayCharacter(localdata, score, title, charID) {
  const battleArena = document.getElementById("battle-area");

  const characterDiv = document.createElement("div");
  characterDiv.setAttribute("id", "character-display");
  characterDiv.setAttribute("class", "profile-card");

  const characterHeader = document.createElement("h2");
  characterHeader.innerHTML = title;

  const characterProfilePic = document.createElement("img");
  characterProfilePic.setAttribute("id", `${charID}-img`);
  characterProfilePic.setAttribute("alt", "Profilbilde");
  characterProfilePic.src = localdata.img;

  const characterDisplayName = document.createElement("p");
  characterDisplayName.setAttribute("id", `${charID}-name`);
  characterDisplayName.innerHTML = `Navn: ${localdata.name}`;

  const characterDisplayHP = document.createElement("p");
  characterDisplayHP.setAttribute("id", `${charID}-hp`);
  characterDisplayHP.innerHTML = `HP: ${score}`;

  const characterDisplayAttack = document.createElement("p");
  characterDisplayAttack.setAttribute("id", `${charID}-attack`);
  characterDisplayAttack.innerHTML = `Angrepsstyrke: ${localdata.attackdamage}`;

  characterDiv.append(
    characterHeader,
    characterProfilePic,
    characterDisplayName,
    characterDisplayHP,
    characterDisplayAttack
  );

  battleArena.insertBefore(characterDiv, battleArena.children[1]);
}

function showResult() {
  if (heroScore > enemyScore) {
    textResult.innerHTML = "Du vant!";
  } else if (heroScore < enemyScore) {
    textResult.innerHTML = "Du tapte!";
  } else {
    textResult.innerHTML = "Uavgjort";
  }
}

window.onload = () => {
  createButton.addEventListener("click", () => {
    createHero(
      heroName.value,
      parseInt(heroHP.value),
      parseInt(attackDamage.value),
      userProfileImg
    );

    createEnemyButton.addEventListener("click", generateEnemy);

    startButton.addEventListener("click", calculateScore);
  });
};
module.exports = {
  saveToLocalStorage,
  getFromLocalStorage,
  generateEnemy,
};
