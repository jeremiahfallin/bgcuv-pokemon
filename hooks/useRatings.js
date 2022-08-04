import { useState } from "react";
import process from "../utils/process";

export function copyObject() {
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

export function copyArray(array) {
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

const calcWinrate = player => player.wins / (player.wins + player.losses);

export default function useRatings() {
  const [ratings, setRatings] = useState([]);

  const createRatings = games => {
    setRatings(process(games));
  };

  const sortName = () => {
    let sorted = true;
    for (let i = 0; i < ratings.length - 1; i++) {
      if (
        ratings[i].name
          .toLowerCase()
          .localeCompare(ratings[i + 1].name.toLowerCase()) > 0
      ) {
        sorted = false;
        break;
      }
    }

    const newPlayers = copyArray(ratings);
    if (sorted) {
      newPlayers.sort((a, b) => {
        return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
      });
    } else {
      newPlayers.sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
    }

    setRatings(newPlayers);
  };

  const sortRating = () => {
    let sorted = true;
    for (let i = 0; i < ratings.length - 1; i++) {
      if (ratings[i].mu > ratings[i + 1].mu) {
        sorted = false;
        break;
      }
    }

    const newPlayers = copyArray(ratings);
    if (sorted) {
      newPlayers.sort(function (a, b) {
        return b.mu - a.mu;
      });
    } else {
      newPlayers.sort(function (a, b) {
        return a.mu - b.mu;
      });
    }

    setRatings(newPlayers);
  };

  const sortWinRate = () => {
    let sorted = true;
    for (let i = 0; i < ratings.length - 1; i++) {
      if (calcWinrate(ratings[i]) > calcWinrate(ratings[i + 1])) {
        sorted = false;
        break;
      }
    }

    const newPlayers = copyArray(ratings);
    if (sorted) {
      newPlayers.sort((a, b) => calcWinrate(b) - calcWinrate(a));
    } else {
      newPlayers.sort((a, b) => calcWinrate(a) - calcWinrate(b));
    }

    setRatings(newPlayers);
  };

  return [ratings, createRatings, sortName, sortRating, sortWinRate];
}
