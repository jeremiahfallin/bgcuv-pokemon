import React, { useEffect } from "react";
import styled from "styled-components";
import RankingsTable from "./RankingsTable";
import LinePlotVisX from "./LinePlotVisX";
import useRatings from "../hooks/useRatings";
import useStorePlayers from "../hooks/useStorePlayers";

const RankingsStyles = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  justify-items: center;
  @media (min-width: 500px) {
    grid-auto-flow: row;
    grid-template-columns: 1fr;
  }
`;

export default function Rankings({ data }) {
  const [state, dispatch] = useStorePlayers({
    data: data,
  });
  const [
    ratings,
    createRatings,
    sortName,
    sortRating,
    sortWinRate,
  ] = useRatings();

  useEffect(() => {
    if (ratings.length === 0) {
      createRatings(data);
    }
  }, []);

  return (
    <RankingsStyles>
      <LinePlotVisX data={ratings} player={state.player} />
      <RankingsTable
        players={ratings}
        dispatch={dispatch}
        {...{ sortName, sortRating, sortWinRate }}
      />
    </RankingsStyles>
  );
}
