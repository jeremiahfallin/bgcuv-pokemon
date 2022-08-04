import styled from "styled-components";

export const PlayersRows = styled.div`
  display: grid;
  max-height: 100%;
  min-height: 0;
  min-width: 0;
  overflow-y: auto;
`;

export const PlayersGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  --columns: 3;
  grid-template-columns: minmax(50px, auto) repeat(
      var(--columns),
      minmax(auto, 1fr)
    );
  border: 1px solid grey;
  cursor: pointer;
  padding: 1rem;
  :hover {
    background: #1a1a1a;
  }
`;

export const PlayersDataRows = styled.div`
  overflow-y: scroll;
  height: 100%;
  grid-template-columns: subgrid;
  height: 32vh;
  -webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
`;
