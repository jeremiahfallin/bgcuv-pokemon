import React from "react";
import { Link } from "next/link";
import styled from "styled-components";

const NavStyles = styled.nav`
  margin-bottom: 3rem;
  .logo {
    transform: translateY(-25%);
  }
  ul {
    margin: 0;
    padding: 0;
    text-align: center;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 2rem;
    align-items: center;
    margin-top: -10rem;
  }
  li {
    --rotate: -2deg;
    transform: rotate(var(--rotate));
    order: 1;
    &:nth-child(1) {
      --rotate: 1deg;
    }
    &:nth-child(2) {
      --rotate: -2.5deg;
    }
    &:nth-child(3) {
      --rotate: -3deg;
    }
    &:nth-child(4) {
      --rotate: 2.5deg;
    }
    &:nth-child(5) {
      --rotate: 1.1deg;
    }
    &:hover {
      --rotate: 3deg;
    }
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    display: block;
    color: var(--white);
    &:hover {
      color: var(--green);
    }
    @media (max-width: 800px) {
      font-size: 2rem;
    }
    &[aria-current="page"] {
      color: var(--green);
    }
  }
  @media (max-width: 600px) {
    --columns: 4;
    margin-bottom: 2rem;
    border-bottom: 2px solid var(--grey);
    padding-bottom: 2rem;
    ul {
      grid-template-rows: auto auto;
      grid-template-columns: repeat(var(--columns), 1fr);
      justify-items: center;
    }
  }
  @media (max-width: 500px) {
    --columns: 2;
  }
`;

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link to="/rules/">Rules</Link>
        </li>
        <li>
          <Link to="/">Rankings</Link>
        </li>
        <li>
          <Link to="/match-history/">Match History</Link>
        </li>
        <li>
          <Link to="/stats/">Stats</Link>
        </li>
        <li>
          <Link to="/quality/">Quality</Link>
        </li>
        <li>
          <Link to="/draft/">Draft</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
