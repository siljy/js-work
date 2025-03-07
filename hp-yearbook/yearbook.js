async function fetchCharacters() {
  const response = await fetch(`https://hp-api.onrender.com/api/characters`);

  const data = await response.json();

  console.log("Fetching data function", data);
  return data;
}

function createCharacterCard(character) {
  const characterCard = document.createElement("div");
  characterCard.classList.add("card", character.house.toLowerCase());

  const characterImg = document.createElement("img");
  characterImg.classList.add("image");

  const characterName = document.createElement("h2");
  const characterHouse = document.createElement("p");

  characterImg.src = character.image;
  characterName.innerHTML = character.name;
  characterHouse.innerHTML = character.house;

  characterCard.append(characterImg, characterName, characterHouse);
  return characterCard;
}

async function sortCharacters(house) {
  const characters = await fetchCharacters();
  const filteredCharacters = characters.filter(
    (character) => character.house === house
  );

  let characterDiv = document.getElementById("character-div");
  if (!characterDiv) {
    characterDiv = document.createElement("div");
    characterDiv.id = "character-div";
    document.body.append(characterDiv);
  }

  characterDiv.innerHTML = "";

  filteredCharacters.forEach((character) => {
    characterDiv.append(createCharacterCard(character));
  });
}

async function createButtons() {
  const characters = await fetchCharacters();

  const houseNames = new Set(
    characters.map((character) => character.house).filter((house) => house)
  );

  buttonDiv = document.createElement("div");
  buttonDiv.id = "button-div";
  document.body.append(buttonDiv);

  houseNames.forEach((house) => {
    const button = document.createElement("button");
    button.innerHTML = house;

    button.addEventListener("click", () => sortCharacters(house));
    buttonDiv.append(button);
  });
}

createButtons();
