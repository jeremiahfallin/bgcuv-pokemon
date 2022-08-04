import { useReducer } from "react";

function copyObject() {
  // Returns a deep copy of the given object(s), with properties of later
  // objects overriding those of earlier objects.
  var result = {};
  var a, key;

  for (a = 0; a < arguments.length; a++) {
    for (key in arguments[a]) {
      if (arguments[a].hasOwnProperty(key)) {
        if (arguments[a][key] && typeof arguments[a][key] === "object") {
          if (Array.isArray(arguments[a][key])) {
            result[key] = copyArray(arguments[a][key]);
          } else {
            result[key] = copyObject(arguments[a][key]);
          }
        } else {
          result[key] = arguments[a][key];
        }
      }
    }
  }
  return result;
}

function copyArray(array) {
  // Returns a deep copy of the given data array.
  var result = [];
  var i;
  for (i = 0; i < array.length; i++) {
    if (array[i] && typeof array[i] === "object") {
      if (Array.isArray(array[i])) {
        result[i] = copyArray(array[i]);
      } else {
        result[i] = copyObject(array[i]);
      }
    } else {
      result[i] = array[i];
    }
  }
  return result;
}

const calcWinrate = (player) =>
  player.node.wins / (player.node.wins + player.node.losses);

export default function useStorePlayers({ data }) {
  let initialState = {
    player: data[0]["blue"][0],
    rating: false,
    name: true,
    winrate: true
  };

  let [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "NAME": {
        const newPlayers = copyArray(state.players);
        if (state.name) {
          newPlayers.sort((a, b) => {
            return a.node.name
              .toLowerCase()
              .localeCompare(b.node.name.toLowerCase());
          });
        } else {
          newPlayers.sort((a, b) => {
            return b.node.name
              .toLowerCase()
              .localeCompare(a.node.name.toLowerCase());
          });
        }

        return { ...state, name: !state.name, players: newPlayers };
      }
      case "RATING": {
        const newPlayers = copyArray(state.players);
        if (state.rating) {
          newPlayers.sort(function (a, b) {
            return b.node.rating - a.node.rating;
          });
        } else {
          newPlayers.sort(function (a, b) {
            return a.node.rating - b.node.rating;
          });
        }

        return { ...state, rating: !state.rating, players: newPlayers };
      }
      case "WINRATE": {
        const newPlayers = copyArray(state.players);
        if (state.winrate) {
          newPlayers.sort((a, b) => calcWinrate(b) - calcWinrate(a));
        } else {
          newPlayers.sort((a, b) => calcWinrate(a) - calcWinrate(b));
        }

        return { ...state, winrate: !state.winrate, players: newPlayers };
      }
      case "PLAYER": {
        return { ...state, player: action.player };
      }

      default: {
        throw new Error("Unrecognized state");
      }
    }
  }, initialState);

  return [state, dispatch];
}
