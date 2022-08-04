import React from "react";
import {
  PlayersRows,
  PlayersGrid,
  PlayersDataRows,
} from "./RankingsTableStyles";
import WinrateBar from "./WinrateBar";

export default function RankingsTable({
  players,
  dispatch,
  sortName,
  sortRating,
  sortWinRate,
}) {
  return (
    <PlayersRows>
      <PlayersGrid>
        <div
          onClick={() => {
            sortRating();
          }}
        >
          Rank
        </div>
        <div
          onClick={() => {
            sortName();
          }}
        >
          Name
        </div>
        <div
          onClick={() => {
            sortRating();
          }}
        >
          Rating
        </div>
        <div
          onClick={() => {
            sortWinRate();
          }}
        >
          Winrate
        </div>
      </PlayersGrid>
      <PlayersDataRows>
        {players &&
          players.map(player => {
            return (
              <PlayersGrid
                key={player.name}
                onClick={() =>
                  dispatch({ type: "PLAYER", player: player.name })
                }
              >
                <div>{player.rank}</div>
                <div>{player.name}</div>
                <div>{player.mu.toFixed(2)}</div>
                <WinrateBar wins={player.wins} losses={player.losses} />
              </PlayersGrid>
            );
          })}
      </PlayersDataRows>
    </PlayersRows>
  );
}
