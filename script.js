const players = [];

const title = document.createElement("h1");
title.textContent = "Basketball Game";
document.body.appendChild(title);


const nameLabel = document.createElement("label");
nameLabel.textContent = "Name: ";
document.body.appendChild(nameLabel);

const nameInput = document.createElement("input");
nameInput.id = "playerName";
document.body.appendChild(nameInput);

const addButton = document.createElement("button");
addButton.textContent = "Add";
addButton.onclick = addPlayer;
document.body.appendChild(addButton);


const playerListTitle = document.createElement("h3");
playerListTitle.textContent = "Players:";
document.body.appendChild(playerListTitle);

const playerList = document.createElement("ul");
playerList.id = "playerList";
document.body.appendChild(playerList);


const playButton = document.createElement("button");
playButton.textContent = "Play Round 1";
playButton.onclick = playRound1;
document.body.appendChild(playButton);


const outputDiv = document.createElement("div");
outputDiv.id = "output";
outputDiv.className = "section";
document.body.appendChild(outputDiv);



function addPlayer() {
  const name = nameInput.value.trim();
  if (name) {
    players.push({ name, points: 0 });
    updateList();
    nameInput.value = "";
  }
}

function updateList() {
  playerList.innerHTML = "";
  players.forEach(player => {
    const li = document.createElement("li");
    li.textContent = player.name;
    playerList.appendChild(li);
  });
}

function playRound1() {
  if (players.length < 2) {
    alert("You can't play the game with zero or one person.");
    return;
  }


  const scoresRound1 = {
    "Player 01": 10,
    "Player 02": 10,
    "Player 03": 3
  };

  players.forEach(p => {
    p.points = scoresRound1[p.name] ?? Math.floor(Math.random() * 11); 
  });

  players.sort((a, b) => b.points - a.points);

  outputDiv.innerHTML = "<h3>Round 1 Scores</h3>";
  players.forEach(p => {
    outputDiv.innerHTML += `<p>${p.name} - ${p.points} pts</p>`;
  });

  const topScore = players[0].points;
  const tied = players.filter(p => p.points === topScore);

  if (tied.length > 1) {
    outputDiv.innerHTML += `<h4>Tie detected between: ${tied.map(p => p.name).join(", ")}</h4>`;
    playRound2(tied);
  } else {
    outputDiv.innerHTML += `<h3>The Champion is: ${players[0].name}!</h3>`;
  }
}

function playRound2(tiedPlayers) {
  const scoresRound2 = {
    "Player 01": 6,
    "Player 02": 4
  };

  tiedPlayers.forEach(p => {
    p.points = scoresRound2[p.name] ?? Math.floor(Math.random() * 11);
  });

  tiedPlayers.sort((a, b) => b.points - a.points);

  outputDiv.innerHTML += "<h3>Round 2 Scores</h3>";
  tiedPlayers.forEach(p => {
    outputDiv.innerHTML += `<p>${p.name} - ${p.points} pts</p>`;
  });

  outputDiv.innerHTML += `<h3>The Champion is: ${tiedPlayers[0].name}!</h3>`;
}
