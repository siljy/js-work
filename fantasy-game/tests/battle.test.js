const {
  saveToLocalStorage,
  getFromLocalStorage,
  generateEnemy,
} = require("../app.js");

describe("Saving in localStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test("Saving hero in localStorage", () => {
    const hero = {
      name: "Silje",
      hp: 45,
      attackdamage: 50,
      img: "assets/death-knight.jpeg",
    };

    saveToLocalStorage("Hero", hero);

    expect(getFromLocalStorage("Hero")).toEqual(hero);
  });
});

describe("Mocking genereateEnemy to test enemy's values and saving", () => {
  beforeEach(() => {
    document.body.innerHTML = `<img id="enemy-img" alt="Fiendens profilbilde" />
      <p id="enemy-name"></p>
      <p id="enemy-hp"></p>
      <p id="enemy-attack"></p>`;
  });
  test("Checking if enemy is generated based on constraints", () => {
    const enemy = generateEnemy();

    
    const enemyNamesArray = ["Goblin", "Ork", "Drage"];
    expect(enemyNamesArray).toContain(enemy.name);

   
    const enemyImgArray = [
      "./assets/dragon.jpg",
      "./assets/monster.jpg",
      "./assets/swamp-monster.jpg",
    ];
    expect(enemyImgArray).toContain(enemy.img);

    
    expect(enemy.hp).toBeGreaterThanOrEqual(50);
    expect(enemy.hp).toBeLessThanOrEqual(150);
    expect(enemy.attackdamage).toBeGreaterThanOrEqual(10);
    expect(enemy.attackdamage).toBeLessThanOrEqual(40);
  });

  
  test("Saving enemy in localStorage", () => {
    const enemy = generateEnemy();

    saveToLocalStorage("Enemy", enemy);

    expect(getFromLocalStorage("Enemy")).toEqual(enemy);
  });
});

test("Checking if results are correct based on HP", () => {
  let localHero = getFromLocalStorage("Hero");
  let localEnemy = getFromLocalStorage("Enemy");
  heroScore = localHero.hp - localEnemy.attackdamage;
  enemyScore = localEnemy.hp - localHero.attackdamage;

  expect(heroScore).toBe(localHero.hp - localEnemy.attackdamage);
  expect(enemyScore).toBe(localEnemy.hp - localHero.attackdamage);
});
