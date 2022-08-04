import { rate, Rating, quality, winProbability } from "ts-trueskill";

function process(data) {
  let playersArray = [];
  let players = {};
  for (let i in data) {
    const game = data[i];
    let blue = [game.blue[0]].filter((x) => !!x);
    let red = [game.red[0]].filter((x) => !!x);
    for (let p of blue) {
      if (!players.hasOwnProperty(p)) {
        players[p] = {};
        players[p].rating = new Rating();
        players[p].wins = 0;
        players[p].losses = 0;
        players[p].matchups = {};
        playersArray.push({
          name: p,
          values: [{ game: 1 * i, rating: players[p].rating.mu }]
        });
      }
      for (let q of red) {
        if (!players[p].matchups.hasOwnProperty(q)) {
          players[p].matchups[q] = {};
          players[p].matchups[q].name = q;
          players[p].matchups[q].wins = 0;
          players[p].matchups[q].losses = 0;
        }
        if (data[i].winner === "blue") {
          players[p].matchups[q].wins++;
        } else {
          players[p].matchups[q].losses++;
        }
      }
    }
    for (let p of red) {
      if (!players.hasOwnProperty(p)) {
        players[p] = {};
        players[p].rating = new Rating();
        players[p].wins = 0;
        players[p].losses = 0;
        players[p].matchups = {};
        playersArray.push({
          name: p,
          values: [{ game: 1 * i, rating: players[p].rating.mu }]
        });
      }
      for (let q of blue) {
        if (!players[p].matchups.hasOwnProperty(q)) {
          players[p].matchups[q] = {};
          players[p].matchups[q].name = q;
          players[p].matchups[q].wins = 0;
          players[p].matchups[q].losses = 0;
        }
        if (data[i].winner === "red") {
          players[p].matchups[q].wins++;
        } else {
          players[p].matchups[q].losses++;
        }
      }
    }
    const winner = [];
    const loser = [];
    if (game.winner === "blue") {
      for (let p of blue) {
        winner.push(players[p].rating);
      }
      for (let p of red) {
        loser.push(players[p].rating);
      }
    } else {
      for (let p of red) {
        winner.push(players[p].rating);
      }
      for (let p of blue) {
        loser.push(players[p].rating);
      }
    }

    const [rated1, rated2] = rate([winner, loser]);

    if (game.winner === "blue") {
      for (let p in blue) {
        players[blue[p]].rating = rated1[p];
        players[blue[p]].wins = players[blue[p]].wins + 1;
      }
      for (let p in red) {
        players[red[p]].rating = rated2[p];
        players[red[p]].losses = players[red[p]].losses + 1;
      }
    } else {
      for (let p in red) {
        players[red[p]].rating = rated1[p];
        players[red[p]].wins = players[red[p]].wins + 1;
      }
      for (let p in blue) {
        players[blue[p]].rating = rated2[p];
        players[blue[p]].losses = players[blue[p]].losses + 1;
      }
    }
    for (let p of Object.keys(players)) {
      const playerIndex = playersArray.findIndex(
        (element) => element.name === p
      );
      playersArray[playerIndex].values.push({
        game: i * 1 + 1,
        rating: players[p].rating.mu
      });
    }
  }

  for (let p of Object.keys(players)) {
    const playerIndex = playersArray.findIndex((element) => element.name === p);
    playersArray[playerIndex].rating = players[p].rating;
    playersArray[playerIndex].mu = players[p].rating.mu;
    playersArray[playerIndex].wins = players[p].wins;
    playersArray[playerIndex].losses = players[p].losses;
    playersArray[playerIndex].matchups = players[p].matchups;
    playersArray[playerIndex].rank = players[p].rank;
  }

  playersArray.sort((a, b) => {
    return b.mu - a.mu;
  });

  for (let p in playersArray) {
    playersArray[p].rank = 1 * p + 1;
  }

  return playersArray;
}

export default process;
